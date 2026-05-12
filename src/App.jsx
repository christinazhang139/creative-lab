import { useState, useCallback } from "react";
import ExtractionPanel from "./components/ExtractionPanel";
import HooksDisplay from "./components/HooksDisplay";
import PreviewCards from "./components/PreviewCards";
import ProviderSelector from "./components/ProviderSelector";
import ThemeToggle from "./components/ThemeToggle";
import ExportPanel from "./components/ExportPanel";
import HistoryDrawer from "./components/HistoryDrawer";
import LanguageToggle from "./components/LanguageToggle";
import { extractHooks, generateAdVariants, refineWithHook } from "./lib/ai";
import { saveToHistory } from "./lib/storage";

const STEPS = ["extract", "hooks", "preview"];

function StepIndicator({ current }) {
  const labels = ["Extraction", "Generation", "Preview"];
  const idx = STEPS.indexOf(current);
  return (
    <div className="flex items-center gap-1">
      {labels.map((label, i) => (
        <div key={label} className="flex items-center gap-1">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-all ${
              i <= idx
                ? "bg-text text-surface"
                : "bg-surface-alt text-text-faint border border-border"
            }`}
          >
            <span className="opacity-70">{i + 1}</span>
            <span className="hidden sm:inline">{label}</span>
          </div>
          {i < labels.length - 1 && (
            <div className={`w-6 h-px ${i < idx ? "bg-text" : "bg-border"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function JsonPanel({ data, title }) {
  return (
    <div className="bg-[#1e1e2e] rounded-xl overflow-hidden border border-[#313244]">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#313244]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#f38ba8]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#f9e2af]" />
        </div>
        <span className="text-[10px] font-mono text-[#6c7086]">{title}</span>
      </div>
      <pre className="p-4 text-xs font-mono text-[#cdd6f4] overflow-x-auto leading-relaxed">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState("extract");
  const [hooks, setHooks] = useState(null);
  const [variants, setVariants] = useState(null);
  const [activeHook, setActiveHook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState(null);

  const [provider, setProvider] = useState("mock");
  const [apiKey, setApiKey] = useState("");
  const [originalVariants, setOriginalVariants] = useState(null);

  const handleProviderChange = useCallback((p, key) => {
    setProvider(p);
    setApiKey(key);
  }, []);

  const handleExtract = useCallback(async (text, images = []) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await extractHooks(provider, apiKey, text, images);
      setHooks(result.hooks);
      setStep("hooks");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [provider, apiKey]);

  const handleGenerate = useCallback(async () => {
    if (!Array.isArray(hooks) || hooks.length === 0) return;
    setIsGenerating(true);
    setError(null);
    try {
      const adResult = await generateAdVariants(provider, apiKey, hooks);
      setVariants(adResult.variants);
      setOriginalVariants(adResult.variants);
      saveToHistory({ hooks, variants: adResult.variants });
      setStep("preview");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  }, [provider, apiKey, hooks]);

  const handleRefine = useCallback(
    async (hook) => {
      setError(null);
      if (activeHook?.id === hook.id) {
        setActiveHook(null);
        setIsRefining(true);
        try {
          const adResult = await generateAdVariants(provider, apiKey, hooks);
          setVariants(adResult.variants);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsRefining(false);
        }
        return;
      }

      setActiveHook(hook);
      setIsRefining(true);
      try {
        const result = await refineWithHook(provider, apiKey, hook, hooks);
        setVariants(result.variants);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsRefining(false);
      }
    },
    [activeHook, provider, apiKey, hooks]
  );

  const handleReset = useCallback(() => {
    setStep("extract");
    setHooks(null);
    setVariants(null);
    setActiveHook(null);
    setError(null);
  }, []);

  const handleLoadHistory = useCallback((entry) => {
    setHooks(entry.hooks);
    setVariants(entry.variants);
    setOriginalVariants(entry.variants);
    setActiveHook(null);
    setStep("preview");
  }, []);

  const handleTranslate = useCallback((translatedVariants) => {
    if (!translatedVariants) {
      setVariants(originalVariants);
    } else {
      setVariants(translatedVariants);
    }
  }, [originalVariants]);

  return (
    <div className="min-h-screen bg-surface">
      <div
        className="fixed inset-0 pointer-events-none opacity-40 text-border"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10">
        <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-3 sm:px-6 h-12 sm:h-14 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <span className="text-sm font-semibold text-text tracking-tight hidden sm:inline">
                Creative Lab
              </span>
              <span className="text-[10px] font-mono text-text-faint bg-surface-alt border border-border px-1.5 py-0.5 rounded hidden sm:inline">
                prototype
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <StepIndicator current={step} />
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          {/* Error banner */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3">
              <span className="text-red-500 text-sm">⚠</span>
              <p className="text-xs text-red-700 dark:text-red-300 flex-1">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-xs text-red-400 hover:text-red-600 cursor-pointer"
              >
                dismiss
              </button>
            </div>
          )}

          {/* ── Phase 1: Extraction ── */}
          {step === "extract" && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <div className="text-center mb-8 sm:mb-10">
                <h1 className="text-2xl sm:text-3xl font-semibold text-text tracking-tight">
                  Transform product copy into
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    high-converting ads
                  </span>
                </h1>
                <p className="text-sm text-text-muted mt-3 max-w-md mx-auto">
                  Paste your product description or upload images. AI extracts
                  selling hooks and generates platform-specific ad creatives.
                </p>
              </div>

              {/* Provider selector */}
              <div className="mb-6 p-4 bg-surface border border-border rounded-2xl">
                <div className="text-[10px] font-mono text-text-faint uppercase tracking-wider mb-3">
                  AI Provider
                </div>
                <ProviderSelector
                  provider={provider}
                  apiKey={apiKey}
                  onChange={handleProviderChange}
                />
              </div>

              <div className="mb-4">
                <HistoryDrawer onLoad={handleLoadHistory} />
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
                <ExtractionPanel
                  onExtract={handleExtract}
                  isLoading={isLoading}
                  provider={provider}
                />
              </div>
              <div className="flex justify-center gap-4 sm:gap-6 mt-8 flex-wrap">
                {["Google", "Instagram", "TikTok", "Email"].map((ch) => (
                  <span
                    key={ch}
                    className="text-xs font-mono text-text-faint bg-surface-alt border border-border px-2.5 py-1 rounded-lg"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Phase 1 Result: Hooks + JSON ── */}
          {step === "hooks" && hooks && (
            <div className="max-w-3xl mx-auto space-y-8 animate-slide-up">
              <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      Phase 1 Complete
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-text">
                    Selling Hooks Extracted
                  </h2>
                  <p className="text-xs text-text-muted mt-1">
                    {hooks.length} core hooks identified from your product description
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs font-mono text-text-muted hover:text-text border border-border rounded-lg px-3 py-1.5 hover:bg-surface-alt transition-all cursor-pointer"
                >
                  ← new input
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {hooks.map((hook) => (
                  <div
                    key={hook.id}
                    className="bg-surface border border-border rounded-xl p-5 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-mono font-bold">
                        {hook.id}
                      </span>
                      <span className="text-[10px] font-mono text-text-faint uppercase tracking-wider">
                        Hook {hook.id}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-text mb-1.5">{hook.hook}</h3>
                    <p className="text-xs text-text-muted leading-relaxed">{hook.angle}</p>
                  </div>
                ))}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono text-text-faint uppercase tracking-wider">Structured Output</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <JsonPanel data={{ hooks }} title="extraction_result.json" />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3.5 px-6 bg-text text-surface rounded-xl text-sm font-medium hover:bg-text/90 disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                    Generating ad variants across 4 channels...
                  </>
                ) : (
                  <>
                    Generate Multi-Channel Ads →
                    <span className="text-[10px] opacity-50 font-mono ml-1 hidden sm:inline">
                      Google · Instagram · TikTok · Email
                    </span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* ── Phase 2 + 3: Preview + Refine ── */}
          {step === "preview" && hooks && variants && (
            <div className="space-y-8 animate-slide-up">
              <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-success bg-success/10 px-2 py-0.5 rounded-full">
                      Phase 2 + 3
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-text">Ad Creative Suite</h2>
                  <p className="text-xs text-text-muted mt-1">
                    {activeHook
                      ? <>Refined with: <span className="text-primary font-medium">&quot;{activeHook.hook}&quot;</span> — all channels re-aligned</>
                      : "Click a hook to refine all variants around it"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="text-xs font-mono text-text-muted hover:text-text border border-border rounded-lg px-3 py-1.5 hover:bg-surface-alt transition-all cursor-pointer"
                  >
                    ← new input
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <ExportPanel hooks={hooks} variants={variants} />
                <LanguageToggle variants={variants} onTranslate={handleTranslate} provider={provider} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4">
                  <div className="bg-surface border border-border rounded-2xl p-5 lg:sticky lg:top-20">
                    <h3 className="text-xs font-mono text-text-faint uppercase tracking-wider mb-1">
                      Selling Hooks
                    </h3>
                    <p className="text-[10px] text-primary/70 font-mono mb-4">
                      ↓ click to refine all 4 channels
                    </p>
                    <HooksDisplay
                      hooks={hooks}
                      activeHook={activeHook}
                      onSelectHook={handleRefine}
                      isRefining={isRefining}
                    />
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <PreviewCards variants={variants} />
                </div>
              </div>

              <details className="group">
                <summary className="flex items-center gap-2 cursor-pointer text-xs font-mono text-text-faint hover:text-text-muted transition-colors">
                  <span className="group-open:rotate-90 transition-transform">▶</span>
                  raw JSON output
                </summary>
                <div className="mt-3">
                  <JsonPanel data={{ hooks, variants }} title="generation_result.json" />
                </div>
              </details>
            </div>
          )}
        </main>

        <footer className="border-t border-border mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs text-text-faint font-mono">
              Creative Lab Prototype
            </span>
            <span className="text-xs text-text-faint">
              Built with React + Tailwind · Multi-provider AI
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
