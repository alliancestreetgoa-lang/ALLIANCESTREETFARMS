# 🌿 REPLIT PROMPT — Alliance Street Organic Farms Website

## COPY EVERYTHING BELOW THIS LINE INTO REPLIT

---

Build a complete, beautiful, fully animated single-page HTML website for **Alliance Street Organic Farms** — an organic farm in Goa, India. Save as a single `index.html` file.

---

## TECH STACK
- Single `index.html` file (HTML + CSS + JavaScript only — no frameworks, no npm)
- Google Fonts (Playfair Display + Lato + Dancing Script)
- Vanilla JS for animations, tabs, scroll effects
- CSS animations and keyframes for all motion
- IntersectionObserver for scroll-triggered reveals
- Responsive (mobile + desktop)

---

## BRAND IDENTITY
- **Farm Name:** Alliance Street Organic Farms
- **Location:** Goa, India
- **Colors:**
  - Primary Green: `#2d5a27`
  - Dark Earth: `#5c3d1e`
  - Gold Accent: `#c8962a`
  - Sage: `#7a9e6d`
  - Cream BG: `#faf6ef`
  - Light Green: `#e8f0e4`
  - Dark Forest: `#1a3a14`
- **Fonts:** 
  - Display: `Playfair Display` (headings, hero title)
  - Body: `Lato` (300, 400, 700 weights)
  - Accent: `Dancing Script` (taglines, decorative)
- **Tone:** Premium organic, earthy, warm, trustworthy, Goan

---

## SECTION 1 — FIXED NAVIGATION

Sticky top navbar, 70px tall, background `rgba(26,18,8,0.97)` with `backdrop-filter: blur(12px)`. Bottom border: `1px solid rgba(200,150,42,0.3)`.

**Left:** Logo text "Alliance Street Organic Farms" in Playfair Display gold. Below it in small caps: "GOA, INDIA".

**Right:** Nav links (hidden on mobile, use hamburger menu): Animals | Eggs | Goats | Rabbits | Why Organic | About | Team | Contact

Nav links: white, 0.82rem, letter-spacing 1.5px, uppercase. Hover: gold color transition.

**Mobile:** Show hamburger button (3 lines). On click, slide down full-width menu with same links stacked.

---

## SECTION 2 — HERO (FULL SCREEN WITH ANIMATED ANIMALS)

Full viewport height (`100vh`). Background: rich layered gradient:
```css
background: linear-gradient(160deg, #0d2409 0%, #1a3a14 35%, #2d5a27 65%, #3d4a1a 100%);
```

**Animated floating particles:** 25 small dots (2–4px) slowly drifting upward with random opacity pulses. Pure CSS `@keyframes`.

**Left side (60% width):** Text content centered vertically.
- Animated eyebrow in Dancing Script: *"Welcome to Alliance Street Organic Farms"* — fade+slide up, delay 0.2s
- Hero title in Playfair Display (bold 900), 4.5–5rem: **"Where Ethical Farming Meets Nutritional Excellence"** — word `"Nutritional Excellence"` in gold italic — fade+slide up, delay 0.5s
- Subtitle paragraph (Lato 300, 1.05rem): *"Premium desi chicken, goat meat, farm-fresh eggs & nutritious goat milk — raised without antibiotics, hormones, or artificial chemicals in the heart of Goa."* — fade in delay 0.8s
- 5 animated pill badges (staggered pop-in animation): `🌿 100% Organic` | `🐓 Native Breeds` | `🚫 No Antibiotics` | `🐐 Free Range` | `📍 Goa, India`
- Two CTA buttons: `[Meet Our Animals]` (gold filled) + `[Our Story]` (outlined white). Both have lift + scale on hover.

**Right side (40% width) — ANIMATED ANIMALS SCENE:**

Draw an animated SVG scene inside a rounded box (border-radius 24px, border: 2px solid rgba(200,150,42,0.3)). The scene shows happy farm animals in a green meadow at golden hour.

