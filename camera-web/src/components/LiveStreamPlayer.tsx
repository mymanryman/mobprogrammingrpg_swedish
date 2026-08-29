import { useRef } from 'react';
import type { CameraInfo } from '../types';
import StatusBadge from './StatusBadge';

interface Props {
  camera: CameraInfo;
}

/**
 * Renders the live feed once camera.streamUrl is set. Until then it shows a
 * placeholder so the layout, controls, and responsiveness can be built and
 * verified ahead of the actual stream integration.
 */
export default function LiveStreamPlayer({ camera }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
        {camera.streamUrl ? (
          <video
            ref={videoRef}
            className="h-full w-full object-contain"
            src={camera.streamUrl}
            autoPlay
            muted
            playsInline
            controls
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-gray-500">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <path d="M15 10l4.55-2.9A1 1 0 0121 8v8a1 1 0 01-1.45.9L15 14" />
              <rect x="3" y="6" width="12" height="12" rx="2" />
            </svg>
            <p className="text-sm">No stream connected yet</p>
          </div>
        )}

        <div className="absolute left-3 top-3 flex items-center gap-2">
          <StatusBadge status={camera.status} />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-gray-100">{camera.name}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            disabled
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300 disabled:opacity-40"
            title="Coming soon"
          >
            Take Snapshot
          </button>
          <button
            type="button"
            disabled
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300 disabled:opacity-40"
            title="Coming soon"
          >
            Full Screen
          </button>
        </div>
      </div>
    </div>
  );
}
