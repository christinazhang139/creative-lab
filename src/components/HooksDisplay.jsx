import { useState, useRef, useEffect } from "react";

export default function HooksDisplay({ hooks, activeHook, onSelectHook, isRefining }) {
  const [clickedId, setClickedId] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleClick = (hook) => {
    clearTimeout(timerRef.current);
    setClickedId(hook.id);
    timerRef.current = setTimeout(() => setClickedId(null), 600);
    onSelectHook(hook);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
        <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
          {hooks.length} Hooks Extracted
        </span>
      </div>

      {hooks.map((hook) => {
        const isActive = activeHook?.id === hook.id;
        const justClicked = clickedId === hook.id;
        return (
          <button
            key={hook.id}
            onClick={() => handleClick(hook)}
            disabled={isRefining}
            className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${
              isActive
                ? "border-primary/40 bg-primary-light shadow-sm"
                : "border-border bg-surface hover:border-primary/20 hover:bg-surface-alt"
            } ${isRefining ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {/* Ripple pulse on click */}
            {justClicked && (
              <span className="absolute inset-0 animate-hook-pulse rounded-xl pointer-events-none" />
            )}

            <div className="relative flex items-start gap-3">
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-mono font-medium flex-shrink-0 mt-0.5 transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/30"
                    : "bg-surface-alt text-text-muted group-hover:bg-primary/10 group-hover:text-primary"
                } ${justClicked ? "scale-110" : ""}`}
              >
                {hook.id}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text leading-snug">
                  {hook.hook}
                </p>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  {hook.angle}
                </p>
              </div>
            </div>
            {isActive && (
              <div className="relative mt-3 ml-9 flex items-center gap-1.5">
                {isRefining ? (
                  <>
                    <span className="inline-block w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-xs text-primary font-mono">
                      refining all 4 channels...
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-primary font-mono flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    active — click again to reset
                  </span>
                )}
              </div>
            )}
          </button>
        );
      })}

      <p className="text-xs text-text-faint text-center pt-2">
        Click a hook to refine all ad variants around it
      </p>
    </div>
  );
}