Use pure SVG + CSS animations to create:

**Background layers:**
- Sky gradient: deep blue-green to warm orange at the horizon (golden hour)
- Rolling green hills using `<path>` curves (2–3 layers with different greens)
- Small animated sun/glow at the top right corner (gentle pulse)
- Ground layer: warm brown earth strip at the bottom
- Tiny animated clouds: 2–3 fluffy `<ellipse>` clusters slowly drifting left to right

**Animated animals (CSS keyframe animations, all looping):**

1. **Goat** (simple SVG illustration): standing on the hill, ears wiggle gently (rotate animation on ear paths). Body: rounded rectangle body, 4 leg lines, small horn curves, circle head. Color: off-white/cream `#f5f0e0`. Tail wags. Animation: `@keyframes goatWag` — tail rotates ±15deg, 1.5s infinite ease-in-out.

2. **Desi Chicken** (simple SVG): pecking the ground — head bobs up and down. Red comb on top. Round body, small wing, stick legs. Color: warm orange-brown `#c47b3a`. Animation: `@keyframes peck` — head translateY ±12px, 0.8s infinite ease-in-out.

3. **Rabbit** (simple SVG): sitting up, ears tall, nose twitches. Round body, large oval ears, small tail circle. Color: grey-white `#e8e4dc`. Animation: `@keyframes noseWiggle` — tiny nose scaleX ±0.3, 0.5s infinite ease-in-out. Ears: gentle rotate ±3deg.

4. **Small chick / baby chicken**: tiny round body, small beak, tiny wings. Hops side to side. Animation: `@keyframes hop` — translateX ±8px + translateY -6px bounce, 1.2s infinite.

5. **Butterflies**: 2 tiny butterflies made from 4 small ellipses, fluttering across the scene from left to right. Animation: `@keyframes flutter` — wings scaleY ±0.3 fast (0.3s), while the whole butterfly moves on a curved path across the scene (8s linear infinite).

6. **Grass blades**: 8–10 thin `<rect>` blades at the bottom, swaying with CSS `transform-origin: bottom`, staggered rotation animations (±8deg, 2–3s each, different delays).

7. **Stars/fireflies**: 5 tiny dots (1–2px) in the upper sky that twinkle (opacity 0.2 to 0.8, random delays).

The whole scene: `width: 100%`, `viewBox: 0 0 480 360`. Animals should feel alive and happy — NOT scary or sad. This is a joyful, peaceful farm scene.

Add gentle parallax: when the user scrolls, the hero right panel moves at 0.5× scroll speed (JavaScript `window.scroll` listener, `transform: translateY`).

---

## SECTION 3 — PRODUCTS OVERVIEW STRIP

Background: cream `#faf6ef`. Padding 80px vertical.

Section label: "WHAT WE OFFER" in gold, uppercase, letter-spacing 4px, 0.72rem.
Section title: "Farm-Fresh Products, Delivered with Pride" in Playfair Display.
Horizontal gold gradient divider (60px wide, 3px tall).

5 product cards in a responsive grid (auto-fill, min 180px). Each card:
- White background, border `1px solid #e8e0d4`, border-radius 16px
- Hover: lift 6px, `box-shadow: 0 20px 50px rgba(44,30,10,0.12)`
- Scroll-reveal animation: cards cascade in with staggered `fadeInUp` (0.1s delays between each)
- Large emoji icon (3rem), product name in Playfair Display, short description in Lato

Cards:
1. 🐓 **Desi Chicken** — Free-range native breeds raised on clean feed and open grazing
2. 🥚 **Desi Eggs** — Vitamin-rich country chicken eggs — hormone-free and naturally nutritious
3. 🐐 **Goat Meat** — High-protein, tender meat from Osmanabadi & Konkan Kanyal breeds
4. 🥛 **Goat Milk** — Chemical-free, nutrient-dense milk straight from happy, healthy goats
5. 🐰 **Rabbit Meat** — Lean, low-cholesterol protein from premium rabbit breeds

