# Home Watch — Camera Web UI

A responsive React UI for viewing a live surveillance camera feed and reviewing
motion-triggered clips, from desktop or mobile.

## What's here

- **Live** (`/`) — the live stream player. Shows an "offline / no stream
  connected" placeholder until a real feed is wired up.
- **Clips** (`/clips`) — a gallery of ~60s clips saved on motion detection,
  with upload status to cloud storage (mock data for now).
- **Settings** (`/settings`) — stream URL, motion sensitivity, clip length,
  and cloud storage provider/bucket. UI only for now; nothing is persisted
  yet.

Navigation is a top bar on desktop/tablet and a bottom tab bar on mobile.

## Stack

- React 19 + TypeScript, Vite
- React Router
- Tailwind CSS

## Running locally

```bash
npm install
npm run dev
```

## What's not built yet (by design — UI first)

- Actual video connection (`<video>` src is populated once `camera.streamUrl`
  is set in `src/data/mockClips.ts` / wired to a real API).
- Motion detection, clip recording, and cloud upload — currently mock data
  in `src/data/mockClips.ts`.
- Settings persistence and auth.

## Proposed backend

See [`BACKEND.md`](./BACKEND.md) for the recommended backend architecture
(FastAPI + a media relay + cloud storage) to power this UI.
