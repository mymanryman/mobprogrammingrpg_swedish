import type { CameraStatus } from '../types';

const STYLES: Record<CameraStatus, string> = {
  online: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  connecting: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  offline: 'bg-red-500/15 text-red-400 border-red-500/30',
};

const LABELS: Record<CameraStatus, string> = {
  online: 'Live',
  connecting: 'Connecting…',
  offline: 'Offline',
};

export default function StatusBadge({ status }: { status: CameraStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${STYLES[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === 'online'
            ? 'bg-emerald-400 animate-pulse'
            : status === 'connecting'
              ? 'bg-amber-400 animate-pulse'
              : 'bg-red-400'
        }`}
      />
      {LABELS[status]}
    </span>
  );
}
