import type { CameraInfo, MotionClip } from '../types';

export const mockCamera: CameraInfo = {
  id: 'cam-1',
  name: 'Front Door',
  status: 'offline',
  streamUrl: null,
};

const placeholderThumb =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180">
      <rect width="100%" height="100%" fill="#1c1f27"/>
      <text x="50%" y="50%" fill="#4b5563" font-family="sans-serif" font-size="14" text-anchor="middle">clip preview</text>
    </svg>`
  );

export const mockClips: MotionClip[] = [
  {
    id: 'clip-1',
    cameraId: 'cam-1',
    cameraName: 'Front Door',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    durationSeconds: 58,
    thumbnailUrl: placeholderThumb,
    cloudUrl: null,
    uploadStatus: 'uploaded',
  },
  {
    id: 'clip-2',
    cameraId: 'cam-1',
    cameraName: 'Front Door',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    durationSeconds: 63,
    thumbnailUrl: placeholderThumb,
    cloudUrl: null,
    uploadStatus: 'uploaded',
  },
  {
    id: 'clip-3',
    cameraId: 'cam-1',
    cameraName: 'Front Door',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    durationSeconds: 47,
    thumbnailUrl: placeholderThumb,
    cloudUrl: null,
    uploadStatus: 'failed',
  },
];
