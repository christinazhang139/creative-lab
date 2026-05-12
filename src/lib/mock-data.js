const MOCK_CATALOG = {
  sneakers: {
    keywords: ["nike", "shoe", "sneaker", "air max", "jordan", "adidas", "running", "footwear", "sole", "cushion", "midsole"],
    hooks: [
      { id: 1, hook: "All-Day Cloud Comfort", angle: "Advanced cushioning technology that makes every step feel effortless — from morning commute to evening run" },
      { id: 2, hook: "Street-Ready Style", angle: "Head-turning design with bold colorways that transition from gym to street to nightlife" },
      { id: 3, hook: "Built to Last", angle: "Premium materials and durable construction that outlasts the competition — investment, not expense" },
    ],
    variants: {
      google: { headline: "Walk on Clouds. Look Fire.", description: "Premium sneakers with next-gen cushioning. 8 colorways. Free shipping & returns. Shop the best seller now." },
      instagram: { caption: "Comfort that hits different. 🔥\n\nYou know that feeling when you slip on a pair and just KNOW? That's this.\n\nAll-day cushioning ☁️\nStreet-ready looks 👟\nBuilt to outlast everything\n\n8 colorways just dropped. Which one's yours? 👇\n\n#Sneakers #Kicks #OOTD #Streetwear #SneakerHead" },
      tiktok: { scenes: [
        { scene: 1, visual: "Close-up of shoe box opening slowly. Tissue paper pulls back to reveal fresh kicks. Camera catches the details.", audio: "POV: Your new obsession just arrived." },
        { scene: 2, visual: "Quick cuts — walking downtown, running in park, dancing at party. Same shoes, three vibes.", audio: "Morning. Afternoon. Night. One pair handles it all." },
        { scene: 3, visual: "Slow-mo hero shot of the shoe. Color options flash. Price tag appears with 'Free Shipping' badge.", audio: "8 colors. Free shipping. Link in bio before they're gone." },
      ]},
      email: { subject_lines: ["Your size is selling out — grab yours now", "🔥 The shoe everyone's wearing just dropped new colors", "Free shipping ends tonight on our #1 best seller"] },
    },
    refine: {
      1: { variants: { google: { headline: "Cloud-Like Comfort, All Day", description: "Next-gen cushioning technology in every step. Feel the difference from first wear. Free returns." }, instagram: { caption: "☁️ What if every step felt like walking on clouds?\n\nThat's not a dream. That's the tech inside these.\n\nAdvanced foam midsole\nImpact-absorbing Air unit\nLightweight breathable mesh\n\nYour feet will literally thank you. 🙏\n\n#Comfort #WalkOnClouds #Sneakers" }, tiktok: { scenes: [{ scene: 1, visual: "Person grimacing taking off old shoes, rubbing feet.", audio: "We've all been here..." }, { scene: 2, visual: "Same person slipping on new shoes. Instant smile. Walking, jumping, dancing.", audio: "Then I tried these. Game. Changed." }, { scene: 3, visual: "X-ray animation showing cushioning tech. Person walking happily at hour 12.", audio: "All-day comfort isn't marketing. It's engineering. Link in bio." }] }, email: { subject_lines: ["Your feet deserve better — feel the cloud difference", "⏰ 12 hours on your feet? No problem with this tech", "\"Most comfortable shoe I've ever worn\" — 12,000 reviews agree"] } } },
      2: { variants: { google: { headline: "Sneakers That Turn Heads", description: "8 bold colorways designed to make a statement. From street to scene, look fire everywhere. Shop now." }, instagram: { caption: "Fit check? ✅✅✅\n\nThese aren't just shoes. They're a whole mood.\n\n8 colorways that go with EVERYTHING:\n🖤 Classic Black/White\n❤️ Varsity Red\n💜 Purple Haze\n... and 5 more\n\nWhich one matches your vibe? Drop a color below 👇\n\n#FitCheck #StyleInspo #Kicks" }, tiktok: { scenes: [{ scene: 1, visual: "Mirror selfie showing outfit with the shoes. Quick zoom to feet.", audio: "Rate my fit. Especially the shoes." }, { scene: 2, visual: "Rapid-fire montage: 8 colorways paired with 8 different outfits.", audio: "8 colors. 8 vibes. Which one's you?" }, { scene: 3, visual: "Walking through city at golden hour. Shoes catching light.", audio: "The shoes that make people ask 'where'd you get those?' Link in bio." }] }, email: { subject_lines: ["Your next signature look just dropped 👟", "8 new colorways — which one matches your vibe?", "\"Where'd you get those?\" — be ready for the question"] } } },
      3: { variants: { google: { headline: "Premium Shoes. Built to Last.", description: "Durable rubber outsole, reinforced mesh upper. Quality that outlasts trends. Worth every penny." }, instagram: { caption: "6 months later and still looking fresh. 👟\n\nMost shoes fall apart. These don't.\n\n✅ Durable rubber outsole\n✅ Reinforced stitching\n✅ Premium mesh that breathes AND lasts\n\n12,000 five-star reviews can't be wrong.\n\n#Quality #BuyItForLife #Premium" }, tiktok: { scenes: [{ scene: 1, visual: "Side-by-side: cheap shoe falling apart at 3 months vs this shoe still pristine.", audio: "Cheap shoes after 3 months vs these after 6 months." }, { scene: 2, visual: "Close-up stress tests — bending sole, pulling mesh, scuff resistance.", audio: "Built different. Literally." }, { scene: 3, visual: "Calculator showing cost-per-wear math. Premium shoe wins.", audio: "Price per wear? These are actually cheaper. Link in bio." }] }, email: { subject_lines: ["Stop replacing cheap shoes every 3 months", "💪 The shoe that's still fresh after 12,000 reviews", "Invest once, wear forever — quality your feet deserve"] } } },
    },
  },
  saas: {
    keywords: ["saas", "platform", "software", "api", "dashboard", "deploy", "cloud", "enterprise", "ai", "model", "inference", "machine learning", "llm", "subscription", "b2b"],
    hooks: [
      { id: 1, hook: "10x Faster Deployment", angle: "Speed and efficiency — deploy AI models in minutes, not days" },
      { id: 2, hook: "Enterprise-Grade Reliability", angle: "Production-ready infrastructure with 99.9% uptime guarantee" },
      { id: 3, hook: "Cost Optimization Built-in", angle: "Reduce inference costs by up to 68% with intelligent memory management" },
    ],
    variants: {
      google: { headline: "Deploy AI Models in Minutes", description: "Enterprise-grade AI deployment platform. 10x faster setup, 68% cost reduction. Start your free trial today." },
      instagram: { caption: "Still spending days deploying AI models? 😤\n\nWe changed that. One command. Minutes to production. 🚀\n\nOur platform handles the infrastructure so you can focus on what matters — building amazing AI products ✨\n\n68% lower costs. 99.9% uptime. Zero headaches.\n\n#AI #MLOps #DeepLearning #TechStartup" },
      tiktok: { scenes: [{ scene: 1, visual: "Split screen: engineer frustrated with terminal errors. Clock fast-forwarding.", audio: "You know that feeling when deploying takes forever?" }, { scene: 2, visual: "Clean UI showing one-click deployment. Progress bar fills instantly.", audio: "What if it took minutes instead of days?" }, { scene: 3, visual: "Dashboard showing live metrics, cost savings counter, uptime badge.", audio: "Deploy AI models 10x faster. Link in bio." }] },
      email: { subject_lines: ["Your competitors are deploying AI 10x faster — here's how", "⏰ Last chance: Free trial ending for AI deployment platform", "68% cost reduction on AI inference — limited spots available"] },
    },
    refine: {
      1: { variants: { google: { headline: "AI Models Live in Minutes", description: "Stop waiting days to deploy. Our platform gets your models to production 10x faster. Try free." }, instagram: { caption: "⏱️ 3 minutes.\n\nThat's all it takes to go from model to production.\n\nNo more week-long deployment cycles.\nNo more infrastructure headaches.\nNo more waiting.\n\nJust pure speed. 🚀\n\n#SpeedMatters #AIDeployment #MLOps" }, tiktok: { scenes: [{ scene: 1, visual: "Timer on screen. Engineer types one command.", audio: "Watch me deploy an AI model in under 3 minutes." }, { scene: 2, visual: "Terminal showing real-time progress.", audio: "Infrastructure? Handled. Optimization? Automatic." }, { scene: 3, visual: "Timer stops at 2:47. Live endpoint responding.", audio: "2 minutes 47 seconds. From zero to production. Link in bio." }] }, email: { subject_lines: ["Deploy in minutes, not days — see how", "⚡ Your next AI model could be live in 3 minutes", "Still waiting days to deploy? There's a faster way"] } } },
      2: { variants: { google: { headline: "99.9% Uptime AI Platform", description: "Enterprise-grade AI infrastructure built for reliability. Trusted by teams who can't afford downtime." }, instagram: { caption: "\"It went down again\" 😰\n\nWords no AI team wants to hear.\n\nThat's why we built for 99.9% uptime.\nAuto-scaling. Auto-healing. Auto-everything.\n\nYour models stay up so you can sleep at night 😴💤\n\n#Reliability #Enterprise #AI" }, tiktok: { scenes: [{ scene: 1, visual: "3 AM. Phone buzzing with alerts. Engineer jolts awake.", audio: "Every ML engineer's nightmare..." }, { scene: 2, visual: "Phone is silent. Dashboard shows green. Auto-scaling in action.", audio: "Unless your platform handles it for you." }, { scene: 3, visual: "Engineer sleeping peacefully. 99.9% uptime badge glowing.", audio: "99.9% uptime. Because your AI never sleeps, but you should." }] }, email: { subject_lines: ["Can your AI platform survive Black Friday traffic?", "🛡️ 99.9% uptime — the enterprise standard you need", "Your models crashed again? Let's fix that permanently"] } } },
      3: { variants: { google: { headline: "Cut AI Costs by 68%", description: "Intelligent memory management reduces inference costs dramatically. Same performance, fraction of the price." }, instagram: { caption: "💸 Your AI inference bill is too high.\n\nWe cut it by 68%.\n\nSame models. Same performance.\nJust smarter memory management.\n\nPagedAttention + intelligent batching = massive savings 📉\n\n#CostOptimization #AI #Savings" }, tiktok: { scenes: [{ scene: 1, visual: "Cloud bill growing on screen. Numbers climbing rapidly.", audio: "This is your AI inference bill every month." }, { scene: 2, visual: "Toggle switch flips. Bill shrinks by 68%.", audio: "This is your bill with intelligent memory management." }, { scene: 3, visual: "Savings calculator showing monthly/yearly savings.", audio: "68% less. Same performance. Do the math. Link in bio." }] }, email: { subject_lines: ["You're overpaying for AI inference by 68%", "💰 Save $10K/month on GPU costs — here's the math", "Your CFO will love this: 68% cheaper AI inference"] } } },
    },
  },
  ecommerce: {
    keywords: ["shop", "store", "ecommerce", "e-commerce", "brand", "d2c", "dtc", "shopify", "catalog", "product", "sell", "revenue", "merchant", "retail"],
    hooks: [
      { id: 1, hook: "3x Content, Zero Extra Work", angle: "Automate content creation across all channels — 3x output with the same team size" },
      { id: 2, hook: "Speaks Every Language", angle: "12-language support means global reach without hiring translators or local agencies" },
      { id: 3, hook: "Learns Your Brand Voice", angle: "AI that sounds like YOU after just 5 examples — consistent tone across every touchpoint" },
    ],
    variants: {
      google: { headline: "AI Content for E-Commerce", description: "Auto-generate product descriptions, social posts & emails in 12 languages. Trusted by 2,000+ brands." },
      instagram: { caption: "2,000+ brands. $500M in revenue. One AI. 🤖\n\nStill writing product descriptions manually? That's so 2023.\n\nOur AI learns your brand voice in 5 examples and generates:\n📝 SEO descriptions\n📱 Social captions\n✉️ Email campaigns\n🌍 In 12 languages\n\n3x faster. 25% cheaper. Way more consistent.\n\n#Ecommerce #AIMarketing #D2C #Shopify" },
      tiktok: { scenes: [{ scene: 1, visual: "Marketer drowning in tabs — Shopify, Instagram, Mailchimp. Head in hands.", audio: "When you're a one-person marketing team..." }, { scene: 2, visual: "One button click. AI generates descriptions, posts, emails simultaneously.", audio: "What if AI could do all of this in seconds?" }, { scene: 3, visual: "Dashboard showing 3x content output, revenue attribution.", audio: "2,000 brands already made the switch. Link in bio." }] },
      email: { subject_lines: ["Your competitors are creating 3x more content — here's their secret", "🚨 Stop writing product descriptions manually", "25% less spend, 3x more content — see how 2,000 brands did it"] },
    },
    refine: {
      1: { variants: { google: { headline: "3x Content. Same Team.", description: "AI-powered content automation for e-commerce. Generate descriptions, social posts & emails instantly." }, instagram: { caption: "📊 Same team. 3x the output.\n\nNo extra hires. No agencies. No burnout.\n\nJust AI that creates:\n• Product descriptions in seconds\n• Social posts that convert\n• Email campaigns that sell\n\nAll on autopilot. ✈️\n\n#ContentAutomation #Ecommerce" }, tiktok: { scenes: [{ scene: 1, visual: "Calendar showing content schedule. Everything marked 'overdue'.", audio: "Your content calendar right now." }, { scene: 2, visual: "AI filling in the calendar automatically.", audio: "Your content calendar with AI." }, { scene: 3, visual: "Before (3 posts/week) vs After (12 posts/week). Revenue up.", audio: "3x more content. Same team. More revenue. Link in bio." }] }, email: { subject_lines: ["How to 3x your content without hiring anyone", "⚡ Generate a week's content in 10 minutes", "Your team is spending 60% of time on content that AI can handle"] } } },
      2: { variants: { google: { headline: "Sell Globally, Instantly", description: "AI-powered product content in 12 languages. Reach new markets without translators. Start free." }, instagram: { caption: "🌍 Your product. 12 languages. Zero translators.\n\nGoing global used to mean:\n❌ Expensive agencies\n❌ Months of translation\n❌ Lost brand voice\n\nNow it means:\n✅ One click\n✅ 12 languages\n✅ Your voice, everywhere\n\n#GoGlobal #Ecommerce" }, tiktok: { scenes: [{ scene: 1, visual: "World map lighting up. Customer messages in different languages.", audio: "Your customers speak 12 languages. Does your store?" }, { scene: 2, visual: "Product page translating in real-time.", audio: "Now it can. Instantly. In 12 languages." }, { scene: 3, visual: "Revenue chart breaking down by country.", audio: "Every language is a new market. Link in bio." }] }, email: { subject_lines: ["You're leaving 80% of the market on the table", "🌐 12 new markets. One click. Zero translators.", "Your next $1M is in a language you don't speak yet"] } } },
      3: { variants: { google: { headline: "AI That Sounds Like You", description: "Learns your brand voice from 5 examples. Every description, post & email sounds authentically yours." }, instagram: { caption: "\"This doesn't sound like us.\" 😑\n\nEvery brand's nightmare with AI content.\n\nWe fixed it.\n\n5 examples. That's all our AI needs to nail your voice.\n\nSnarky? ✅\nMinimal? ✅\nLuxury? ✅\n\nYour brand. Your voice. At scale.\n\n#BrandVoice #AI" }, tiktok: { scenes: [{ scene: 1, visual: "Generic AI output side-by-side with brand's actual voice.", audio: "This is what AI content usually sounds like vs your brand." }, { scene: 2, visual: "Feeding 5 examples into AI. Output transforms.", audio: "5 examples. That's all it takes." }, { scene: 3, visual: "Team reviewing AI content. Nodding. 'Sounds like us!'", audio: "AI content your team actually approves. First try. Link in bio." }] }, email: { subject_lines: ["AI that actually sounds like your brand (not a robot)", "5 examples → perfect brand voice. See how.", "\"I forgot this was AI-written\" — what your team will say"] } } },
    },
  },
  food: {
    keywords: ["food", "restaurant", "meal", "coffee", "tea", "organic", "healthy", "recipe", "cook", "kitchen", "drink", "beverage", "snack", "vegan", "diet", "brew", "bottle", "ingredient", "taste", "flavor", "sugar", "calorie", "nutrition", "roast", "bean"],
    hooks: [
      { id: 1, hook: "Clean Ingredients Only", angle: "100% natural, no artificial anything — transparency that health-conscious consumers demand" },
      { id: 2, hook: "Taste That Surprises", angle: "Unexpectedly delicious — challenges the assumption that healthy means boring" },
      { id: 3, hook: "Ready in Minutes", angle: "Convenience without compromise — fits into the busiest lifestyles without sacrificing quality" },
    ],
    variants: {
      google: { headline: "Healthy Food. Actually Good.", description: "100% natural ingredients, chef-crafted taste. Ready in minutes. Free sample box with first order." },
      instagram: { caption: "\"Wait, this is HEALTHY?\" 🤯\n\nYep. Every single time.\n\n100% natural ingredients ✅\nChef-crafted recipes ✅\nReady in 3 minutes ✅\n\nNo artificial colors. No weird chemicals. No boring flavors.\n\nJust food that's good AND good for you. 🥗✨\n\n#HealthyFood #CleanEating #Foodie #MealPrep" },
      tiktok: { scenes: [{ scene: 1, visual: "Flip the package. Camera zooms on ingredients — only 6 items, all recognizable.", audio: "Can you pronounce every ingredient? Because you should be able to." }, { scene: 2, visual: "Taste test reaction. Person's eyes go wide.", audio: "Wait — this is the healthy one?!" }, { scene: 3, visual: "Timer shows 3 minutes. Meal is ready. Beautiful plating.", audio: "3 minutes. Clean ingredients. Unreal taste. Link in bio." }] },
      email: { subject_lines: ["Your free sample box is waiting 🎁", "⏰ 3-minute meals that don't taste \"healthy\"", "See the ingredients list that's shocking people (in a good way)"] },
    },
    refine: {
      1: { variants: { google: { headline: "6 Ingredients. All Natural.", description: "100% clean ingredients you can pronounce. No artificial anything. See our full transparency label." }, instagram: { caption: "🔍 Flip the package.\n\nIngredient #1: Real food\nIngredient #2: Real food\nIngredient #3: Real food\n...that's basically it.\n\nNo preservatives. No artificial flavors. No mystery powders.\n\nJust clean, honest food. 🌿\n\n#CleanLabel #Transparency" }, tiktok: { scenes: [{ scene: 1, visual: "Competitor's ingredient list — 30+ items, unpronounceable.", audio: "This is what's in most 'healthy' food." }, { scene: 2, visual: "Our ingredient list — 6 items, all real food.", audio: "This is what's in ours." }, { scene: 3, visual: "Both packages side by side. Ours glowing.", audio: "If you can't pronounce it, don't eat it. Link in bio." }] }, email: { subject_lines: ["Can you pronounce your food's ingredients?", "🌿 6 ingredients. All real. All pronounceable.", "We're hiding nothing — see our full ingredient transparency"] } } },
      2: { variants: { google: { headline: "Healthy Meets Delicious", description: "Chef-crafted recipes that prove healthy food can taste amazing. Try free — taste the difference." }, instagram: { caption: "\"Healthy food is boring\"\n\nSaid no one who tried THIS. 🤤\n\nOur chefs spent 18 months perfecting flavors.\n\nBold. Rich. Craveable.\n\n...and somehow still 100% clean ingredients.\n\n🔥\n\n#Delicious #HealthyNotBoring #FoodPorn" }, tiktok: { scenes: [{ scene: 1, visual: "Blindfold taste test. Two bowls. Person tries both.", audio: "Blind taste test: regular vs healthy. Which one wins?" }, { scene: 2, visual: "Reveal: the winner IS the healthy one. Shocked reactions.", audio: "Plot twist — they picked the healthy one. Every. Single. Time." }, { scene: 3, visual: "Chef plating the dish. Close-up food shots.", audio: "Healthy food that wins taste tests. Link in bio." }] }, email: { subject_lines: ["Healthy food that actually tastes amazing (proof inside)", "😋 Our blind taste test results will surprise you", "\"I forgot this was healthy\" — 5,000 reviews say the same"] } } },
      3: { variants: { google: { headline: "Healthy Meals in 3 Minutes", description: "Chef-quality, clean-ingredient meals ready in minutes. Perfect for busy schedules. Free trial box." }, instagram: { caption: "⏱️ 3 minutes.\n\nThat's the time between you and a chef-quality, 100% clean meal.\n\nNo prep. No cooking skills. No cleanup.\n\nJust real food, really fast. ⚡\n\nPerfect for:\n🏃 Busy mornings\n💼 Office lunches\n😴 Tired evenings\n\n#QuickMeals #BusyLife #MealPrep" }, tiktok: { scenes: [{ scene: 1, visual: "Alarm goes off. Rush to get ready. No time for food.", audio: "When there's no time to eat well..." }, { scene: 2, visual: "3-minute timer. Beautiful meal ready.", audio: "Unless it only takes 3 minutes." }, { scene: 3, visual: "Week of 3-minute meals. Person looking healthier.", audio: "Healthy eating in 3 minutes. Every day. Link in bio." }] }, email: { subject_lines: ["Too busy to eat well? Not anymore (3 minutes)", "⚡ Your morning routine + 3 minutes = chef-quality meal", "No time isn't an excuse anymore — healthy meals in 180 seconds"] } } },
    },
  },
  generic: {
    keywords: [],
    hooks: [
      { id: 1, hook: "Solves a Real Problem", angle: "Addresses a genuine pain point that customers face daily — not a nice-to-have but a must-have" },
      { id: 2, hook: "Effortless Experience", angle: "So simple to use that it feels like magic — removes friction from the customer journey" },
      { id: 3, hook: "Trusted by Thousands", angle: "Social proof and momentum — join a growing community of satisfied customers" },
    ],
    variants: {
      google: { headline: "The Smarter Way Forward", description: "Join thousands who switched to a better solution. Simple, effective, and loved by customers. Try free today." },
      instagram: { caption: "There's a reason thousands made the switch. 💡\n\n❌ The old way: complicated, slow, frustrating\n✅ The new way: simple, fast, delightful\n\nSame goal. Better experience. Zero headaches.\n\n⭐⭐⭐⭐⭐\n\nLink in bio to try free 👆\n\n#Innovation #BetterWay #CustomerLove" },
      tiktok: { scenes: [{ scene: 1, visual: "Person struggling with the 'old way'. Visible frustration.", audio: "We've all been here. The struggle is real." }, { scene: 2, visual: "Same task, new solution. Smooth, easy, satisfying.", audio: "Then we found a better way." }, { scene: 3, visual: "Counter showing growing customer count. Five stars.", audio: "Thousands already switched. Your turn. Link in bio." }] },
      email: { subject_lines: ["There's a better way — see what thousands discovered", "⭐ 5,000 five-star reviews can't be wrong", "You're working too hard — let us show you the easier way"] },
    },
    refine: {
      1: { variants: { google: { headline: "Fix Your Biggest Problem", description: "Purpose-built to solve the pain point you deal with every day. See why customers call it a game-changer." }, instagram: { caption: "You know that thing that bugs you EVERY. SINGLE. DAY? 😤\n\nWe built something to fix it.\n\nNot a workaround. Not a band-aid.\nA real solution.\n\n\"Why didn't this exist before?\" — our most common review ⭐\n\n#ProblemSolved #GameChanger" }, tiktok: { scenes: [{ scene: 1, visual: "Compilation of people struggling with the same problem.", audio: "Everyone deals with this. Nobody talks about it." }, { scene: 2, visual: "Product solving it elegantly. Satisfied reactions.", audio: "Until now." }, { scene: 3, visual: "Reviews scrolling: 'game changer', 'can't live without it'", audio: "Problem solved. Permanently. Link in bio." }] }, email: { subject_lines: ["The daily frustration you've accepted (but shouldn't)", "🎯 Built specifically for your biggest pain point", "\"Why didn't this exist before?\" — our most common review"] } } },
      2: { variants: { google: { headline: "So Easy, It Feels Magic", description: "Setup in seconds, results immediately. The simplest solution you'll ever use. Try free today." }, instagram: { caption: "✨ What if it just... worked?\n\nNo tutorials. No learning curve. No 47-step setup.\n\nJust open it and go.\n\n\"Easiest thing I've ever used\" — actual review\n\nTry it free 👆\n\n#Simplicity #UX #JustWorks" }, tiktok: { scenes: [{ scene: 1, visual: "Tutorial for competitor: 45 minutes long. Person falling asleep.", audio: "Their setup tutorial." }, { scene: 2, visual: "Our setup: 3 clicks, done. Timer shows 12 seconds.", audio: "Our setup: 12 seconds." }, { scene: 3, visual: "Person already using it, smiling.", audio: "Some things should just work. This does. Link in bio." }] }, email: { subject_lines: ["Setup in 12 seconds. No, really.", "✨ The product that needs zero tutorials", "\"It just works\" — the 3-word review we're proudest of"] } } },
      3: { variants: { google: { headline: "Loved by 5,000+ Customers", description: "Join thousands who already made the switch. 5-star average rating. See why people love it." }, instagram: { caption: "📊 The numbers speak:\n\n⭐ 4.9/5 average rating\n👥 5,000+ happy customers\n🔄 94% stick around after year one\n💬 \"Best decision I made this year\"\n\nAt some point, it stops being hype and starts being proof. 📈\n\n#SocialProof #Reviews #Trusted" }, tiktok: { scenes: [{ scene: 1, visual: "Scrolling through real 5-star reviews.", audio: "We didn't write these. Our customers did." }, { scene: 2, visual: "Counter ticking up: new customers joining.", audio: "And more join every day." }, { scene: 3, visual: "Community montage — diverse people, all smiling.", audio: "5,000 people can't all be wrong. Link in bio." }] }, email: { subject_lines: ["5,000 customers can't all be wrong", "⭐ See why we have a 4.9/5 rating", "\"Best decision I made this year\" — join 5,000 happy customers"] } } },
    },
  },
};

