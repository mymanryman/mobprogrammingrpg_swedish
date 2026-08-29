import type { MotionClip } from '../types';

const UPLOAD_LABEL: Record<MotionClip['uploadStatus'], string> = {
  uploaded: 'Saved to cloud',
  uploading: 'Uploading…',
  pending: 'Queued',
  failed: 'Upload failed',
};

const UPLOAD_COLOR: Record<MotionClip['uploadStatus'], string> = {
  uploaded: 'text-emerald-400',
  uploading: 'text-amber-400',
  pending: 'text-gray-400',
  failed: 'text-red-400',
};

function formatTimestamp(iso: string) {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function ClipCard({ clip }: { clip: MotionClip }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#12141b]">
      <div className="relative aspect-video w-full bg-black">
        <img
          src={clip.thumbnailUrl}
          alt={`Motion clip from ${clip.cameraName}`}
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-gray-200">
          0:{clip.durationSeconds.toString().padStart(2, '0')}
        </span>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-gray-100">{clip.cameraName}</p>
          <span className={`text-xs font-medium ${UPLOAD_COLOR[clip.uploadStatus]}`}>
            {UPLOAD_LABEL[clip.uploadStatus]}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-gray-500">{formatTimestamp(clip.timestamp)}</p>
      </div>
    </div>
  );
}
