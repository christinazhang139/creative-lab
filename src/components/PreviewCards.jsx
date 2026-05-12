import { useState, useEffect } from "react";

export default function PreviewCards({ variants }) {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setRefreshKey(k => k + 1);
  }, [variants]);

  if (!variants) return null;

  const cards = [
    <GoogleCard key="google" data={variants.google} />,
    <InstagramCard key="instagram" data={variants.instagram} />,
    <TikTokCard key="tiktok" data={variants.tiktok} />,
    <EmailCard key="email" data={variants.email} />,
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {cards.map((card, i) => (
        <div
          key={`${refreshKey}-${i}`}
          className="animate-stagger-in"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          {card}
        </div>
      ))}
    </div>
  );
}

function CardShell({ icon, label, color, children }) {
  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-black/[0.03] transition-all">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface-alt">
        <span className="text-sm">{icon}</span>
        <span className="text-xs font-mono font-medium uppercase tracking-wider" style={{ color }}>
          {label}
        </span>
        <div className="ml-auto flex gap-1">
          <div className="w-2 h-2 rounded-full bg-border" />
          <div className="w-2 h-2 rounded-full bg-border" />
          <div className="w-2 h-2 rounded-full bg-border" />
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

const STOCK_PHOTOS = {
  coffee: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop&q=80",
  sneakers: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=80",
  food: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&h=600&fit=crop&q=80",
  fitness: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop&q=80",
  lighting: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop&q=80",
  tech: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop&q=80",
  ecommerce: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop&q=80",
  generic: "https://images.unsplash.com/photo-1557683316-973673baf926?w=600&h=600&fit=crop&q=80",
};

function getStockPhoto(caption) {
  const text = caption.toLowerCase();
  if (/coffee|brew|roast|bean|caffeine|espresso|latte/.test(text)) return STOCK_PHOTOS.coffee;
  if (/shoe|sneaker|nike|adidas|run|walk/.test(text)) return STOCK_PHOTOS.sneakers;
  if (/food|meal|health|cook|taste|ingredient|organic/.test(text)) return STOCK_PHOTOS.food;
  if (/fitness|workout|gym|exercise|muscle|training/.test(text)) return STOCK_PHOTOS.fitness;
  if (/light|smart home|bulb|lamp|lumi|sunrise/.test(text)) return STOCK_PHOTOS.lighting;
  if (/deploy|ai|model|cloud|platform|saas/.test(text)) return STOCK_PHOTOS.tech;
  if (/shop|brand|ecommerce|store/.test(text)) return STOCK_PHOTOS.ecommerce;
  return STOCK_PHOTOS.generic;
}

function AdImageMockup({ headline, gradient, icon, caption = "", brandName = "acme.ai" }) {
  const photoUrl = getStockPhoto(caption);

  return (
    <div
      className="w-full aspect-square rounded-lg overflow-hidden relative flex flex-col justify-between p-0"
      style={{ background: gradient }}
    >
      {/* Stock photo background */}
      <img
        src={photoUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
        loading="lazy"
        onError={(e) => { e.target.style.display = "none"; }}
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,1) 35px, rgba(255,255,255,1) 36px)",
      }} />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/10">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <span className="text-white/70 text-[10px] font-mono tracking-wide uppercase">{brandName}</span>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
          <span className="text-white/70 text-[9px] font-mono">Sponsored</span>
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 text-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
          <span className="text-4xl drop-shadow-lg">{icon}</span>
        </div>
        <div className="space-y-2">
          <p className="text-white text-base font-semibold leading-snug drop-shadow-lg max-w-[85%] mx-auto">
            {headline}
          </p>
          <div className="w-8 h-0.5 bg-white/30 mx-auto rounded-full" />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 px-5 pb-5 flex items-end justify-between">
        <button className="px-5 py-2 rounded-full bg-white text-black text-xs font-semibold tracking-wide shadow-lg shadow-black/20 hover:scale-105 transition-transform">
          LEARN MORE
        </button>
        <div className="text-right">
          <div className="text-[9px] font-mono text-white/30">1080 × 1080</div>
        </div>
      </div>

      {/* Corner accent shapes */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/[0.04]" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-white/[0.03]" />
    </div>
  );
}

