import LiveStreamPlayer from '../components/LiveStreamPlayer';
import { mockCamera } from '../data/mockClips';

export default function LivePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <LiveStreamPlayer camera={mockCamera} />

      <div className="mt-6 rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-sm text-gray-400">
        <p className="font-medium text-gray-300">Stream not connected</p>
        <p className="mt-1">
          Once the camera feed is wired up, this player will show the live video and turn the
          status badge green. Motion events will also appear here in real time and generate clips
          under the Clips tab.
        </p>
      </div>
    </div>
  );
}