---

## SECTION 4 — CHICKEN & RABBIT BREEDS (TABBED)

Background: white. Full content section.

**Tab switcher:** Two pill-style tabs: `🐓 Chicken Breeds` and `🐰 Rabbit Breeds`. Active tab: gold background, white text. Inactive: outlined. Smooth `opacity` + `transform` transition when switching.

**Scroll reveal:** Breed cards appear with staggered `fadeInUp` as user scrolls.

**Chicken Breeds Grid** (4 columns on desktop, 2 on tablet, 1 on mobile):

Each breed card: white background, border 1px solid #e8e0d4, border-radius 12px, overflow hidden. Top colored emoji banner (180px tall, gradient background unique per breed). Hover: lift + shadow.

1. **Srinidhi Chicken**
   - Banner BG: gradient from `#7a9e6d` to `#2d5a27`, emoji 🐓
   - Description: A scientifically developed dual-purpose variety known for its high-quality meat and nutrient-dense eggs. The meat is tender, rich in complete proteins, and lower in excess fat, making it ideal for active and health-conscious individuals. Eggs provide essential amino acids, vitamins, and minerals that support immunity, muscle health, and daily energy.
   - Tags: 🧬 High Protein | ❤️ Heart-Friendly | 🛡️ Immunity Support | 🥚 Nutrient-Rich Eggs

2. **Sonali Chicken**
   - Banner BG: gradient from `#c8962a` to `#8a6010`, emoji 🐔
   - Description: Sonali chicken offers lean, easily digestible meat suitable for balanced and low-fat diets. Its eggs are rich in protein, iron, and vitamin B12, supporting red blood cell formation, metabolism, and cardiovascular health. A reliable choice for families seeking affordable nutrition without compromising quality.
   - Tags: 💪 Lean Protein | 🔥 Low Fat | ❤️ Heart Health | ⚡ Energy Boosting Eggs

3. **Kadaknath Chicken**
   - Banner BG: gradient from `#2c2c2c` to `#1a1a1a`, emoji 🐓 (rare black meat breed)
   - Description: Kadaknath chicken is a rare indigenous breed globally recognized for its distinctive black meat. Scientifically valued for high protein, low fat, and low cholesterol, it is rich in antioxidants and bioactive compounds. Kadaknath meat supports heart health, diabetes management, and muscle recovery. Eggs are traditionally known to enhance stamina, immunity, and overall vitality.
   - Tags: 🧬 Very High Protein | 🔥 Very Low Fat | ❤️ Low Cholesterol | 🛡️ Antioxidant-Rich
   - Special badge: ⭐ Premium Superfood

4. **Gramapriya Chicken**
   - Banner BG: gradient from `#e8a050` to `#c47b3a`, emoji 🥚
   - Description: Gramapriya chicken is widely preferred for its superior egg quality. The eggs are rich in high-biological-value protein, calcium, and essential vitamins that promote bone strength, brain function, and immunity. Meat quality is wholesome and suitable for natural, free-range consumption.
   - Tags: 🥚 High-Protein Eggs | 🦴 Bone Health | 🧠 Brain Nutrition | 🛡️ Immunity Support

5. **Brahma Chicken**
   - Banner BG: gradient from `#6b5a3a` to `#3d2e1a`, emoji 🐦
   - Description: Brahma chicken produces flavorful, nutrient-dense meat with a robust protein profile that supports muscle development and long-lasting energy. Eggs provide essential nutrients that complement a natural, protein-focused diet. Ideal for those seeking traditional, hearty nutrition.
   - Tags: 💪 Muscle-Building Protein | ⚡ Sustained Energy | ❤️ Balanced Nutrition