function TikTokThumbnail({ text, sceneNum }) {
  const gradients = [
    "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    "linear-gradient(135deg, #0f3460 0%, #533483 100%)",
    "linear-gradient(135deg, #533483 0%, #e94560 100%)",
  ];
  return (
    <div
      className="w-full h-20 rounded-lg overflow-hidden relative flex items-end p-2"
      style={{ background: gradients[sceneNum - 1] || gradients[0] }}
    >
      <div className="absolute top-2 left-2 flex items-center gap-1">
        <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-[8px] text-white font-bold">{sceneNum}</span>
        </div>
        <span className="text-[8px] text-white/60 font-mono">0:{sceneNum * 5}s</span>
      </div>
      <div className="absolute top-2 right-2 flex flex-col gap-1.5 items-center">
        <div className="w-3 h-3 rounded-full bg-white/20" />
        <div className="w-3 h-3 rounded-full bg-white/20" />
      </div>
      <p className="text-[9px] text-white/80 leading-tight line-clamp-2 relative z-10">
        {text}
      </p>
    </div>
  );
}

function GoogleCard({ data }) {
  const headline = data?.headline ?? "";
  const description = data?.description ?? "";
  return (
    <CardShell icon="🔍" label="Google Search" color="#4285f4">
      <div className="space-y-3">
        <div className="text-xs text-text-faint font-mono">Search Ad Preview</div>
        <div className="p-3 bg-surface-alt rounded-lg border border-border">
          <div className="text-xs text-text-faint mb-1">Sponsored · acme.ai</div>
          <h4 className="text-[#1a0dab] dark:text-[#8ab4f8] text-sm font-medium hover:underline cursor-pointer">
            {headline}
          </h4>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex gap-4 text-xs font-mono">
          <span className={headline.length > 30 ? "text-red-500 font-semibold" : "text-text-faint"}>
            headline: {headline.length}/30 {headline.length > 30 && "⚠"}
          </span>
          <span className={description.length > 90 ? "text-red-500 font-semibold" : "text-text-faint"}>
            desc: {description.length}/90 {description.length > 90 && "⚠"}
          </span>
        </div>

        <div className="text-xs text-text-faint font-mono pt-2 border-t border-border">Display Ad Preview</div>
        <div className="bg-surface-alt border border-border rounded-lg p-3 flex gap-3 items-center">
          <div
            className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
          >
            <span className="text-white text-lg font-bold">A</span>
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-text-faint">Ad · acme.ai</div>
            <p className="text-xs font-medium text-text truncate">{headline}</p>
            <p className="text-[10px] text-text-muted mt-0.5 line-clamp-2">{description}</p>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

function InstagramCard({ data }) {
  const caption = data?.caption ?? "";
  const firstLine = caption.split("\n")[0].replace(/[^\w\s.,!?'"—–-]/g, "").trim();

  function getAdStyle(caption) {
    const text = (caption || "").toLowerCase();
    if (/coffee|brew|roast|bean|caffeine|espresso|latte/.test(text))
      return { gradient: "linear-gradient(135deg, #3c1810 0%, #6f4e37 40%, #a0522d 100%)", icon: "☕" };
    if (/shoe|sneaker|nike|adidas|run|walk|comfort|cushion/.test(text))
      return { gradient: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 40%, #e94560 100%)", icon: "👟" };
    if (/food|meal|health|cook|taste|ingredient|recipe|organic|calorie/.test(text))
      return { gradient: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)", icon: "🥗" };
    if (/fitness|workout|gym|exercise|muscle|training|rep/.test(text))
      return { gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)", icon: "💪" };
    if (/light|smart home|bulb|lamp|lumi|sensor|automat/.test(text))
      return { gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)", icon: "💡" };
    if (/deploy|ai|model|cloud|platform|saas|code|engineer/.test(text))
      return { gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)", icon: "🚀" };
    if (/shop|brand|ecommerce|store|content|marketing/.test(text))
      return { gradient: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)", icon: "🛍️" };
    return { gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", icon: "✨" };
  }

  const adStyle = getAdStyle(caption);

  return (
    <CardShell icon="📸" label="Instagram" color="#e1306c">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
          <div>
            <div className="text-xs font-semibold text-text">acme.ai</div>
            <div className="text-[10px] text-text-faint">Sponsored</div>
          </div>
        </div>
        <AdImageMockup
          headline={firstLine || "Your next favorite product"}
          gradient={adStyle.gradient}
          icon={adStyle.icon}
          caption={caption}
        />
        <div className="flex items-center gap-3 py-1">
          <svg className="w-5 h-5 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
          <svg className="w-5 h-5 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
          </svg>
          <svg className="w-5 h-5 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
          <svg className="w-5 h-5 text-text ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
          </svg>
        </div>
        <p className="text-xs text-text leading-relaxed whitespace-pre-line">
          {caption}
        </p>
      </div>
    </CardShell>
  );
}

function TikTokCard({ data }) {
  const scenes = Array.isArray(data?.scenes) ? data.scenes : [];
  return (
    <CardShell icon="🎵" label="TikTok" color="#010101">
      <div className="space-y-4">
        <div className="text-xs text-text-faint font-mono">3-Scene Script Outline</div>

        {/* Phone frame with storyboard */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
          {scenes.map((scene) => (
            <div key={scene.scene} className="flex-shrink-0 w-[120px]">
              {/* Phone frame */}
              <div className="rounded-xl border-2 border-[#1a1a2e] bg-black overflow-hidden shadow-lg">
                {/* Status bar */}
                <div className="flex items-center justify-between px-2 py-1 bg-black">
                  <span className="text-[6px] text-white/40 font-mono">9:41</span>
                  <div className="flex gap-0.5">
                    <div className="w-2 h-1.5 rounded-sm bg-white/30" />
                    <div className="w-1 h-1.5 rounded-sm bg-white/30" />
                  </div>
                </div>
                {/* Video content */}
                <TikTokThumbnail text={scene.audio} sceneNum={scene.scene} />
                {/* TikTok UI overlay */}
                <div className="bg-black px-2 py-1.5 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scene details */}
        {scenes.map((scene) => (
          <div key={`detail-${scene.scene}`} className="p-3 bg-surface-alt rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-5 h-5 bg-text text-surface text-[10px] font-mono font-bold rounded">
                {scene.scene}
              </span>
              <span className="text-[10px] text-text-faint font-mono uppercase tracking-wider">
                Scene {scene.scene}
              </span>
              <span className="text-[10px] text-text-faint font-mono ml-auto">
                0:{scene.scene * 5}s
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-text">
                <span className="text-text-faint font-mono">visual:</span>{" "}
                {scene.visual}
              </p>
              <p className="text-xs text-text">
                <span className="text-text-faint font-mono">audio:</span>{" "}
                {scene.audio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function EmailCard({ data }) {
  const lines = Array.isArray(data?.subject_lines) ? data.subject_lines : [];
  const times = ["10:32 AM", "10:30 AM", "10:28 AM"];
  return (
    <CardShell icon="✉️" label="Email" color="#ea580c">
      <div className="space-y-0">
        {/* Email client header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-text-faint uppercase tracking-wider">Inbox</span>
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-[9px] font-bold">
              {lines.length}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-surface-alt border border-border flex items-center justify-center">
              <svg className="w-3 h-3 text-text-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
              </svg>
            </div>
            <div className="w-5 h-5 rounded bg-surface-alt border border-border flex items-center justify-center">
              <svg className="w-3 h-3 text-text-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
              </svg>
            </div>
          </div>
        </div>

        {/* Email list */}
        <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`p-3 transition-colors ${i === 0 ? "bg-primary/[0.04]" : "bg-surface-alt"} hover:bg-primary/[0.06] cursor-pointer`}
            >
              <div className="flex items-start gap-2.5">
                {/* Unread dot */}
                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${i === 0 ? "bg-primary" : "bg-transparent"}`} />
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex-shrink-0 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">A</span>
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs ${i === 0 ? "font-bold text-text" : "font-medium text-text-muted"}`}>
                      acme.ai
                    </span>
                    <span className="text-[10px] text-text-faint font-mono flex-shrink-0">
                      {times[i] || "10:25 AM"}
                    </span>
                  </div>
                  <p className={`text-xs mt-0.5 leading-snug truncate ${i === 0 ? "font-semibold text-text" : "text-text"}`}>
                    {line}
                  </p>
                  <p className="text-[10px] text-text-faint mt-0.5 truncate">
                    Hi there, we have something special for you. Take a look at what we've been working on...
                  </p>
                </div>
                {/* Star */}
                <svg className={`w-3.5 h-3.5 flex-shrink-0 mt-1 ${i === 0 ? "text-yellow-400" : "text-border"}`} fill={i === 0 ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* A/B test label */}
        <div className="flex items-center gap-2 mt-3 pt-2">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[9px] font-mono text-text-faint uppercase tracking-wider">A/B Subject Line Variants</span>
          <div className="flex-1 h-px bg-border" />
        </div>
      </div>
    </CardShell>
  );
}
