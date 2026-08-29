import ClipCard from '../components/ClipCard';
import { mockClips } from '../data/mockClips';

export default function ClipsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-gray-100">Motion Clips</h1>
        <p className="text-sm text-gray-500">
          ~60s clips saved automatically when motion is detected, and uploaded to your cloud
          storage for review.
        </p>
      </div>

      {mockClips.length === 0 ? (
        <p className="text-sm text-gray-500">No clips yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockClips.map((clip) => (
            <ClipCard key={clip.id} clip={clip} />
          ))}
        </div>
      )}
    </div>
  );
}
