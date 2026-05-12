import { useState } from "react";
import { PROVIDERS } from "../lib/providers";

export default function ProviderSelector({ provider, apiKey, onChange }) {
  const [showKey, setShowKey] = useState(false);
  const info = PROVIDERS[provider];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center bg-surface-alt border border-border rounded-xl overflow-x-auto">
        {Object.entries(PROVIDERS).map(([key, p]) => (
          <button
            key={key}
            onClick={() => onChange(key, key === provider ? apiKey : "")}
            className={`px-3 py-1.5 text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
              provider === key
                ? "bg-text text-surface"
                : "text-text-muted hover:text-text hover:bg-surface"
            }`}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
              style={{ backgroundColor: provider === key ? "currentColor" : p.color }}
            />
            {p.name}
          </button>
        ))}
      </div>

      {provider !== "mock" && (
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <div className="relative flex-1">
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => onChange(provider, e.target.value)}
              placeholder={info.keyPlaceholder}
              className="w-full px-3 py-1.5 bg-surface border border-border rounded-lg text-xs font-mono text-text placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all pr-16"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[10px] font-mono text-text-faint hover:text-text-muted transition-colors cursor-pointer"
            >
              {showKey ? "hide" : "show"}
            </button>
          </div>
          {apiKey && (
            <span className="text-[10px] font-mono text-success">✓ key set</span>
          )}
        </div>
      )}

      {provider === "mock" && (
        <span className="text-[10px] font-mono text-text-faint">
          Using realistic mock data — no API key needed
        </span>
      )}
    </div>
  );
}