6. **Frizzle Feather Chicken**
   - Banner BG: gradient from `#a0c878` to `#5a8040`, emoji 🌿
   - Description: While primarily ornamental, Frizzle feather chickens provide meat and eggs comparable to traditional country chickens. Their naturally raised meat is protein-rich and free from intensive farming stress, making it suitable for clean, home-grown nutrition.
   - Tags: 🧬 Natural Protein | 🌿 Clean Nutrition | 🥚 Essential Nutrients

7. **Kaveri Chicken**
   - Banner BG: gradient from `#7a9e6d` to `#3d6030`, emoji 🏡
   - Description: Kaveri chicken is an improved backyard variety offering lean meat and nutritious eggs. The meat supports healthy weight management, while the eggs are rich in proteins, minerals, and vitamins that strengthen immunity and bone health. Well-suited for sustainable and organic lifestyles.
   - Tags: 🔥 Lean Meat | 🛡️ Immunity Boost | 🦴 Bone Strength | 🥚 High Nutrition Eggs

8. **Aseel Peruvudai Chicken**
   - Banner BG: gradient from `#8b4513` to `#5c2d0a`, emoji ⚔️
   - Description: Aseel Peruvudai chicken is a powerful indigenous breed valued for its firm, flavorful meat. Traditionally consumed to improve strength, endurance, and recovery, the meat is high in protein and dense nutrition. Though egg production is limited, the eggs are considered nutrient-rich and restorative.
   - Tags: 💪 High Protein | ⚡ Strength & Endurance | 🧬 Dense Nutrition

---

**Rabbit Breeds Tab** (same grid style):

Top banner info box (light green bg, rounded): *"Rabbit meat is a clinically recognized lean protein — valued for its low fat, low cholesterol, and high nutritional density."*

7 Rabbit breed cards (similar card style, banner gradient from purple-gray tones):

1. **Californian Rabbit** — Lean, therapeutic-quality meat with excellent protein absorption. Ideal for heart-conscious diets and recovery nutrition. Tags: 🥩 High Protein | 🫀 Low Cholesterol | 🔥 Low Fat | 💪 Muscle Support

2. **Grey Giant Rabbit** — Produces a high volume of nutrient-rich meat packed with essential amino acids. Supports muscle development and long-term vitality. Tags: 🥩 High Protein | ⚡ Energy Support | 💪 Muscle Growth | 🦴 Strength

3. **New Zealand White Rabbit** — Considered the gold standard of healthy rabbit meat worldwide. Extremely low in fat and calories, making it ideal for weight control and clinical diets. Tags: 🥩 Premium Protein | 🔥 Very Low Fat | 🫀 Heart Health | ⚖️ Weight Management. Badge: ⭐ Gold Standard

4. **Black Giant Rabbit** — Dense, high-yield meat with valuable minerals. Supports active lifestyles and sustained physical performance. Tags: 🥩 Protein-Rich | ⚡ Energy Boost | 🦴 Mineral Support | 💪 Strength

5. **Soviet Chinchilla Rabbit** — Tender, iron-rich meat known for supporting blood health and immunity. Suitable for balanced nutrition and recovery diets. Tags: 🥩 High Protein | 🛡️ Immunity Support | 🩸 Iron-Rich | 🫀 Circulation Health

6. **New Zealand Black Rabbit** — Lean, clean meat with excellent digestibility. Ideal for families, athletes, and wellness-focused consumers. Tags: 🥩 Lean Protein | 🔥 Low Fat | 🫀 Heart-Friendly | 👨‍👩‍👧 Family Nutrition

7. **Dutch Rabbit** — Produces light, easily digestible meat in smaller portions. Suitable for gentle diets and health-sensitive individuals. Tags: 🥩 Light Protein | 🍽️ Easy Digestion | 🔥 Low Fat | 🌿 Clean Nutrition

---

## SECTION 5 — DESI EGGS (ANIMATED STATS)

Background: `#e8f0e4` (light green). 

