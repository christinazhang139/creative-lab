import { useState } from "react";
import { translateVariants } from "../lib/ai";

const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "zh", label: "中", name: "中文" },
  { code: "ja", label: "JP", name: "日本語" },
  { code: "es", label: "ES", name: "Español" },
  { code: "ko", label: "KR", name: "한국어" },
];

const MOCK_TRANSLATIONS = {
  zh: {
    google: { headline: "部署AI，分钟搞定", description: "企业级AI部署平台。部署速度提升10倍，成本降低68%。立即免费试用。" },
    instagram: { caption: "还在花几天时间部署AI模型？😤\n\n我们改变了这一切。一条命令，分钟上线 🚀\n\n我们的平台处理基础设施，让你专注于真正重要的事——打造出色的AI产品 ✨\n\n成本降低68%，99.9%可用性，零烦恼。\n\n#AI #深度学习 #科技创业" },
    tiktok: { scenes: [
      { scene: 1, visual: "工程师对着报错的终端抓狂，时钟快进。", audio: "部署要等好几天的痛苦，你懂的" },
      { scene: 2, visual: "简洁的UI界面，一键部署，进度条瞬间跑满。", audio: "如果只要几分钟呢？" },
      { scene: 3, visual: "仪表盘展示实时指标、成本节省、运行时间。", audio: "AI模型部署提速10倍。链接在简介" },
    ]},
    email: { subject_lines: ["你的竞争对手部署AI的速度快了10倍——来看看怎么做", "⏰ AI部署平台免费试用即将结束", "AI推理成本降低68%——名额有限"] },
  },
  ja: {
    google: { headline: "AI展開、数分で完了", description: "エンタープライズ級AIデプロイプラットフォーム。セットアップ10倍高速化、コスト68%削減。無料トライアル開始。" },
    instagram: { caption: "まだAIモデルのデプロイに何日もかけてますか？😤\n\n私たちがそれを変えました。ワンコマンドで本番環境へ 🚀\n\nインフラはプラットフォームにお任せ。あなたは最高のAI製品の開発に集中 ✨\n\nコスト68%削減。稼働率99.9%。ゼロストレス。\n\n#AI #機械学習 #テックスタートアップ" },
    tiktok: { scenes: [
      { scene: 1, visual: "エラーだらけのターミナルに苛立つエンジニア。早送りされる時計。", audio: "デプロイに何日もかかるあの感覚…" },
      { scene: 2, visual: "シンプルなUI、ワンクリックデプロイ。プログレスバーが即座に完了。", audio: "もし数分で済むとしたら？" },
      { scene: 3, visual: "リアルタイム指標、コスト削減カウンター、稼働率バッジを表示するダッシュボード。", audio: "AIモデルを10倍速くデプロイ。リンクはプロフィールに" },
    ]},
    email: { subject_lines: ["競合は10倍速くAIをデプロイしています——その方法とは", "⏰ AI展開プラットフォーム無料トライアル終了間近", "AI推論コスト68%削減——限定枠あり"] },
  },
  es: {
    google: { headline: "Despliega IA en Minutos", description: "Plataforma de despliegue de IA empresarial. 10x más rápido, 68% menos costos. Prueba gratis hoy." },
    instagram: { caption: "¿Aún pasas días desplegando modelos de IA? 😤\n\nEso cambió. Un comando. Minutos a producción 🚀\n\nNuestra plataforma maneja la infraestructura para que te enfoques en lo que importa — crear productos de IA increíbles ✨\n\n68% menos costos. 99.9% uptime. Cero dolores de cabeza.\n\n#IA #MLOps #TechStartup" },
    tiktok: { scenes: [
      { scene: 1, visual: "Pantalla dividida: ingeniero frustrado con errores en terminal. Reloj en avance rápido.", audio: "¿Conoces esa sensación cuando el despliegue toma una eternidad?" },
      { scene: 2, visual: "UI limpia mostrando despliegue con un clic. Barra de progreso se llena al instante.", audio: "¿Y si tomara solo minutos?" },
      { scene: 3, visual: "Dashboard mostrando métricas en vivo, contador de ahorro, badge de uptime.", audio: "Despliega modelos de IA 10x más rápido. Link en bio." },
    ]},
    email: { subject_lines: ["Tu competencia despliega IA 10x más rápido — así es cómo", "⏰ Última oportunidad: prueba gratis de plataforma IA", "68% menos en costos de inferencia IA — cupos limitados"] },
  },
  ko: {
    google: { headline: "AI 배포, 몇 분이면 완료", description: "엔터프라이즈급 AI 배포 플랫폼. 10배 빠른 설정, 68% 비용 절감. 지금 무료 체험하세요." },
    instagram: { caption: "아직도 AI 모델 배포에 며칠씩 쓰고 계신가요? 😤\n\n우리가 바꿨습니다. 한 번의 명령으로 프로덕션까지 🚀\n\n인프라는 플랫폼이 처리하니, 당신은 멋진 AI 제품 개발에만 집중하세요 ✨\n\n68% 비용 절감. 99.9% 가동률. 스트레스 제로.\n\n#AI #MLOps #테크스타트업" },
    tiktok: { scenes: [
      { scene: 1, visual: "터미널 에러에 좌절하는 엔지니어. 빨리 감기되는 시계.", audio: "배포가 끝없이 걸리는 그 느낌, 아시죠?" },
      { scene: 2, visual: "깔끔한 UI, 원클릭 배포. 프로그레스 바가 순식간에 채워짐.", audio: "몇 분이면 된다면?" },
      { scene: 3, visual: "실시간 지표, 비용 절감 카운터, 가동률 배지가 표시된 대시보드.", audio: "AI 모델 배포 10배 빠르게. 프로필 링크 확인." },
    ]},
    email: { subject_lines: ["경쟁사는 AI를 10배 빠르게 배포합니다 — 방법은 이것", "⏰ AI 배포 플랫폼 무료 체험 곧 종료", "AI 추론 비용 68% 절감 — 한정 수량"] },
  },
};

