import { useState, useRef, useEffect } from "react";

const CHANNELS = [
  { key: "all", label: "All Channels", icon: "📦" },
  { key: "google", label: "Google", icon: "🔍" },
  { key: "instagram", label: "Instagram", icon: "📸" },
  { key: "tiktok", label: "TikTok", icon: "🎵" },
  { key: "email", label: "Email", icon: "✉️" },
];

export default function ExportPanel({ hooks, variants }) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  function buildExport(channel) {
    const base = { hooks, exportedAt: new Date().toISOString() };
    if (channel === "all") return { ...base, variants };
    return { ...base, channel, variants: { [channel]: variants[channel] } };
  }

  function getFilename(channel) {
    const suffix = channel === "all" ? "all" : channel;
    return `creative-lab-${suffix}-${Date.now()}.json`;
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  const handleCopy = async (channel = "all") => {
    const data = buildExport(channel);
    await copyToClipboard(JSON.stringify(data, null, 2));
    setCopied(channel);
    setShowMenu(false);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (channel = "all") => {
    const data = buildExport(channel);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = getFilename(channel);
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  return (
    <div className="flex items-center gap-2 relative">
      {/* Quick copy all */}
      <button
        onClick={() => handleCopy("all")}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-border rounded-lg hover:bg-surface-alt transition-all cursor-pointer text-text-muted hover:text-text"
      >
        {copied ? (
          <><span className="text-success">✓</span> copied {copied !== "all" && <span className="text-text-faint">({copied})</span>}</>
        ) : (
          <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" /></svg> copy JSON</>
        )}
      </button>

      {/* Download with channel picker */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-border rounded-lg hover:bg-surface-alt transition-all cursor-pointer text-text-muted hover:text-text"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
          export ▾
        </button>

        {showMenu && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setShowMenu(false)} />
            <div className="absolute top-full left-0 mt-1 z-40 bg-surface border border-border rounded-xl shadow-lg shadow-black/10 overflow-hidden min-w-[200px] animate-scale-in">
              <div className="px-3 py-2 border-b border-border">
                <span className="text-[9px] font-mono text-text-faint uppercase tracking-wider">Export as JSON</span>
              </div>
              {CHANNELS.map((ch) => (
                <div key={ch.key} className="flex items-center border-b border-border last:border-0">
                  <button
                    onClick={() => handleCopy(ch.key)}
                    className="flex-1 flex items-center gap-2 px-3 py-2 text-xs text-text hover:bg-surface-alt transition-colors cursor-pointer"
                  >
                    <span className="text-sm">{ch.icon}</span>
                    <span>{ch.label}</span>
                  </button>
                  <button
                    onClick={() => handleDownload(ch.key)}
                    className="px-3 py-2 text-text-faint hover:text-text transition-colors cursor-pointer border-l border-border"
                    title={`Download ${ch.label}`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
