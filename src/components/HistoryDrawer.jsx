import { useState } from "react";
import { getHistory, clearHistory } from "../lib/storage";

export default function HistoryDrawer({ onLoad }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const handleOpen = () => {
    setItems(getHistory());
    setOpen(!open);
  };

  const handleClear = () => {
    clearHistory();
    setItems([]);
  };

  const formatTime = (ts) => {
    const d = new Date(ts);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!open) {
    return (
      <button
        onClick={handleOpen}
        className="flex items-center gap-1.5 text-xs font-mono text-text-faint hover:text-text-muted transition-colors cursor-pointer"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        history
      </button>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-2xl p-4 space-y-3 animate-scale-in">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-text-faint uppercase tracking-wider">Recent Sessions</span>
        <div className="flex gap-2">
          {items.length > 0 && (
            <button onClick={handleClear} className="text-[10px] font-mono text-red-400 hover:text-red-600 cursor-pointer">clear</button>
          )}
          <button onClick={() => setOpen(false)} className="text-[10px] font-mono text-text-faint hover:text-text cursor-pointer">close</button>
        </div>
      </div>
      {items.length === 0 ? (
        <p className="text-xs text-text-faint text-center py-4">No history yet</p>
      ) : (
        items.map((item) => (
          <button
            key={item.id}
            onClick={() => { onLoad(item); setOpen(false); }}
            className="w-full text-left p-3 bg-surface-alt border border-border rounded-xl hover:border-primary/30 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-text-faint">{formatTime(item.timestamp)}</span>
              <span className="text-[10px] font-mono text-primary">{item.hooks?.length || 0} hooks</span>
            </div>
            <p className="text-xs text-text truncate">{item.hooks?.[0]?.hook || "Unknown"}</p>
          </button>
        ))
      )}
    </div>
  );
}