export default function LanguageToggle({ variants, onTranslate, provider = "mock", apiKey = "" }) {
  const [active, setActive] = useState("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState(null);

  const handleSwitch = async (code) => {
    if (code === active) return;
    setIsTranslating(true);
    setError(null);
    setActive(code);

    if (code === "en") {
      onTranslate(null);
    } else if (provider === "mock") {
      const translated = MOCK_TRANSLATIONS[code];
      if (translated) {
        await new Promise(r => setTimeout(r, 300));
        onTranslate(translated);
      }
    } else {
      try {
        const translated = await translateVariants(provider, apiKey, variants, code);
        if (translated) {
          onTranslate(translated);
        } else {
          setError("Translation failed");
          setActive("en");
        }
      } catch (err) {
        setError(err.message);
        setActive("en");
        onTranslate(null);
      }
    }
    setIsTranslating(false);
  };

  return (
    <div className="flex items-center gap-2">
      <svg className="w-3.5 h-3.5 text-text-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
      </svg>
      <div className="flex items-center bg-surface-alt border border-border rounded-lg overflow-hidden">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSwitch(lang.code)}
            disabled={isTranslating}
            title={lang.name}
            className={`px-2 py-1 text-[10px] font-mono transition-all cursor-pointer ${
              active === lang.code
                ? "bg-text text-surface"
                : "text-text-muted hover:text-text hover:bg-surface"
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
      {isTranslating && (
        <span className="inline-block w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      )}
      {provider === "mock" && active !== "en" && (
        <span className="text-[9px] font-mono text-text-faint">demo translation</span>
      )}
      {error && (
        <span className="text-[9px] font-mono text-red-500">{error}</span>
      )}
    </div>
  );
}
