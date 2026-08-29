export type CameraStatus = 'online' | 'offline' | 'connecting';

export interface CameraInfo {
  id: string;
  name: string;
  status: CameraStatus;
  streamUrl: string | null;
}

export interface MotionClip {
  id: string;
  cameraId: string;
  cameraName: string;
  timestamp: string;
  durationSeconds: number;
  thumbnailUrl: string;
  cloudUrl: string | null;
  uploadStatus: 'uploaded' | 'uploading' | 'pending' | 'failed';
}
