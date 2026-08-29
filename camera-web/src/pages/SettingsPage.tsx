import { useState } from 'react';

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-200">{label}</span>
      {hint && <span className="mt-0.5 block text-xs text-gray-500">{hint}</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputClasses =
  'w-full rounded-lg border border-white/10 bg-[#0b0d12] px-3 py-2 text-sm text-gray-100 placeholder-gray-600 focus:border-indigo-500 focus:outline-none';

export default function SettingsPage() {
  const [streamUrl, setStreamUrl] = useState('');
  const [clipSeconds, setClipSeconds] = useState(60);
  const [sensitivity, setSensitivity] = useState(50);
  const [cloudProvider, setCloudProvider] = useState('s3');
  const [bucket, setBucket] = useState('');
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // Wiring to the backend config API comes later; for now this just
    // demonstrates the settings UI holding local state.
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6">
      <h1 className="mb-1 text-lg font-semibold text-gray-100">Settings</h1>
      <p className="mb-6 text-sm text-gray-500">
        Configure the camera stream, motion detection, and cloud storage. These controls are UI
        only for now — saving them will take effect once the backend is connected.
      </p>

      <form onSubmit={handleSave} className="space-y-6">
        <section className="rounded-xl border border-white/10 bg-[#12141b] p-4">
          <h2 className="mb-3 text-sm font-semibold text-gray-300">Camera Stream</h2>
          <Field label="Stream URL" hint="RTSP, HLS, or WebRTC URL for the camera feed">
            <input
              type="text"
              className={inputClasses}
              placeholder="rtsp://192.168.1.20:554/stream"
              value={streamUrl}
              onChange={(e) => setStreamUrl(e.target.value)}
            />
          </Field>
        </section>

        <section className="rounded-xl border border-white/10 bg-[#12141b] p-4">
          <h2 className="mb-3 text-sm font-semibold text-gray-300">Motion Detection</h2>
          <div className="space-y-4">
            <Field label={`Sensitivity — ${sensitivity}%`}>
              <input
                type="range"
                min={0}
                max={100}
                value={sensitivity}
                onChange={(e) => setSensitivity(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </Field>
            <Field label="Clip length" hint="Seconds of footage saved per motion event">
              <input
                type="number"
                min={10}
                max={300}
                className={inputClasses}
                value={clipSeconds}
                onChange={(e) => setClipSeconds(Number(e.target.value))}
              />
            </Field>
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-[#12141b] p-4">
          <h2 className="mb-3 text-sm font-semibold text-gray-300">Cloud Storage</h2>
          <div className="space-y-4">
            <Field label="Provider">
              <select
                className={inputClasses}
                value={cloudProvider}
                onChange={(e) => setCloudProvider(e.target.value)}
              >
                <option value="s3">Amazon S3</option>
                <option value="gcs">Google Cloud Storage</option>
                <option value="azure">Azure Blob Storage</option>
              </select>
            </Field>
            <Field label="Bucket / container name">
              <input
                type="text"
                className={inputClasses}
                placeholder="my-camera-clips"
                value={bucket}
                onChange={(e) => setBucket(e.target.value)}
              />
            </Field>
          </div>
        </section>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
          >
            Save Settings
          </button>
          {saved && <span className="text-sm text-emerald-400">Saved locally ✓</span>}
        </div>
      </form>
    </div>
  );
}