Left column:
- Section label: "FARM-FRESH DESI EGGS"
- Title: "The Power of Country Chicken Eggs" (Playfair Display)
- Intro: *"Our desi (country chicken) eggs are laid by free-range native breeds living in open spaces — making them vastly superior in nutrition to commercial cage-reared eggs."*
- 8 benefit list items (gold ✦ bullet):
  1. **Higher Omega-3 Fatty Acids** — Free-range hens produce eggs with 2–3× more omega-3s, supporting heart and brain health.
  2. **Rich in Vitamin D & A** — Outdoor sunlight exposure naturally elevates fat-soluble vitamins essential for bone strength and immunity.
  3. **More Antioxidants** — Desi eggs contain significantly higher levels of Vitamin E and beta-carotene (the deep orange yolk is a sign).
  4. **Higher Protein Quality** — Native breed eggs have a superior amino acid profile for muscle repair and daily energy.
  5. **Better for Gut Health** — Natural diet of insects, grains, and greens produces eggs that are easier to digest.
  6. **No Hormones or Antibiotics** — 100% chemical-free, raised on clean feed without any synthetic additives.
  7. **Supports Immunity** — Rich in selenium, zinc, and B-complex vitamins that strengthen your immune system naturally.
  8. **Better for Children** — Nutrient density supports growing bodies, especially brain development and bone formation.

Right column:
- **Animated comparison card** (white bg, rounded): Desi Egg vs Commercial Egg — two columns split by a thin line. Left: "✦ Our Desi Eggs" (green) with traits. Right: "Commercial Eggs ✗" (gray) with contrasting traits.
- **4 animated stat counters** (count up when scrolled into view using IntersectionObserver + JS counter animation):
  - `3×` — More Omega-3
  - `2×` — More Vitamin E
  - `0` — Antibiotics
  - `100%` — Free Range
  Stats use Playfair Display 2.5rem for numbers, gold left-border on each card.

---

## SECTION 6 — GOAT BREEDS

Background: white.

Section label + title: "OUR GOAT BREEDS — Premium Goat Breeds, Born for Goa"

Two equal feature cards side by side (on mobile: stacked):

**Card 1 — Osmanabadi Goat**
- Top: thin gold gradient bar (4px)
- Goat emoji 🐐 (3rem)
- Title: "Osmanabadi Goat" (Playfair Display, 1.5rem)
- Subtitle badge: "PREMIUM MEAT BREED" (gold uppercase)
- Description: *The Osmanabadi is a hardy, indigenous breed from Maharashtra known for its high-quality meat, adaptability, and excellent disease resistance. Highly valued across western India for its rich, flavorful, and lean meat that is lower in fat compared to exotic breeds.*
- Feature list (sage green dot bullets):
  - High-protein, lean meat
  - Low fat, low cholesterol
  - Excellent disease resistance
  - Raised free-range, stress-free
  - Rich, authentic desi flavor

**Card 2 — Konkan Kanyal**
- Top: thin sage gradient bar (4px)
- Leaf emoji 🌿 (3rem)
- Title: "Konkan Kanyal" (Playfair Display, 1.5rem)
- Subtitle badge: "GOA'S NATIVE BREED" (sage green uppercase)
- Description: *The Konkan Kanyal is the primary, well-adapted goat breed in Goa — perfectly suited to the coastal climate and local terrain. Known for producing nutritious milk and quality meat, it thrives on natural grazing and requires minimal external inputs, making it ideal for organic farming.*
- Feature list:
  - Native to Goa's coastal climate
  - Nutritious, chemical-free milk
  - Naturally adapted — low maintenance
  - Supports biodiversity conservation
  - Tender, naturally flavored meat

**Below:** Goat Milk benefits banner (light green bg, rounded 16px, padding 48px). Left: large 🥛 emoji. Right: Title "The Goodness of Goat Milk", description about A2 protein, easy digestion, calcium, no chemicals. Tag pills: 🦴 Calcium-Rich | 💊 Easier to Digest | 🛡️ Immunity Building | ❤️ Heart-Healthy | 🧒 Great for Kids | 🌿 Zero Chemicals.