function detectCategory(text) {
  const lower = (text || "").toLowerCase();
  let bestMatch = "generic";
  let bestScore = 0;
  for (const [category, data] of Object.entries(MOCK_CATALOG)) {
    if (category === "generic") continue;
    const score = data.keywords.reduce((acc, kw) => acc + (lower.includes(kw) ? 1 : 0), 0);
    if (score > bestScore) { bestScore = score; bestMatch = category; }
  }
  return bestMatch;
}

export function getMockHooks(text, images = []) {
  if (images.length > 0 && !text?.trim()) {
    return {
      hooks: [
        { id: 1, hook: "Visual-First Experience", angle: "Stunning product design that speaks for itself — let the visuals do the selling" },
        { id: 2, hook: "Premium Craftsmanship", angle: "Every detail is intentional — quality you can see and feel from the first glance" },
        { id: 3, hook: "Stand Out From the Crowd", angle: "A distinctive look that makes customers stop scrolling and start buying" },
      ],
    };
  }
  const cat = detectCategory(text);
  return { hooks: MOCK_CATALOG[cat].hooks };
}

export function getMockVariants(hooks) {
  if (!hooks?.length) return { variants: MOCK_CATALOG.generic.variants };
  for (const data of Object.values(MOCK_CATALOG)) {
    if (data.hooks[0].hook === hooks[0].hook) return { variants: data.variants };
  }
  return { variants: MOCK_CATALOG.generic.variants };
}

export function getMockRefinedVariants(hook, hooks) {
  for (const data of Object.values(MOCK_CATALOG)) {
    const matchesCategory = data.hooks.some((h) => h.hook === hooks?.[0]?.hook);
    if (matchesCategory && data.refine?.[hook.id]) return data.refine[hook.id];
  }
  return MOCK_CATALOG.generic.refine?.[hook.id] || { variants: MOCK_CATALOG.generic.variants };
}
