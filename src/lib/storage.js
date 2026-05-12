const STORAGE_KEY = "creative-lab-history";
const MAX_ITEMS = 5;

export function saveToHistory(entry) {
  const history = getHistory();
  history.unshift({ ...entry, timestamp: Date.now(), id: crypto.randomUUID() });
  if (history.length > MAX_ITEMS) history.length = MAX_ITEMS;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(history)); } catch {}
}

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch { return []; }
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