---

## SECTION 7 — WHY WE CHOOSE ORGANIC FARMING

Background: dark forest gradient `linear-gradient(135deg, #0d2409 0%, #1a3a14 50%, #2d5a27 100%)`.
All text: white or rgba(255,255,255,0.75).

Section label (gold) + title (white): "OUR PHILOSOPHY — Why We Choose Organic Farming"
Sub: *"This isn't industrial farming. This is real farming — done right, for you, your family, and future generations."*

6 animated cards in a 3-column grid (on mobile: 1 column). Each card:
- Background: `rgba(255,255,255,0.07)`, border `1px solid rgba(255,255,255,0.12)`, border-radius 12px
- Hover: `rgba(255,255,255,0.13)`, lift 4px
- Scroll-triggered slide-in from bottom (staggered)
- Large icon emoji (2.5rem), bold white title, gray body text

Cards:
1. 🚫 **Zero Synthetic Inputs** — No antibiotics, no growth hormones, no artificial chemicals. Every product we raise is 100% free from synthetic interventions.
2. 🌾 **Animal Welfare First** — Our animals roam freely on open land with fresh air, clean water, and natural feed. No stress, no crowding — just ethical, time-honoured care.
3. 🌍 **Local Sustainability** — We protect Goa's biodiversity and soil health by farming with nature, not against it — preserving the land for future generations.
4. 🏘️ **Community-First** — We put quality, not quantity, at the center. Our produce serves local families who deserve clean, honest food without compromise.
5. 🧬 **Native Breed Preservation** — By raising indigenous breeds like Kadaknath, Osmanabadi, and Konkan Kanyal, we protect genetic heritage and promote biodiversity.
6. 🔬 **Nutritional Superiority** — Organic, free-range produce is scientifically proven to contain higher omega-3s, vitamins, antioxidants, and minerals than conventional alternatives.

---

## SECTION 8 — ABOUT US

Background: `#faf6ef` (cream).

Two-column layout (on mobile: stacked, image first):

**Left — text:**
- Section label: "OUR STORY"
- Title: "Pure. Honest. Always Fresh." in Playfair Display
- Gold divider
- Three paragraphs of the about text:

> At Alliance Street Organic Farms, we are dedicated to producing premium-quality desi chicken, goat meat, farm-fresh desi eggs, and nutritious goat milk using ethical, eco-conscious farming practices in Goa. Our mission is simple: to provide clean, organic food that supports better health, stronger immunity, and sustainable living for our community.

> We specialize in raising native breeds of goats and chickens, carefully selected for Goa's climate and reared without the use of antibiotics, growth hormones, or artificial chemicals. Every animal is raised on clean feed, open grazing, and natural care — no stress, just ethical, time-honored farming.

> Our products aren't just food — they're part of a healthier lifestyle. Whether it's our high-protein goat meat, vitamin-rich desi eggs, or chemical-free goat milk, each item is sourced with integrity and delivered with pride.

- **Our Mission header**, then 4 mission bullets:
  - 100% organic methods free from synthetic inputs
  - Animal welfare, fresh air, and space to roam
  - Local sustainability that protects biodiversity and soil health
  - A community-first approach that puts quality, not quantity, at the center

- 2×2 values grid (light green cards): `🌿 100% Organic Methods` | `🐾 Animal Welfare` | `🌍 Local Sustainability` | `🏘️ Community First`

**Right — visual:**
- Large decorative box (border-radius 20px): dark green + earth gradient background with 🌾 emoji centered (font-size 7rem). Height ~460px.
- Floating badge (bottom-right, overlapping, gold bg): "Rooted in Organic" bold + "RAISED WITH CARE" small caps
- CSS animation on the emoji: gentle float up-down (`@keyframes float` — translateY ±8px, 4s ease-in-out infinite)

