import { useState, useRef, useCallback } from "react";

const EXAMPLE_INPUT = `Acme AI Platform is an enterprise-grade solution that enables teams to deploy large language models to production in minutes instead of days. Built on vLLM with PagedAttention technology, it reduces GPU memory usage by up to 68% while maintaining the same inference performance. The platform offers one-command deployment to any cloud provider, automatic scaling based on traffic patterns, and a 99.9% uptime SLA. Teams can monitor model performance, costs, and usage through a real-time dashboard. Currently used by 50+ companies to serve over 2 billion inference requests monthly.`;

export default function ExtractionPanel({ onExtract, isLoading, provider }) {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = useCallback((files) => {
    const imageFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (!imageFiles.length) return;

    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), name: file.name, url: e.target.result, file },
        ]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeImage = useCallback((id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  const hasInput = text.trim() || images.length > 0;

  return (
    <div className="space-y-5">
      {/* Text input */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-text">
            Product Description
          </label>
          <button
            onClick={() => setText(EXAMPLE_INPUT)}
            className="text-xs font-mono text-primary hover:text-accent transition-colors cursor-pointer"
          >
            load example →
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your product description, landing page copy, or D2C product info here..."
          className="w-full h-40 px-4 py-3 bg-surface-alt border border-border rounded-xl text-sm text-text placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none font-sans"
        />
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-text-faint font-mono">
            {text.length} chars
          </span>
          <span className="text-xs text-text-faint">
            Text, images, or both
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[10px] font-mono text-text-faint uppercase tracking-widest">
          and / or
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Image upload */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <label className="text-sm font-medium text-text">
            Product Images
          </label>
          <span className="text-[10px] font-mono text-text-faint bg-surface-alt border border-border px-1.5 py-0.5 rounded">
            {provider === "openai" || provider === "gemini"
              ? "✓ multimodal enabled"
              : "requires multimodal model (OpenAI / Gemini)"}
          </span>
        </div>

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/30 hover:bg-surface-alt"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-surface-alt border border-border flex items-center justify-center">
              <svg
                className="w-5 h-5 text-text-faint"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-text-muted">
                <span className="text-primary font-medium">Click to upload</span>{" "}
                or drag & drop
              </p>
              <p className="text-[10px] text-text-faint mt-0.5 font-mono">
                PNG, JPG, WebP — product screenshots, ads, packaging
              </p>
            </div>
          </div>
        </div>

        {/* Image previews */}
        {images.length > 0 && (
          <div className="flex gap-3 mt-3 flex-wrap">
            {images.map((img) => (
              <div key={img.id} className="relative group">
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-20 h-20 object-cover rounded-lg border border-border"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(img.id);
                  }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-text text-surface rounded-full text-[10px] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  ×
                </button>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent rounded-b-lg px-1 py-0.5">
                  <span className="text-[9px] text-white font-mono truncate block">
                    {img.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={() => onExtract(text, images)}
        disabled={!hasInput || isLoading}
        className="w-full py-3 px-6 bg-text text-surface rounded-xl text-sm font-medium hover:bg-text/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
            Extracting hooks...
          </>
        ) : (
          <>
            <span className="font-mono text-xs opacity-60">⌘</span>
            Extract Selling Hooks
            {images.length > 0 && (
              <span className="text-[10px] opacity-60 font-mono">
                ({images.length} img{images.length > 1 ? "s" : ""})
              </span>
            )}
          </>
        )}
      </button>
    </div>
  );
}
