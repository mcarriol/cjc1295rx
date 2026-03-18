/*
   CJC-1295Rx — Landing Page
   Design system: Aurelius Health Group
   ─────────────────────────────────────────────────────
   Typography System (DM Sans — geometric sans-serif):
   H1 / Hero:   weight 300, tight tracking -0.03em, generous leading
   H2:          weight 300, tracking -0.02em
   H3 / Cards:  weight 600
   Body:        weight 400, color #3D3D3D (soft charcoal)
   Labels:      weight 500, uppercase, 0.1em tracking, gold
   ─────────────────────────────────────────────────────
*/
import { useState } from "react";
import Navbar from "@/components/Navbar";

const DARK_ORANGE = "#D2570A";
const GOLD = "#C9A96E";
const DM = "'DM Sans', system-ui, sans-serif";

const IMGS = {
  hero:  "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1800&q=80",  // athletic male physique / peak performance
  cells: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1800&q=80",  // gym training / weights
  labs:  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=1200&q=80",  // physician portrait
  heal:  "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1200&q=80",  // sleep / recovery (GH secreted during sleep)
};

const s = {
  label:  { fontFamily: DM, fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: GOLD },
  h1:     { fontFamily: DM, fontWeight: 300, fontSize: "clamp(2.4rem,6vw,5rem)", lineHeight: 1.08, letterSpacing: "-0.03em", color: "#F5F0E8" },
  h2dk:   { fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.6rem,3.5vw,2.75rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#F5F0E8" },
  h2lt:   { fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.6rem,3.5vw,2.75rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#1A1A1A" },
  h3dk:   { fontFamily: DM, fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#F5F0E8" },
  h3lt:   { fontFamily: DM, fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#1A1A1A" },
  body:   { fontFamily: DM, fontWeight: 400, fontSize: "1rem", lineHeight: 1.65, color: "#3D3D3D" },
  bodySm: { fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.6, color: "#5A5A5A" },
  bodyLt: { fontFamily: DM, fontWeight: 300, fontSize: "0.9375rem", lineHeight: 1.65, color: "rgba(245,240,232,0.62)" },
  cite:   { fontFamily: DM, fontWeight: 400, fontSize: "0.72rem", lineHeight: 1.5, color: "#8C7B6B", fontStyle: "italic" },
};

/* ── Problem cards ── */
const problems = [
  {
    icon: "◈",
    title: "Age-Related GH Decline",
    profile: "GH secretion drops ~14% per decade after age 30. By 50, most adults have lost 50–70% of peak GH output — resulting in reduced lean mass, increased visceral fat, poor recovery, and disrupted sleep architecture.",
    mechanism: "CJC-1295 restores pulsatile GH release by acting directly on the pituitary — the most physiologically accurate approach to GH optimization. Unlike exogenous HGH, it works with the body's own feedback loops rather than replacing them.",
    testimonial: "\"I'm 44 and my IGF-1 was at the low end of range. Six weeks on CJC-1295Rx and my numbers moved significantly — and more importantly, my recovery and body composition shifted in ways I hadn't seen in years.\" — J.M., 44, male",
  },
  {
    icon: "⊕",
    title: "Exogenous HGH Side Effects",
    profile: "Full HGH therapy suppresses the natural GH axis, causes insulin resistance, carries acromegaly risk at supraphysiological doses, and costs $800–$2,000/month. Many patients want GH optimization without surrendering their body's own regulatory architecture.",
    mechanism: "CJC-1295 preserves the feedback loop — your pituitary still senses circulating GH and IGF-1, and the axis self-regulates. This means you get clinically meaningful GH elevation within physiological ranges at a fraction of the cost of exogenous HGH.",
    testimonial: "\"I tried full HGH for 8 months. The joint pain and water retention were significant. CJC-1295Rx gave me the body composition benefits without any of those issues. My physician monitored IGF-1 monthly.\" — R.T., 51, male",
  },
  {
    icon: "◷",
    title: "Recovery & Body Composition Plateau",
    profile: "Training harder produces diminishing returns when GH is suboptimal. Even athletes with good training protocols hit a ceiling when the hormonal environment for muscle protein synthesis and fat mobilization is insufficient.",
    mechanism: "CJC-1295 restores the hormonal environment for genuine muscle protein synthesis, fat mobilization, and tissue repair that age-related GH decline has taken away. GH is secreted primarily during slow-wave sleep — restoring pulsatile secretion improves both body composition and sleep quality simultaneously.",
    testimonial: "\"Training four days a week, eating clean, and nothing was moving. Eight weeks after starting CJC-1295Rx I had dropped 9 lbs of fat and added visible lean mass. My sleep went from 6 to 7.5 hours of actual quality rest.\" — A.K., 38, female",
  },
];

/* ── Clinical pathways ── */
const pathways = [
  {
    n: "01", title: "GHRH Receptor Binding & Pulsatile GH Release",
    body: "CJC-1295 binds the growth hormone-releasing hormone (GHRH) receptor on somatotroph cells in the anterior pituitary, triggering GH secretion in natural pulses. Unlike exogenous HGH — which floods the system with a single supraphysiological dose — CJC-1295 stimulates the pituitary's own GH manufacturing apparatus, preserving the pulsatile pattern that the body's receptors are optimized for.",
    cite: "Teichman SL et al. J Clin Endocrinol Metab. 2006;91(3):799-805.",
    tags: ["GHRH receptor", "Pulsatile GH", "Somatotroph"],
  },
  {
    n: "02", title: "Sustained IGF-1 Elevation (CJC-1295 DAC)",
    body: "The Drug Affinity Complex (DAC) technology in CJC-1295 with DAC allows the peptide to bind serum albumin, extending its half-life from ~30 minutes to approximately 8 days. This produces sustained elevation of both GH and IGF-1 over the dosing interval — confirmed in human studies showing IGF-1 increases of 2–10× baseline maintained over 28 days with a clean safety profile.",
    cite: "Ionescu M, Frohman LA. J Clin Endocrinol Metab. 2006;91(12):4792-4797.",
    tags: ["IGF-1", "DAC formulation", "Sustained elevation"],
  },
  {
    n: "03", title: "Body Composition & Lean Mass",
    body: "IGF-1 is the primary downstream effector of GH for body composition, driving muscle protein synthesis, satellite cell activation, and lipolysis in adipose tissue. Clinical studies of GHRH analogues demonstrate significant improvements in lean body mass and reductions in visceral and subcutaneous fat — effects that are amplified when CJC-1295 is combined with Ipamorelin for synergistic GH pulsation.",
    cite: "Svensson J et al. J Clin Endocrinol Metab. 2003;88(11):5219-5226.",
    tags: ["Lean mass", "Fat loss", "Body recomposition"],
  },
  {
    n: "04", title: "GH Axis Preservation (No Desensitisation)",
    body: "One of the most critical advantages of CJC-1295 over exogenous HGH is axis preservation. GHRH receptor signaling maintains the somatostatin feedback loop — GH pulses trigger somatostatin release, which resets the pituitary for the next pulse. This physiological rhythm is maintained throughout CJC-1295 therapy, meaning the body does not downregulate its own GH axis as it does under exogenous HGH administration.",
    cite: "Vance ML et al. J Clin Endocrinol Metab. 1997;82(11):3498-3502.",
    tags: ["GH axis", "No desensitisation", "Physiological GH"],
  },
  {
    n: "05", title: "Sleep Quality & Slow-Wave GH Secretion",
    body: "The largest natural GH pulse occurs during slow-wave sleep (SWS), approximately 60–90 minutes after sleep onset. CJC-1295 amplifies this nocturnal GH surge, which is why pre-sleep administration is the standard protocol recommendation. Improved GH pulsatility during SWS directly correlates with enhanced deep sleep quality, tissue repair, and memory consolidation — benefits that extend far beyond body composition.",
    cite: "Van Cauter E et al. JAMA. 2000;284(7):861-868.",
    tags: ["Sleep quality", "Slow-wave sleep", "Nocturnal GH"],
  },
  {
    n: "06", title: "Bone Density & Connective Tissue Repair",
    body: "GH and IGF-1 are essential regulators of bone mineral density and collagen synthesis. GH-deficient adults demonstrate significantly elevated fracture risk and connective tissue degeneration. GHRH-axis activation via CJC-1295 restores the anabolic hormonal environment required for osteoblast activity, collagen remodeling, and joint integrity — effects relevant to both athletic populations and older adults with age-related bone loss.",
    cite: "Rosen T, Bengtsson BA. Lancet. 1990;336(8710):285-288.",
    tags: ["Bone density", "Connective tissue", "Collagen synthesis"],
  },
];

/* ── Condition tag cloud ── */
const conditionTags = [
  "GH Deficiency", "Body Recomposition", "Muscle Growth", "Fat Loss",
  "Recovery", "Anti-Aging", "Sleep Quality", "Bone Density",
  "Athletic Performance", "HGH Alternative", "IGF-1 Optimization",
  "Metabolic Health", "Post-40 Vitality", "Injury Recovery",
];

/* ── FAQ ── */
const faqs = [
  {
    q: "What is CJC-1295 and how does it differ from HGH injections?",
    a: "CJC-1295 is a synthetic analogue of growth hormone-releasing hormone (GHRH) — a 29-amino acid peptide that binds GHRH receptors on the anterior pituitary and stimulates the gland to produce and release growth hormone in natural pulses. Unlike exogenous HGH injections, which bypass the pituitary entirely and deliver GH directly into the bloodstream at supraphysiological concentrations, CJC-1295 works upstream — stimulating your own pituitary to produce GH. This preserves the physiological feedback loop (GH → IGF-1 → somatostatin feedback), maintains axis integrity, avoids the risks of axis suppression and insulin resistance associated with long-term exogenous HGH, and produces GH in the pulsatile pattern that the body's receptors are optimized to respond to.",
  },
  {
    q: "What is the difference between CJC-1295 with DAC and without DAC?",
    a: "CJC-1295 without DAC (also called Modified GRF 1-29) has a half-life of approximately 30 minutes and produces a strong, short GH pulse — mimicking a natural GHRH burst from the hypothalamus. It is typically injected 2–3 times daily or pre-sleep for maximum nocturnal GH pulse amplification, and is almost always combined with a GHRP like Ipamorelin. CJC-1295 with DAC incorporates a Drug Affinity Complex — a chemical modification that allows the peptide to bind serum albumin, extending its half-life to approximately 8 days. This produces more sustained, tonic GH and IGF-1 elevation over the dosing interval (typically once or twice weekly). The clinical evidence base for sustained IGF-1 elevation is stronger for the DAC formulation. Aurelius physicians select the appropriate formulation based on patient goals, IGF-1 baseline, and tolerance profile.",
  },
  {
    q: "Why is CJC-1295 often combined with Ipamorelin?",
    a: "CJC-1295 and Ipamorelin work through complementary but distinct mechanisms that produce synergistic GH release when combined. CJC-1295 acts via the GHRH receptor — it 'opens the window' for GH secretion by activating somatotroph cells. Ipamorelin acts via the ghrelin receptor (GHS-R) — it 'amplifies the pulse' by triggering a separate intracellular cascade that multiplicatively increases GH output. Research demonstrates that GHRH + GHRP combinations produce GH pulses 2–5× greater than either compound alone. Ipamorelin is preferred as the GHRP partner because it does not elevate cortisol or ACTH (unlike older GHRPs like GHRP-6), making the combination clean and well-tolerated. The CJC-1295 + Ipamorelin stack is the most widely used GH optimization protocol in the compounded peptide space.",
  },
  {
    q: "How is CJC-1295 administered and what is the dosing protocol?",
    a: "CJC-1295 is administered via subcutaneous injection — a small-gauge needle (insulin syringe) into subcutaneous fat on the abdomen, thigh, or lateral arm. The peptide arrives lyophilized (freeze-dried powder) and is reconstituted with bacteriostatic water. Reconstituted vials are stored refrigerated and used within 28–30 days. For CJC-1295 without DAC: typical doses range from 100–300 mcg per injection, 2–3× daily (often morning, post-workout, and pre-sleep), combined with Ipamorelin at the same schedule. For CJC-1295 with DAC: typical doses range from 1–2 mg per injection, 1–2× weekly, with or without an Ipamorelin combination protocol. Pre-sleep administration is consistently preferred to amplify the natural nocturnal GH pulse. Aurelius physicians determine formulation and dosing based on IGF-1 baseline, age, body composition goals, and patient response.",
  },
  {
    q: "How long until I see results in body composition and recovery?",
    a: "IGF-1 levels typically begin rising within the first 1–2 weeks and reach a new steady state at 4–6 weeks of consistent protocol administration. Body composition changes — reduction in visceral fat, improvements in lean mass — are typically measurable at 8–12 weeks, with the most significant changes occurring over 3–6 months of sustained elevation. Sleep quality improvements are often reported within the first 2–4 weeks, as nocturnal GH pulse amplification begins immediately. Recovery from training is the second-earliest noticeable effect, typically at 3–6 weeks. Full body composition optimization typically requires 4–6 months of physician-monitored protocol. All patients receive monthly IGF-1 monitoring to confirm dose adequacy and adjust protocol as needed.",
  },
  {
    q: "Is CJC-1295 legal to prescribe in the United States?",
    a: "CJC-1295 is prescribed as a compounded peptide in the United States at the clinical discretion of a licensed physician. It is not FDA-approved as a finished drug product but is compounded by DEA-licensed pharmacies under USP Chapter 795/797 standards. Off-label prescribing of compounded peptides is legal when a licensed physician documents clinical rationale, obtains informed consent, and dispenses through a licensed compounding pharmacy. Aurelius physicians follow a standardized screening and documentation protocol for every patient — including baseline IGF-1 measurement, contraindication screening, and ongoing monthly monitoring. Note: in November 2023, FDA moved several peptides including CJC-1295 to Category 2 of the 503A bulk drug substances list, creating regulatory uncertainty; Aurelius monitors regulatory status and will advise patients of any changes affecting protocol availability.",
  },
];

/* ── Eligibility Quiz ── */
function EligibilityQuiz() {
  const questions = [
    {
      q: "Do you have active cancer, a history of hormone-sensitive malignancy, or active pituitary disease?",
      disqualifier: "YES",
      note: "Active malignancy, hormone-sensitive cancer history, or pituitary pathology are contraindications to CJC-1295 therapy. A physician evaluation is required before proceeding.",
    },
    {
      q: "Are you currently pregnant, breastfeeding, or planning pregnancy in the next 6 months?",
      disqualifier: "YES",
      note: "CJC-1295 has not been studied in pregnancy or lactation. Safety data is insufficient for use during these periods.",
    },
    {
      q: "Do you have uncontrolled diabetes or untreated insulin resistance?",
      disqualifier: "YES",
      note: "GH elevation can affect insulin sensitivity. Uncontrolled diabetes requires physician clearance and metabolic stabilization before CJC-1295 initiation.",
    },
    {
      q: "Are you currently using exogenous HGH without physician oversight?",
      disqualifier: "YES",
      note: "Concurrent unsupervised exogenous HGH use requires coordination and washout planning before initiating a CJC-1295 protocol. Physician review is required.",
    },
    {
      q: "Do you experience any of the following: reduced muscle mass, increased body fat, slow recovery, poor sleep quality, reduced energy, or other signs of GH decline?",
      disqualifier: "NO",
      note: "These are the primary indications for the CJC-1295Rx protocol. If you are not experiencing any of these, you may not be an appropriate candidate.",
    },
  ];

  const [answers, setAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const isDisqualified = questions.some((q, i) => answers[i] === q.disqualifier);
  const allAnswered = answers.every((a) => a !== null);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {questions.map((item, i) => (
        <div key={i} style={{ borderTop: "1px solid rgba(245,240,232,0.08)", padding: "28px 0" }}>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "1rem", color: "#F5F0E8", marginBottom: 16, lineHeight: 1.5 }}>
            <span style={{ color: GOLD, fontWeight: 500, marginRight: 10 }}>{String(i + 1).padStart(2, "0")}</span>
            {item.q}
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            {["YES", "NO"].map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  const next = [...answers];
                  next[i] = opt;
                  setAnswers(next);
                  setSubmitted(false);
                }}
                style={{
                  fontFamily: DM, fontWeight: 500, fontSize: "0.8125rem", letterSpacing: "0.06em",
                  padding: "10px 28px", borderRadius: 5, cursor: "pointer", transition: "all 0.2s",
                  background: answers[i] === opt ? GOLD : "transparent",
                  color: answers[i] === opt ? "#0D0D0D" : "rgba(245,240,232,0.5)",
                  border: `1.5px solid ${answers[i] === opt ? GOLD : "rgba(245,240,232,0.15)"}`,
                }}
              >{opt}</button>
            ))}
          </div>
          {answers[i] === item.disqualifier && (
            <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "rgba(201,169,110,0.7)", marginTop: 10, lineHeight: 1.5 }}>
              ⚠ {item.note}
            </p>
          )}
        </div>
      ))}
      {allAnswered && !submitted && (
        <div style={{ paddingTop: 24 }}>
          <button onClick={() => setSubmitted(true)} className="btn-gold">View My Results</button>
        </div>
      )}
      {submitted && (
        <div style={{ marginTop: 32, padding: "32px 36px", borderRadius: 10, border: `1px solid ${isDisqualified ? "rgba(201,169,110,0.25)" : "rgba(201,169,110,0.35)"}`, background: isDisqualified ? "rgba(201,169,110,0.04)" : "rgba(201,169,110,0.07)" }}>
          {isDisqualified ? (
            <>
              <p style={{ ...s.label, marginBottom: 12, color: GOLD }}>Physician Review Recommended</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>One or more responses require physician evaluation before protocol initiation.</h3>
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>One or more of your answers indicates a condition that may require modification or deferral of the standard CJC-1295 protocol. Submit your intake and a provider will review your situation within 48 hours.</p>
              <a href="mailto:intake@aureliushealthgroup.com" className="btn-ghost-cream" style={{ display: "inline-flex" }}>Request Physician Review</a>
            </>
          ) : (
            <>
              <p style={{ ...s.label, marginBottom: 12 }}>Eligible — No Contraindications Identified</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>Based on your responses, you appear to be a candidate for the CJC-1295Rx protocol.</h3>
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>No contraindications were identified. The next step is completing a comprehensive intake form and baseline IGF-1 assessment. A board-certified physician will review your results within 48 hours.</p>
              <a href="mailto:intake@aureliushealthgroup.com" className="btn-gold" style={{ display: "inline-flex" }}>Start My Intake</a>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ── FAQ accordion ── */
function FaqItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: "1px solid rgba(245,240,232,0.08)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "1rem", color: "#F5F0E8", lineHeight: 1.4, paddingRight: 24 }}>{item.q}</span>
        <span style={{ color: GOLD, fontSize: "1.25rem", flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom: 24 }}>
          <p style={{ ...s.bodyLt, margin: 0 }}>{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function CJC1295Rx() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh" }}>
      <Navbar productName="CJC-1295Rx" />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="CJC-1295Rx hero" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.45) 50%, rgba(13,13,13,0.2) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, width: "100%", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem) clamp(60px,10vw,100px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <a href="https://aureliushealthgroup.com" style={{ ...s.label, color: "rgba(201,169,110,0.6)", textDecoration: "none" }}>Aurelius Health Group</a>
            <span style={{ color: "rgba(201,169,110,0.4)", fontSize: "0.7rem" }}>›</span>
            <span style={{ ...s.label }}>CJC-1295<span style={{ color: DARK_ORANGE }}>Rx</span></span>
          </div>
          <h1 style={{ ...s.h1, maxWidth: 760, marginBottom: 24 }}>
            More growth hormone.<br />Less intervention.<br />CJC-1295 works with your biology.
          </h1>
          <p style={{ ...s.bodyLt, maxWidth: 520, marginBottom: 16, fontSize: "1.0625rem" }}>
            CJC-1295 stimulates your pituitary to release growth hormone in natural pulses — amplifying performance, recovery, and body composition without the risks of exogenous HGH.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {["Physician-supervised", "Pharma-grade compounded", "Subcutaneous delivery"].map((t) => (
              <span key={t} style={{ ...s.label, color: "rgba(201,169,110,0.55)", border: "1px solid rgba(201,169,110,0.2)", padding: "5px 12px", borderRadius: 3 }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#quiz" className="btn-gold">Check My Eligibility</a>
            <a href="#research" className="btn-ghost-cream">Review the Research</a>
          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section style={{ background: "#111", borderTop: "1px solid rgba(201,169,110,0.12)", borderBottom: "1px solid rgba(201,169,110,0.12)", padding: "clamp(28px,4vw,40px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <div className="stats-strip" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {[
              { stat: "29 AA", label: "GHRH analogue peptide" },
              { stat: "8 days", label: "Half-life with DAC formulation" },
              { stat: "2–10×", label: "IGF-1 increase vs baseline" },
              { stat: "$219/mo", label: "All-inclusive protocol" },
            ].map((item) => (
              <div key={item.stat} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.5rem,3vw,2.25rem)", letterSpacing: "-0.03em", color: "#F5F0E8", marginBottom: 4 }}>{item.stat}</p>
                <p style={{ ...s.label, color: "rgba(201,169,110,0.55)" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THE PROBLEM ══ */}
      <section id="problem" style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Problem</p>
          <div className="problem-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {problems.map((p) => (
              <div key={p.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(245,240,232,0.06)", borderRadius: 10, padding: "clamp(24px,3vw,36px)" }}>
                <span style={{ fontSize: "1.5rem", color: GOLD, display: "block", marginBottom: 16 }}>{p.icon}</span>
                <h3 style={{ ...s.h3dk, marginBottom: 16 }}>{p.title}</h3>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ ...s.label, marginBottom: 8 }}>Who It Affects</p>
                  <p style={{ ...s.bodyLt, fontSize: "0.875rem" }}>{p.profile}</p>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ ...s.label, marginBottom: 8 }}>CJC-1295 Solution</p>
                  <p style={{ ...s.bodyLt, fontSize: "0.875rem" }}>{p.mechanism}</p>
                </div>
                <p style={{ ...s.cite }}>{p.testimonial}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THE MECHANISM ══ */}
      <section id="mechanism" style={{ background: "#111", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Mechanism</p>
          <div className="two-col-mech" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 64 }}>
            <div>
              <h2 style={{ ...s.h2dk, marginBottom: 24 }}>How CJC-1295 restores the GH axis — from pituitary to IGF-1 cascade</h2>
              <p style={{ ...s.bodyLt, marginBottom: 20 }}>
                CJC-1295 is a synthetic analogue of growth hormone-releasing hormone (GHRH) — the hypothalamic signal that tells the anterior pituitary to produce and release growth hormone. It binds the GHRH receptor on somatotroph cells with high affinity, triggering GH secretion in the pulsatile pattern that tissue receptors are optimized to respond to.
              </p>
              <p style={{ ...s.bodyLt, marginBottom: 32 }}>
                Unlike exogenous HGH — which replaces the body's GH supply and suppresses the natural axis — CJC-1295 works upstream, stimulating your own pituitary. The GH pulses it generates cause the liver to produce IGF-1, which drives muscle protein synthesis, fat mobilization, tissue repair, and bone remodeling. The entire cascade remains physiologically regulated.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: "Mechanism", text: "GHRH receptor binding → somatotroph activation → pulsatile GH release → hepatic IGF-1 synthesis" },
                  { label: "Structure", text: "29-amino acid synthetic GHRH analogue with DAC modification for 8-day half-life" },
                  { label: "Delivery", text: "Subcutaneous injection, 2–5× per week (non-DAC) or 1–2× per week (DAC), preferably pre-sleep" },
                  { label: "Key advantage", text: "Preserves the somatostatin feedback loop — works with the axis, not around it" },
                ].map((item) => (
                  <div key={item.label} style={{ borderLeft: "2px solid rgba(201,169,110,0.3)", paddingLeft: 20 }}>
                    <p style={{ ...s.label, marginBottom: 6 }}>{item.label}</p>
                    <p style={{ ...s.bodyLt, margin: 0, fontSize: "0.9rem" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Horizontal Flow Diagram */}
            <div>
              <p style={{ ...s.label, marginBottom: 20 }}>CJC-1295 GH Cascade</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { node: "CJC-1295 (subcutaneous)", sub: "Synthetic GHRH analogue — 29 AA peptide with DAC albumin binding", color: GOLD },
                  { node: "Binds GHRH Receptor on Pituitary", sub: "High-affinity binding to somatotroph GHRH-R in the anterior pituitary", color: "#B8956A" },
                  { node: "Somatotroph Activation", sub: "Intracellular cAMP cascade → GH manufacturing and vesicle release", color: "#A07A55" },
                  { node: "Pulsatile GH Release", sub: "Natural GH pulse — somatostatin feedback preserved — no axis suppression", color: "#8C6845" },
                  { node: "Liver: IGF-1 Synthesis", sub: "GH binds hepatic GH receptors → IGF-1 produced and released systemically", color: "#785535" },
                  { node: "Muscle Growth · Fat Loss · Recovery · Sleep", sub: "IGF-1 and GH act on muscle, adipose, bone, and CNS — full physiological cascade", color: "#64422A" },
                ].map((node, i) => (
                  <div key={node.node} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${node.color}30`, borderLeft: `3px solid ${node.color}`, borderRadius: "0 8px 8px 0", padding: "14px 20px", width: "100%" }}>
                      <p style={{ fontFamily: DM, fontWeight: 600, fontSize: "0.9375rem", color: node.color, margin: "0 0 4px" }}>{node.node}</p>
                      <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "rgba(245,240,232,0.5)", margin: 0 }}>{node.sub}</p>
                    </div>
                    {i < 5 && (
                      <div style={{ display: "flex", alignItems: "center", paddingLeft: 20, height: 24 }}>
                        <div style={{ width: 1, height: "100%", background: "rgba(201,169,110,0.25)" }} />
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" style={{ marginLeft: -5 }}>
                          <path d="M5 8L0 0h10z" fill="rgba(201,169,110,0.4)" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Before / After SVG: Blunted vs Pulsatile GH */}
          <div style={{ marginBottom: 56 }}>
            <p style={{ ...s.label, marginBottom: 20, textAlign: "center" }}>GH Secretion Profile</p>
            <div className="gh-svg-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              {/* LEFT: Blunted */}
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(245,240,232,0.06)", borderRadius: 10, padding: "28px 24px" }}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.75rem", color: "rgba(245,240,232,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>Blunted GH Secretion (Age-Related Decline)</p>
                <svg viewBox="0 0 400 180" style={{ width: "100%", height: "auto" }}>
                  {/* Axes */}
                  <line x1="40" y1="20" x2="40" y2="155" stroke="rgba(245,240,232,0.2)" strokeWidth="1"/>
                  <line x1="40" y1="155" x2="385" y2="155" stroke="rgba(245,240,232,0.2)" strokeWidth="1"/>
                  {/* Y label */}
                  <text x="12" y="90" fill="rgba(245,240,232,0.3)" fontSize="9" fontFamily="DM Sans, sans-serif" textAnchor="middle" transform="rotate(-90,12,90)">GH Level</text>
                  {/* X label */}
                  <text x="212" y="172" fill="rgba(245,240,232,0.3)" fontSize="9" fontFamily="DM Sans, sans-serif" textAnchor="middle">24 Hours</text>
                  {/* X tick labels */}
                  <text x="40" y="167" fill="rgba(245,240,232,0.2)" fontSize="8" textAnchor="middle">0h</text>
                  <text x="128" y="167" fill="rgba(245,240,232,0.2)" fontSize="8" textAnchor="middle">6h</text>
                  <text x="214" y="167" fill="rgba(245,240,232,0.2)" fontSize="8" textAnchor="middle">12h</text>
                  <text x="300" y="167" fill="rgba(245,240,232,0.2)" fontSize="8" textAnchor="middle">18h</text>
                  <text x="385" y="167" fill="rgba(245,240,232,0.2)" fontSize="8" textAnchor="middle">24h</text>
                  {/* Blunted flat curve — one shallow broad hump */}
                  <polyline
                    points="40,150 80,145 120,132 160,122 200,118 240,122 280,132 320,145 360,150 385,152"
                    fill="none"
                    stroke="rgba(201,169,110,0.4)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  {/* Fill area */}
                  <polygon
                    points="40,155 40,150 80,145 120,132 160,122 200,118 240,122 280,132 320,145 360,150 385,152 385,155"
                    fill="rgba(201,169,110,0.05)"
                  />
                  {/* Low amplitude annotation */}
                  <text x="200" y="110" fill="rgba(201,169,110,0.5)" fontSize="9" textAnchor="middle" fontFamily="DM Sans, sans-serif">Low amplitude — one blunted peak</text>
                </svg>
              </div>
              {/* RIGHT: Pulsatile */}
              <div style={{ background: "rgba(201,169,110,0.04)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 10, padding: "28px 24px" }}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.75rem", color: GOLD, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>Restored Pulsatile GH Release (CJC-1295 Protocol)</p>
                <svg viewBox="0 0 400 180" style={{ width: "100%", height: "auto" }}>
                  {/* Axes */}
                  <line x1="40" y1="20" x2="40" y2="155" stroke="rgba(245,240,232,0.2)" strokeWidth="1"/>
                  <line x1="40" y1="155" x2="385" y2="155" stroke="rgba(245,240,232,0.2)" strokeWidth="1"/>
                  {/* Y label */}
                  <text x="12" y="90" fill="rgba(245,240,232,0.3)" fontSize="9" fontFamily="DM Sans, sans-serif" textAnchor="middle" transform="rotate(-90,12,90)">GH Level</text>
                  {/* X label */}
                  <text x="212" y="172" fill="rgba(245,240,232,0.3)" fontSize="9" fontFamily="DM Sans, sans-serif" textAnchor="middle">24 Hours</text>
                  {/* X tick labels */}
                  <text x="40" y="167" fill="rgba(245,240,232,0.2)" fontSize="8" textAnchor="middle">0h</text>
                  <text x="128" y="167" fill="rgba(245,240,232,0.2)" fontSize="8" textAnchor="middle">6h</text>
                  <text x="214" y="167" fill="rgba(245,240,232,0.2)" fontSize="8" textAnchor="middle">12h</text>
                  <text x="300" y="167" fill="rgba(245,240,232,0.2)" fontSize="8" textAnchor="middle">18h</text>
                  <text x="385" y="167" fill="rgba(245,240,232,0.2)" fontSize="8" textAnchor="middle">24h</text>
                  {/* Pulsatile curve — 3–4 strong peaks */}
                  <polyline
                    points="40,152 55,150 65,120 75,60 85,28 95,55 108,120 118,148 130,150 145,148 158,110 168,55 178,30 190,52 202,108 214,148 226,150 242,148 258,115 268,62 278,32 290,58 302,112 314,148 330,150 360,152 385,152"
                    fill="none"
                    stroke={GOLD}
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  {/* Fill area */}
                  <polygon
                    points="40,155 40,152 55,150 65,120 75,60 85,28 95,55 108,120 118,148 130,150 145,148 158,110 168,55 178,30 190,52 202,108 214,148 226,150 242,148 258,115 268,62 278,32 290,58 302,112 314,148 330,150 360,152 385,152 385,155"
                    fill="rgba(201,169,110,0.08)"
                  />
                  {/* Peak annotations */}
                  <text x="85" y="22" fill={GOLD} fontSize="9" textAnchor="middle" fontFamily="DM Sans, sans-serif">Peak 1</text>
                  <text x="178" y="24" fill={GOLD} fontSize="9" textAnchor="middle" fontFamily="DM Sans, sans-serif">Peak 2</text>
                  <text x="278" y="26" fill={GOLD} fontSize="9" textAnchor="middle" fontFamily="DM Sans, sans-serif">Peak 3</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <p style={{ ...s.label, marginBottom: 20 }}>Mechanism Comparison</p>
          <div className="comparison-table-wrap" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: DM, minWidth: 700 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(201,169,110,0.2)" }}>
                  {["", "CJC-1295", "Full HGH", "Sermorelin", "Ibutamoren (MK-677)", "Tesamorelin"].map((h, i) => (
                    <th key={h} style={{
                      padding: "12px 16px", textAlign: i === 0 ? "left" : "center",
                      fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase",
                      color: i === 1 ? GOLD : "rgba(245,240,232,0.4)",
                      background: i === 1 ? "rgba(201,169,110,0.06)" : "transparent",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Mechanism", "GHRH receptor → pituitary GH pulse", "Direct GH replacement", "GHRH receptor (shorter half-life)", "Ghrelin receptor agonist (oral)", "GHRH analogue — FDA-studied"],
                  ["Axis preservation", "✓ Full somatostatin feedback intact", "✗ Suppresses natural axis", "✓ Axis preserved", "Partial — ghrelin pathway", "✓ Axis preserved"],
                  ["Half-life", "✓ ~8 days (DAC) / 30 min (no DAC)", "✗ ~3–4 hours (requires daily dosing)", "✗ ~10–20 minutes", "Oral — ~24h", "~25 minutes"],
                  ["IGF-1 elevation", "✓ 2–10× sustained elevation", "✓ Direct but supraphysiological", "Modest elevation", "Moderate elevation", "✓ Clinically significant"],
                  ["Side effects", "✓ Clean — injection site only", "✗ Insulin resistance, acromegaly risk, fluid retention", "✓ Generally clean", "Lethargy, water retention, hunger", "✓ Generally clean"],
                  ["Cost / month", "✓ $219", "✗ $800–$2,000+", "~$150–$300", "~$50–$150 (grey market)", "~$300–$600"],
                ].map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: "1px solid rgba(245,240,232,0.05)" }}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{
                        padding: "14px 16px", fontSize: "0.875rem",
                        textAlign: ci === 0 ? "left" : "center",
                        color: ci === 0 ? "rgba(245,240,232,0.5)" : ci === 1 ? GOLD : cell.startsWith("✓") ? "rgba(245,240,232,0.75)" : "rgba(245,240,232,0.35)",
                        fontWeight: ci === 1 ? 500 : 400,
                        background: ci === 1 ? "rgba(201,169,110,0.04)" : "transparent",
                      }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ DISCOVER PEPTIDES ══ */}
      <section id="discover-peptides" style={{ background: "#F5F0E8", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 56 }}>
            <h2 style={{ ...s.h2lt }}>Discover Peptides</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Explore the full range of physician-supervised peptide protocols available through Aurelius Health Group — each designed around peer-reviewed evidence, pharma-grade compounds, and measurable outcomes.</p>
          </div>
          <div className="four-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginBottom: 48 }}>
            {[
              {
                name: "CJC-1295Rx", nameBase: "CJC-1295", nameSuffix: "Rx",
                tag: "GH Secretagogue & Recovery",
                desc: "The pituitary-stimulating GHRH analogue that restores pulsatile GH release, elevates IGF-1 2–10× baseline, and drives body recomposition, recovery, and sleep quality — without suppressing your natural GH axis.",
                cta: "Check My Eligibility", ctaHref: "#quiz", featured: true,
              },
              {
                name: "IbutamorenRx", tag: "GH Secretagogue & Recovery",
                desc: "The oral ghrelin receptor agonist that elevates GH and IGF-1 through a complementary pathway — ideal as an adjunct to CJC-1295 or as a standalone protocol for patients who prefer oral administration.",
                cta: "Get Started", ctaHref: "https://ibutamorenrx.vercel.app", featured: false,
              },
              {
                name: "TB-500Rx", tag: "Tissue Repair & Recovery",
                desc: "The Thymosin Beta-4 fragment that mobilizes stem cells, restores vascular supply, and rebuilds muscle, tendon, cardiac, and neural tissue simultaneously — without surgery or extended downtime.",
                cta: "Get Started", ctaHref: "https://tb500rx.vercel.app", featured: false,
              },
              {
                name: "AOD-9604Rx", tag: "Fat Loss & Body Recomposition",
                desc: "A modified fragment of human growth hormone (hGH 176–191) that stimulates lipolysis and inhibits lipogenesis without insulin resistance — targeting adipose tissue directly for fat reduction.",
                cta: "Get Started", ctaHref: "https://aod9604rx.vercel.app", featured: false,
              },
            ].map((peptide) => (
              <div key={peptide.name} style={{
                background: peptide.featured ? "#1A1410" : "#1A1A1A",
                borderRadius: 10, padding: "28px 24px", display: "flex", flexDirection: "column",
                gap: 12, position: "relative",
                border: peptide.featured ? "1px solid rgba(201,169,110,0.3)" : "1px solid rgba(245,240,232,0.06)",
              }}>
                {peptide.featured && (
                  <div style={{ position: "absolute", top: -1, left: 20, background: GOLD, color: "#0D0D0D", fontFamily: DM, fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, padding: "3px 10px", borderRadius: "0 0 5px 5px" }}>Current Protocol</div>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: peptide.featured ? 8 : 0 }}>
                  <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: GOLD, background: "rgba(201,169,110,0.1)", padding: "3px 8px", borderRadius: 3, alignSelf: "flex-start" }}>{peptide.tag}</span>
                  <h3 style={{ ...s.h3dk, fontSize: "1.0625rem", margin: 0 }}>
                    {peptide.featured ? <>{peptide.nameBase}<span style={{ color: DARK_ORANGE }}>{peptide.nameSuffix}</span></> : peptide.name}
                  </h3>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.875rem", flex: 1 }}>{peptide.desc}</p>
                <a href={peptide.ctaHref} style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontFamily: DM, fontWeight: 500, fontSize: "0.8125rem", letterSpacing: "0.04em",
                  padding: "12px 20px", borderRadius: 6, textDecoration: "none", transition: "all 0.2s",
                  background: peptide.featured ? GOLD : "transparent",
                  color: peptide.featured ? "#0D0D0D" : "rgba(245,240,232,0.5)",
                  border: peptide.featured ? "none" : "1px solid rgba(245,240,232,0.15)",
                }}
                  onMouseEnter={e => { if (!peptide.featured) { e.currentTarget.style.color = "#F5F0E8"; e.currentTarget.style.borderColor = "rgba(245,240,232,0.35)"; } }}
                  onMouseLeave={e => { if (!peptide.featured) { e.currentTarget.style.color = "rgba(245,240,232,0.5)"; e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)"; } }}
                >{peptide.cta}</a>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="/peptides" style={{ ...s.label, color: "#8C7B6B", textDecoration: "none", borderBottom: "1px solid rgba(140,123,107,0.3)", paddingBottom: 2 }}>Discover More Peptides →</a>
          </div>
        </div>
      </section>

      {/* ══ CLINICAL EVIDENCE ══ */}
      <section id="research" style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Clinical Evidence</p>
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 56 }}>
            <h2 style={{ ...s.h2dk }}>Six evidence-backed GH optimization pathways</h2>
            <p style={{ ...s.bodyLt, paddingTop: 8 }}>CJC-1295's mechanism has been validated in peer-reviewed human studies — including Teichman et al. (J Clin Endocrinol Metab, 2006) demonstrating sustained GH and IGF-1 elevation over 28 days with a clean safety profile. Each pathway below is grounded in published research, presented without exaggeration.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48 }}>
            {conditionTags.map((tag) => (
              <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} style={{
                fontFamily: DM, fontWeight: 400, fontSize: "0.8rem",
                padding: "6px 14px", borderRadius: 20, cursor: "pointer", transition: "all 0.2s",
                background: activeTag === tag ? "rgba(201,169,110,0.15)" : "transparent",
                color: activeTag === tag ? GOLD : "rgba(245,240,232,0.4)",
                border: `1px solid ${activeTag === tag ? "rgba(201,169,110,0.4)" : "rgba(245,240,232,0.1)"}`,
              }}>{tag}</button>
            ))}
          </div>
          <div className="pathway-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {pathways.map((pw) => (
              <div key={pw.n} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(245,240,232,0.06)", borderRadius: 10, padding: "clamp(24px,3vw,32px)" }}>
                <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "2rem", color: "rgba(201,169,110,0.25)", lineHeight: 1, display: "block", marginBottom: 16 }}>{pw.n}</span>
                <h3 style={{ ...s.h3dk, marginBottom: 12 }}>{pw.title}</h3>
                <p style={{ ...s.bodyLt, fontSize: "0.875rem", marginBottom: 16 }}>{pw.body}</p>
                <p style={{ ...s.cite, marginBottom: 16 }}>Source: {pw.cite}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {pw.tags.map((tag) => (
                    <span key={tag} style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.7rem", color: "rgba(201,169,110,0.6)", border: "1px solid rgba(201,169,110,0.2)", padding: "3px 8px", borderRadius: 3 }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 64, borderRadius: 12, overflow: "hidden", position: "relative", height: "clamp(200px,30vw,380px)" }}>
            <img src={IMGS.cells} alt="Body composition and GH optimization" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.3) 60%, transparent 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 clamp(24px,5vw,60px)" }}>
              <div style={{ maxWidth: 480 }}>
                <p style={{ ...s.label, marginBottom: 12 }}>Clinical Validation</p>
                <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.1rem,2.5vw,1.75rem)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#F5F0E8" }}>
                  The only GHRH analogue with published human data demonstrating 2–10× IGF-1 elevation maintained over 28 days with a clean safety profile — Teichman et al., J Clin Endocrinol Metab, 2006
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROTOCOL ══ */}
      <section id="protocol" style={{ background: "#F5F0E8", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Protocol</p>
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 56 }}>
            <h2 style={{ ...s.h2lt }}>Four steps to GH axis restoration</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Every CJC-1295Rx protocol begins with a physician evaluation and baseline IGF-1 measurement. No protocol is initiated without documented clinical rationale, hormonal baseline, and informed consent.</p>
          </div>
          <div className="four-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {[
              {
                step: "01", title: "Intake & Hormonal Baseline",
                items: ["Baseline IGF-1 measurement", "GH stimulation panel if indicated", "Body composition assessment", "Fasting metabolic panel", "Physician intake review within 48h"],
              },
              {
                step: "02", title: "Physician Review & Protocol Design",
                items: ["DAC vs. non-DAC formulation selection", "Dosing frequency determination", "Ipamorelin combination assessment", "Sleep and recovery protocol design", "Informed consent documentation"],
              },
              {
                step: "03", title: "Protocol Initiation",
                items: ["Subcutaneous injection instruction", "2–5× per week (non-DAC) or 1–2× per week (DAC)", "Pre-sleep administration preferred", "Pharma-grade lyophilized compound", "Cold-chain overnight delivery"],
              },
              {
                step: "04", title: "Monthly IGF-1 Monitoring",
                items: ["Monthly IGF-1 blood draw", "Dose optimization based on response", "Body composition reassessment at 8 weeks", "Protocol adjustment as indicated", "Annual comprehensive hormonal review"],
              },
            ].map((step) => (
              <div key={step.step} style={{ background: "#0D0D0D", borderRadius: 10, padding: "clamp(24px,3vw,32px)", border: "1px solid rgba(201,169,110,0.1)" }}>
                <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "2.5rem", color: "rgba(201,169,110,0.2)", lineHeight: 1, marginBottom: 16 }}>{step.step}</p>
                <h3 style={{ ...s.h3dk, marginBottom: 20 }}>{step.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {step.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: GOLD, fontSize: "0.6rem", marginTop: 5, flexShrink: 0 }}>◆</span>
                      <span style={{ ...s.bodyLt, fontSize: "0.875rem" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" style={{ background: "#F5F0E8", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Pricing</p>
          <div className="two-col-pricing" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <h2 style={{ ...s.h2lt, marginBottom: 20 }}>GH optimization pricing. Without the anti-aging clinic markup.</h2>
              <p style={{ ...s.body, marginBottom: 24 }}>Anti-aging clinics and longevity medicine practices typically charge $400–$800 per consultation, $500–$1,200 for hormone panels, and $800–$2,000/month for exogenous HGH. Aurelius bundles physician oversight, baseline IGF-1 labs, pharma-grade CJC-1295, and monthly monitoring into one monthly plan.</p>
              <div style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 8, padding: "20px 24px", marginBottom: 28 }}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#1A1A1A", marginBottom: 8 }}>Typical anti-aging clinic GH protocol cost:</p>
                {[
                  ["Initial physician consultation", "$400–$800"],
                  ["Baseline IGF-1 + hormone panel", "$300–$600"],
                  ["Exogenous HGH (monthly)", "$800–$2,000"],
                  ["Monthly follow-up visits", "$200–$400"],
                  ["Total first month", "$1,700–$3,800"],
                ].map(([item, cost]) => (
                  <div key={item} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(13,13,13,0.06)" }}>
                    <span style={{ ...s.bodySm }}>{item}</span>
                    <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#8C6845" }}>{cost}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Physician consultation included",
                  "Baseline IGF-1 + hormone panel included",
                  "Pharma-grade CJC-1295 included",
                  "Injection supplies included",
                  "Protocol guide included",
                  "Monthly IGF-1 monitoring included",
                  "Physician secure messaging",
                  "Annual comprehensive review",
                  "Nutrition & training framework",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke={GOLD} strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ ...s.bodySm }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "#0D0D0D", borderRadius: 12, padding: "clamp(32px,5vw,48px) clamp(24px,4vw,40px)", textAlign: "center", border: "1px solid rgba(201,169,110,0.15)" }}>
                <p style={{ ...s.label, marginBottom: 12 }}>CJC-1295Rx Plan</p>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1.25rem", color: GOLD, marginTop: 10 }}>$</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(3.5rem,8vw,5rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "#F5F0E8" }}>219</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1rem", color: "rgba(245,240,232,0.4)", marginTop: 16 }}>/mo</span>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.8rem", marginBottom: 32 }}>vs. $1,700–$3,800/mo at an anti-aging or longevity clinic</p>
                <a href="#quiz" className="btn-gold" style={{ width: "100%", justifyContent: "center", display: "flex", marginBottom: 16 }}>Check My Eligibility</a>
                <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6 }}>Cancel anytime. No long-term commitment required.</p>
                <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", marginTop: 28, paddingTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    "Physician-supervised protocol",
                    "Pharma-grade compounded CJC-1295",
                    "Baseline IGF-1 + hormone panel",
                    "Monthly IGF-1 monitoring",
                    "Cold-chain overnight delivery",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke={GOLD} strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "rgba(245,240,232,0.45)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ELIGIBILITY QUIZ ══ */}
      <section id="quiz" style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16, textAlign: "center" }}>Eligibility Screening</p>
          <h2 style={{ ...s.h2dk, textAlign: "center", marginBottom: 16 }}>Are you a candidate for CJC-1295Rx?</h2>
          <p style={{ ...s.bodyLt, textAlign: "center", maxWidth: 520, margin: "0 auto 56px" }}>
            This 5-question screen checks for CJC-1295 protocol contraindications. It takes under 60 seconds and does not constitute a medical evaluation.
          </p>
          <EligibilityQuiz />
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0", borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Frequently Asked Questions</p>
          <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
            <div style={{ position: "sticky", top: 100 }}>
              <h2 style={{ ...s.h2dk, marginBottom: 20 }}>Everything you need to know</h2>
              <p style={{ ...s.bodyLt }}>Including CJC-1295 vs. HGH and Sermorelin, DAC vs. non-DAC differences, Ipamorelin combination rationale, dosing protocol, results timeline, and off-label prescribing legality.</p>
              <div style={{ marginTop: 40 }}>
                <img src={IMGS.labs} alt="Physician consultation for GH peptide protocol" style={{ width: "100%", borderRadius: 10, objectFit: "cover" }} />
              </div>
            </div>
            <div>{faqs.map((item) => <FaqItem key={item.q} item={item} />)}</div>
          </div>
        </div>
      </section>

      {/* ══ CLOSING CTA ══ */}
      <section style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0", textAlign: "center", borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 20 }}>Start Today</p>
          <h2 style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#F5F0E8", marginBottom: 24 }}>
            Restore what age took from your GH axis.
          </h2>
          <p style={{ ...s.bodyLt, marginBottom: 48, fontSize: "1.0625rem" }}>
            CJC-1295 doesn't replace your growth hormone — it restores your body's ability to produce it. The physiologically correct approach to GH optimization.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <a href="#quiz" className="btn-gold" style={{ padding: "16px 36px", fontSize: "1rem" }}>Check My Eligibility</a>
            <a href="#research" className="btn-ghost-cream" style={{ padding: "16px 36px", fontSize: "1rem" }}>Review the Research</a>
          </div>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            † This page describes off-label use of CJC-1295, a compounded synthetic GHRH analogue. CJC-1295 is prescribed as a compounded peptide in the United States at the clinical discretion of a licensed physician. This content is for informational purposes only and does not constitute medical advice. Individual results vary. All protocols require physician evaluation and are subject to contraindication screening.
          </p>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(245,240,232,0.06)", padding: "clamp(40px,6vw,64px) 0 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4 L6 40 L14 40 L24 20 L34 40 L42 40 Z" fill={GOLD} />
                  <line x1="12" y1="28" x2="36" y2="28" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="24" y1="20" x2="24" y2="44" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div>
                  <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#F5F0E8", display: "block" }}>CJC-1295<span style={{ color: DARK_ORANGE }}>Rx</span></span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8C7B6B" }}>Aurelius Health Group</span>
                </div>
              </div>
              <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.35)", maxWidth: 240, marginTop: 12, lineHeight: 1.6 }}>Physician-supervised CJC-1295 protocol for GH axis restoration, body recomposition, recovery, and anti-aging optimization.</p>
            </div>
            {[
              { heading: "Protocol", links: ["How It Works", "The Research", "Six Pathways"] },
              { heading: "Company", links: ["About Aurelius", "Our Physicians", "All Treatments", "Blog"] },
              { heading: "Support", links: ["Check Eligibility", "FAQ", "Contact Us", "Patient Portal"] },
            ].map((col) => (
              <div key={col.heading}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.3)", marginBottom: 16 }}>{col.heading}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((link) => (
                    <li key={link}><a href="#" style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.45)", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "#F5F0E8")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.45)")}>{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.2)" }}>© 2026 Aurelius Health Group. All rights reserved.</p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Service", "Medical Disclaimer"].map((link) => (
                <a key={link} href="#" style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.6)")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.25)")}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ══ RESPONSIVE STYLES ══ */}
      <style>{`
        /* Tablet */
        @media (max-width: 1024px) {
          .pathway-grid { grid-template-columns: repeat(2,1fr) !important; }
          .four-col-grid { grid-template-columns: repeat(2,1fr) !important; }
          .gh-svg-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .two-col-mech { grid-template-columns: 1fr !important; gap: 48px !important; }
          .two-col-header { grid-template-columns: 1fr !important; gap: 24px !important; }
          .two-col-pricing { grid-template-columns: 1fr !important; gap: 48px !important; }
          .faq-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        /* Mobile */
        @media (max-width: 640px) {
          .problem-grid { grid-template-columns: 1fr !important; }
          .pathway-grid { grid-template-columns: 1fr !important; }
          .stats-strip { grid-template-columns: repeat(2,1fr) !important; }
          .four-col-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        /* Touch targets */
        @media (max-width: 768px) {
          .btn-gold, .btn-ghost-cream { min-height: 48px; }
        }
      `}</style>
    </div>
  );
}