---

## SECTION 9 — OUR TEAM

Background: `#5c3d1e` (rich earth brown). All text white.

Section label (gold) + Title: "OUR TEAM"
Subtitle: *"Raised on Friendship, Built on Farming. Our mission is rooted in sustainable practices, native livestock, and full transparency. No hormones. No shortcuts. Just clean farming that respects both animals and the land."*

Two team member cards centered with `display: flex; justify-content: center; gap: 80px; flex-wrap: wrap;` with `margin-top: 60px`:

**Card 1 — Shaukin**
- Circle avatar (140px × 140px): gradient background `linear-gradient(135deg, #2d5a27, #7a9e6d)`, gold border (4px), 🧑‍🌾 emoji (3.5rem)
- CSS animation on avatar: subtle `scale(1)` to `scale(1.04)` pulse, 3s ease-in-out infinite
- Name: "Shaukin" in Playfair Display white 1.4rem
- Role: "PARTNER" gold uppercase letter-spacing 3px
- Quote (italic, rgba white 0.65): *"Good food begins with good farming. We're here to bring that promise to every family in Goa."*

**Card 2 — Stallone Shaikh**
- Same style avatar but: `linear-gradient(135deg, #7a9e6d, #c8962a)`, animation delay 1.5s
- 👨‍🌾 emoji
- Name: "Stallone Shaikh"
- Role: "PARTNER"
- Quote: *"We didn't build a business. We built a farm that we'd be proud to feed our own children from."*

---

## SECTION 10 — CONTACT CTA STRIP

Background: `linear-gradient(135deg, #c8962a, #8a6010)` (gold gradient).

Centered text:
- `<h2>` (white, Playfair Display): "Ready for Real Farm-Fresh Food?"
- `<p>` (white 0.85): "Order directly from Alliance Street Organic Farms — Goa's most trusted source for organic desi chicken, eggs, goat meat, and more."
- Button: white background, earth text, padding 14px 40px, border-radius 4px, `📞 Contact Us to Order`
- Below: "📍 Goa, India" and "🌿 100% Organic Certified" in smaller italic white text, side by side

---

## SECTION 11 — FOOTER

Background: `#0f0a04` (near black). Padding 48px.

Center-aligned:
- Logo: "Alliance Street Organic Farms" in Playfair Display gold 1.4rem
- Tagline: "Pure · Honest · Always Fresh · Goa" in white 0.7rem letter-spacing 3px uppercase
- Nav links row: Animals | Eggs | Goats | Rabbits | Why Organic | About | Team — all muted white, hover gold
- Social row (optional placeholder): Instagram · Facebook · WhatsApp (just text links, no real URLs)
- Copyright: "© 2026 Alliance Street Organic Farms, Goa, India. All rights reserved." muted gray

---

## ANIMATIONS TO IMPLEMENT

### CSS Keyframes (define in `<style>`):

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes floatAnim {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

@keyframes pulseSoft {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}

@keyframes particleDrift {
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-100vh) translateX(30px); opacity: 0; }
}

@keyframes cloudDrift {
  from { transform: translateX(-80px); }
  to { transform: translateX(110vw); }
}

@keyframes grassSway {
  0%, 100% { transform: rotate(-6deg); transform-origin: bottom center; }
  50% { transform: rotate(6deg); transform-origin: bottom center; }
}

@keyframes peck {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(14px) rotate(15deg); }
}

@keyframes goatTailWag {
  0%, 100% { transform: rotate(-15deg); transform-origin: top left; }
  50% { transform: rotate(15deg); transform-origin: top left; }
}

@keyframes earWiggle {
  0%, 100% { transform: rotate(0deg); transform-origin: bottom center; }
  50% { transform: rotate(-8deg); transform-origin: bottom center; }
}

@keyframes bunnyNose {
  0%, 100% { transform: scaleX(1); }
  50% { transform: scaleX(0.7); }
}

