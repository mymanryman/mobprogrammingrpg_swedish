# Backend Proposal

## What the backend needs to do

1. Take a camera feed (almost certainly RTSP from an IP camera, or a
   USB/Pi camera) and make it viewable in a browser — RTSP itself doesn't
   play in `<video>` tags, so it needs to be relayed as **HLS or WebRTC**.
2. Continuously watch the feed for motion, and buffer video so it can save
   the ~60 seconds around a detected event.
3. Upload saved clips to cloud storage (S3 / GCS / Azure Blob) and keep a
   record of them (timestamp, duration, camera, storage URL).
4. Serve a small REST/WebSocket API for the React app: current camera
   status, stream URL to play, clip list, clip playback URLs, settings
   (sensitivity, clip length, storage config), and live motion-event
   notifications.

## Recommendation: Python + FastAPI, with a dedicated media relay

**FastAPI** as the application/API layer, paired with a purpose-built media
server for the video relay rather than trying to handle RTSP→browser
streaming in application code.

- **FastAPI** (Python)
  - Async by default — a good fit for an app that's mostly I/O-bound
    (waiting on camera frames, uploads, DB writes) and needs to push live
    events (motion alerts, camera status) to the browser over WebSockets.
  - Python has the strongest ecosystem for the motion-detection piece —
    OpenCV for frame-differencing/background-subtraction motion detection,
    with a fast path to more advanced detection (e.g. a lightweight person
    detector) later if you want fewer false positives from shadows/pets.
  - Official, well-maintained SDKs for all major clouds (`boto3` for S3,
    `google-cloud-storage`, `azure-storage-blob`), so "save clip to cloud
    storage" is a few lines of code and presigned URLs are easy to generate
    for the Clips page.
  - Auto-generated OpenAPI docs, which pairs nicely with a TypeScript
    frontend (can codegen a typed client).

- **Media relay: [MediaMTX](https://github.com/bluenviron/mediamtx)**
  (formerly rtsp-simple-server), running alongside FastAPI as its own
  process/container.
  - Ingests the camera's RTSP stream and re-serves it as HLS and/or WebRTC,
    which is what the `<video>` element / a WebRTC player in the React app
    actually needs.
  - Also exposes the raw frames FastAPI's motion-detection worker reads
    from (via RTSP or its API) to run OpenCV against.
  - Battle-tested for exactly this job — writing your own RTSP-to-browser
    relay is a significant undertaking that a dedicated tool already solves
    well.
  - WebRTC via MediaMTX gives sub-second latency (better than HLS's several
    seconds) if that matters for "watching live" responsiveness; HLS is the
    simpler fallback and works everywhere with no extra frontend library.

- **Storage**: Postgres for clip metadata + settings (SQLite is fine to
  start/for a single-camera home setup); actual video files go straight to
  S3/GCS/Azure, not the database.

### High-level flow

```
IP Camera (RTSP)
      │
      ▼
  MediaMTX  ── HLS/WebRTC ──────────────► React app (<video> player)
      │
      │ raw frames
      ▼
FastAPI motion-detection worker (OpenCV)
      │ on motion: buffer last ~60s → clip file
      ▼
Upload to cloud storage (S3/GCS/Azure) ──► clip URL + metadata → Postgres
      │
      ▼
FastAPI REST/WebSocket API ─────────────► React app (Clips page, live alerts)
```

## Alternative: Node.js end-to-end

If you'd rather keep everything in one language (JS/TS across frontend and
backend), **Node.js + Express (or Fastify)** is workable:

- Use **[node-media-server](https://github.com/illuspas/Node-Media-Server)**
  or still just run MediaMTX as the relay (it's language-agnostic) — the
  RTSP→HLS/WebRTC problem is the same regardless of app-layer language.
- Motion detection is the weaker spot: Node's CV options
  (`opencv4nodejs`, calling out to `ffmpeg` for frame diffs) are less
  mature/maintained than Python's OpenCV bindings. Workable, but expect
  more friction.
- Cloud SDKs (`@aws-sdk/client-s3`, `@google-cloud/storage`,
  `@azure/storage-blob`) are equally solid on Node.

**Bottom line:** FastAPI + MediaMTX is the better default — the motion
detection requirement plays to Python's strengths, and MediaMTX handles the
hard streaming problem either way. Node is a reasonable choice mainly if
you want one language across the stack and are fine with a thinner motion
detection layer (or plan to do detection on-camera/on-device instead).