@keyframes butterflyWing {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.2); }
}

@keyframes butterflyFly {
  0% { transform: translate(-60px, 280px); opacity: 0; }
  5% { opacity: 1; }
  95% { opacity: 1; }
  100% { transform: translate(520px, 80px); opacity: 0; }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; r: 1; }
  50% { opacity: 0.9; r: 2; }
}

@keyframes hopChick {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(8px, -8px); }
  75% { transform: translate(-8px, -8px); }
}

@keyframes shimmerGold {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
```

### JavaScript:

1. **Scroll reveal** — Use `IntersectionObserver`. Add `.reveal` class to all section children. When they enter viewport, add `.revealed` class (opacity: 1, transform: none, transition: 0.7s ease). Stagger delays using `data-delay` attribute.

2. **Counter animation** — When `.egg-stat` enters viewport, animate number from 0 to target using `requestAnimationFrame`. Numbers: 3, 2, 0, 100.

3. **Hero parallax** — `window.addEventListener('scroll', () => { heroRight.style.transform = 'translateY(' + scrollY * 0.3 + 'px)'; })` — gentle only.

4. **Tabs** — Click `.tab-btn` to show/hide `.tab-content` with smooth `opacity` and `transform` transition (slide + fade).

5. **Mobile hamburger** — Click burger: toggle full-height dropdown nav. Click outside or same button: close.

6. **Smooth scroll** — All nav `<a href="#...">` links use `scroll-behavior: smooth` (CSS) or JS `scrollIntoView({ behavior: 'smooth' })`.

7. **Floating particles** (hero bg): Generate 25 `<div>` particles with JS, position randomly, animate with CSS classes. Each gets a random duration (15s–30s), delay, and x-position.

---

## RESPONSIVE BREAKPOINTS

```css
/* Mobile: < 768px */
@media (max-width: 768px) {
  /* Hero: stack vertically, text full width, animals scene below */
  /* Products: 2-column grid */
  /* Breed grid: 1 column */
  /* Goat cards: stacked */
  /* About: stacked, image first */
  /* Team: stacked */
  /* Nav: hamburger */
}

/* Tablet: 768px–1024px */
@media (max-width: 1024px) {
  /* Products: 3 columns */
  /* Breed grid: 2 columns */
  /* About: stacked */
}
```

---

## PERFORMANCE & QUALITY NOTES

- All images replaced by emoji + CSS gradients (no external image requests)
- Use `will-change: transform` only on animated elements (hero scene animals, floating particles)
- Add `loading="lazy"` mindset: don't animate offscreen elements
- Smooth 60fps animations: only animate `transform` and `opacity` (never width/height/top/left)
- `prefers-reduced-motion` media query: wrap all non-essential animations in `@media (prefers-reduced-motion: no-preference)`
- Google Fonts: load with `display=swap`

---

## FINAL CHECKLIST BEFORE SUBMITTING

- [ ] All 11 sections present and complete
- [ ] Hero animated animals SVG scene works (goat, chicken, rabbit, chick, butterflies, grass, clouds, stars)
- [ ] Particle background animates in hero
- [ ] All chicken breeds (8) present with descriptions and tags
- [ ] All rabbit breeds (7) present with descriptions and tags
- [ ] Desi egg stats counter animates on scroll
- [ ] Goat section: both breeds (Osmanabadi + Konkan Kanyal) with features
- [ ] Why Organic: all 6 cards
- [ ] About Us: full story text + mission points
- [ ] Team: Shaukin + Stallone Shaikh
- [ ] All scroll reveal animations working
- [ ] Tabs (Chicken / Rabbit) working with smooth transition
- [ ] Mobile responsive — hamburger menu works
- [ ] Smooth scrolling on nav links
- [ ] No broken layouts on mobile, tablet, desktop
- [ ] Footer complete

---

*End of prompt. Build the complete `index.html` file.*
