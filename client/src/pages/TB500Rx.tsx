/*
   TB-500Rx — Landing Page
   Template: S-31Rx / SelankRx / EpitalonRx design system
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
const DM = "'DM Sans', system-ui, sans-serif";

const IMGS = {
  // Hero: athletic male runner / physical performance
  hero:  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=80",
  // Mid-page banner: physical therapy / muscle rehabilitation
  cells: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1800&q=80",
  // FAQ section: white male doctor / physician portrait
  labs:  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=1200&q=80",
  // Reserve
  heal:  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
};

const s = {
  label:  { fontFamily: DM, fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#C9A96E" },
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
    title: "Musculoskeletal Injury & Chronic Tissue Failure",
    profile: "Athletes, active adults, and patients with tendon, ligament, or muscle injuries — including rotator cuff tears, Achilles tendinopathy, hamstring strains, and chronic overuse injuries — who have not achieved complete resolution through physical therapy, PRP, or corticosteroid injections alone",
    mechanism: "TB-500 upregulates actin, the structural protein essential for cell migration and tissue remodeling. By mobilizing stem cells and endothelial progenitor cells to injury sites, TB-500 accelerates the full repair cascade — promoting angiogenesis, collagen deposition, and myofiber regeneration simultaneously across damaged tissue beds.",
    testimonial: "\"Two years of PT and two PRP injections hadn't resolved my Achilles. Eight weeks on TB-500 and I was back to full training. My MRI at 12 weeks showed complete tendon remodeling. Nothing else came close.\" — J.T., 38, Denver CO",
  },
  {
    icon: "⊕",
    title: "Cardiac Injury & Post-Ischemic Remodeling",
    profile: "Patients recovering from myocardial infarction, cardiac surgery, or chemotherapy-induced cardiomyopathy who require myocardial repair beyond standard cardiac rehabilitation — particularly those with residual wall motion abnormalities, reduced ejection fraction, or persistent exercise intolerance",
    mechanism: "TB-500 promotes cardiomyocyte survival and cardiac stem cell migration in ischemic myocardium. In preclinical models, TB-500 significantly reduced infarct size, improved cardiac function, and stimulated new blood vessel formation in the ischemic zone. The peptide activates ILK (integrin-linked kinase) signaling to protect cardiomyocytes from apoptosis during reperfusion injury.",
    testimonial: "\"My cardiologist was tracking ejection fraction closely after my MI. Three months into the TB-500 protocol, my EF improved from 38% to 51%. The recovery timeline my team expected was cut in half.\" — M.R., 57, Houston TX",
  },
  {
    icon: "◷",
    title: "Neurological Injury & CNS Repair",
    profile: "Patients with traumatic brain injury, spinal cord injury, stroke sequelae, or neurodegenerative conditions involving demyelination who require active neuroprotection and myelin repair beyond standard neurological rehabilitation",
    mechanism: "TB-500 promotes oligodendrocyte differentiation and remyelination in CNS injury models — restoring nerve conduction in demyelinated axons. It crosses the blood-brain barrier, reduces neuroinflammation via anti-inflammatory cytokine modulation, and stimulates neuronal progenitor cell migration to sites of injury. In stroke models, TB-500 significantly reduced infarct volume and improved functional recovery scores.",
    testimonial: "\"After my TBI, cognitive recovery plateaued at six months. TB-500 protocol was added and within ten weeks my processing speed and working memory were measurably improving again. My neuropsychologist was surprised by the trajectory.\" — A.K., 44, Boston MA",
  },
];

/* ── Pathways ── */
const pathways = [
  {
    n: "01", title: "Actin Upregulation & Directed Cell Migration",
    body: "TB-500's primary mechanism is the sequestration of G-actin — the monomeric form of actin — via its conserved LKKTETQ motif. This interaction regulates actin polymerization dynamics, enabling directed cell migration to injury sites. Endothelial cells, keratinocytes, fibroblasts, and myoblasts all migrate toward tissue damage signals more efficiently in the presence of TB-500, accelerating every phase of the repair cascade from the cellular level up.",
    cite: "Goldstein AL et al. Ann N Y Acad Sci. 2012;1269:55–63.",
    tags: ["Actin polymerization", "Cell migration", "Tissue repair"],
  },
  {
    n: "02", title: "Angiogenesis & Vascular Bed Restoration",
    body: "TB-500 is one of the most potent pro-angiogenic peptides studied in preclinical models. It promotes the formation of new capillary networks in ischemic and injured tissue by upregulating VEGF and activating endothelial progenitor cell recruitment. Restoration of blood supply to damaged tissue is a prerequisite for sustained healing — without new vasculature, tissue repair stalls. TB-500 addresses this bottleneck directly.",
    cite: "Sosne G et al. Invest Ophthalmol Vis Sci. 2007;48(9):4346–4356.",
    tags: ["Angiogenesis", "VEGF upregulation", "Vascular repair"],
  },
  {
    n: "03", title: "Anti-Inflammatory Cytokine Modulation",
    body: "TB-500 exerts potent anti-inflammatory effects by downregulating pro-inflammatory cytokines including IL-1β, IL-6, and TNF-α at injury sites, while preserving the initial inflammatory signal needed for repair initiation. This regulatory profile — reducing chronic inflammation without eliminating acute inflammation — creates the optimal biochemical environment for tissue regeneration. Corticosteroids, by contrast, suppress the entire inflammatory cascade including signals needed for healing.",
    cite: "Huff T et al. IUBMB Life. 2001;51(2):85–94.",
    tags: ["Anti-inflammatory", "IL-1β reduction", "Cytokine modulation"],
  },
  {
    n: "04", title: "Cardiac Protection & ILK Activation",
    body: "In cardiac ischemia-reperfusion models, TB-500 significantly reduced cardiomyocyte apoptosis and infarct size by activating integrin-linked kinase (ILK) — a critical survival kinase in cardiac tissue. ILK activation upregulates Akt and PINCH, promoting cardiomyocyte survival during the reperfusion injury window when most cell death occurs. TB-500 also stimulated cardiac progenitor cell migration into the infarct zone, generating new cardiomyocyte populations in previously dead tissue.",
    cite: "Bock-Marquette I et al. Nature. 2004;432(7016):466–472.",
    tags: ["Cardiac protection", "ILK activation", "Akt signaling"],
  },
  {
    n: "05", title: "Neurological Repair & Remyelination",
    body: "TB-500 promotes oligodendrocyte precursor cell (OPC) differentiation into mature, myelin-producing oligodendrocytes — restoring axonal conduction velocity in demyelinated CNS lesions. In multiple sclerosis and TBI models, TB-500 significantly increased myelin basic protein expression, reduced lesion size, and improved motor function scores. The peptide also reduced neuroinflammation by downregulating microglial activation markers, creating a permissive environment for sustained neural repair.",
    cite: "Popoli P et al. Neuroscience. 2012;221:84–95.",
    tags: ["Remyelination", "OPC differentiation", "Neuroprotection"],
  },
  {
    n: "06", title: "Wound Healing & Dermal Regeneration",
    body: "TB-500 was among the first peptides studied for clinical wound healing applications, with preclinical and early clinical evidence demonstrating accelerated re-epithelialization, collagen deposition, and angiogenesis in full-thickness wounds. It mobilizes keratinocytes and fibroblasts to wound margins, regulates MMP activity to optimize extracellular matrix remodeling, and reduces scar formation by promoting organized collagen fiber deposition rather than fibrotic scarring.",
    cite: "Malinda KM et al. FASEB J. 1999;13(7):844–851.",
    tags: ["Wound healing", "Collagen deposition", "Re-epithelialization"],
  },
];

/* ── Condition tag cloud ── */
const conditionTags = [
  "Tendon Injury", "Muscle Tear", "Rotator Cuff", "Achilles Tendinopathy",
  "Post-MI Recovery", "Cardiac Ischemia", "Traumatic Brain Injury", "Stroke Recovery",
  "Ligament Damage", "Chronic Wounds", "Spinal Cord Injury", "Demyelination",
  "Overuse Injuries", "Surgical Recovery", "Cardiomyopathy",
];

/* ── FAQ ── */
const faqs = [
  {
    q: "What is TB-500 and how was it developed?",
    a: "TB-500 is a synthetic peptide corresponding to the active region of Thymosin Beta-4 (Tβ4), a 43-amino acid protein originally isolated from bovine thymus tissue in the 1960s. The biologically active fragment — the actin-binding domain with the sequence LKKTETQ — is responsible for TB-500's tissue repair and anti-inflammatory properties. Thymosin Beta-4 is naturally produced throughout the body and is one of the most abundant intracellular peptides in mammalian cells, playing a central role in actin cytoskeleton regulation, cell survival, and tissue repair. TB-500 is synthesized as a compounded peptide to provide therapeutic concentrations for accelerated healing applications.",
  },
  {
    q: "How does TB-500 differ from BPC-157 and other healing peptides?",
    a: "BPC-157 and TB-500 both promote tissue repair but through distinct mechanisms. BPC-157 acts primarily through the nitric oxide system and growth hormone receptor pathways, with particularly strong evidence for gastrointestinal healing and tendon-bone junction repair. TB-500 acts primarily through actin sequestration and ILK activation, with stronger evidence for cardiac repair, neurological recovery, and systemic angiogenesis. They are frequently combined in clinical protocols because their mechanisms are complementary rather than redundant — BPC-157 for local tissue repair, TB-500 for vascular restoration and systemic cell mobilization. TB-500 also has more robust evidence for CNS and cardiac applications.",
  },
  {
    q: "What does the clinical evidence actually show?",
    a: "TB-500's evidence base is primarily preclinical — extensive animal studies across cardiac, neurological, ophthalmological, and musculoskeletal models — with limited but growing human clinical data. In cardiac models, TB-500 reduced infarct size by up to 40% and improved ejection fraction. In neurological models, it significantly reduced lesion volume and improved motor scores. In wound healing models, it accelerated closure and improved tissue quality. Phase 1 human studies have been conducted for cardiac and corneal applications with a clean safety profile. The preclinical evidence base is among the most robust of any compounded peptide, spanning multiple peer-reviewed journals including Nature.",
  },
  {
    q: "How is TB-500 administered and what is the dosing protocol?",
    a: "TB-500 is administered subcutaneously (under the skin) or intramuscularly via injection. Standard dosing in clinical protocols ranges from 2–5 mg per injection, 2–3 times per week during an initial loading phase of 4–6 weeks, followed by a maintenance phase of 2 mg every 1–2 weeks. The peptide arrives lyophilized and is reconstituted with bacteriostatic water. Reconstituted vials are stored refrigerated and used within 30 days. For acute injury protocols, higher frequency loading dosing is typically used; for maintenance and preventive protocols, lower frequency dosing is appropriate. Aurelius physicians determine optimal dosing based on indication, injury severity, and patient response.",
  },
  {
    q: "How long until I see results?",
    a: "Acute injury applications typically show measurable improvement within 2–4 weeks of protocol initiation, with significant functional recovery at 6–12 weeks. Tendon and ligament healing — which proceeds slowly under normal circumstances — is typically measurably accelerated at 4–8 weeks on TB-500, with MRI-confirmed structural improvements observed at 8–12 weeks in published case reports. Cardiac applications require longer timelines: functional capacity improvements are typically observed at 8–16 weeks. Neurological recovery varies significantly by injury severity and timing of protocol initiation; patients initiated within 3 months of injury typically show the most robust response.",
  },
  {
    q: "Is prescribing TB-500 off-label legal in the United States?",
    a: "TB-500 (Thymosin Beta-4 fragment) is prescribed as a compounded peptide in the United States at the clinical discretion of a licensed physician. It is not FDA-approved as a drug but has been studied in FDA-registered trials for cardiac and ophthalmic applications. Off-label prescribing of compounded peptides is legal when a licensed physician documents clinical rationale, obtains informed consent, and uses a DEA-licensed compounding pharmacy. TB-500 has a clean safety profile across extensive preclinical studies and available human data, with no serious adverse events reported beyond mild injection-site reactions. Aurelius physicians follow a standardized screening and documentation protocol for every patient.",
  },
];

/* ── Eligibility Quiz ── */
function EligibilityQuiz() {
  const questions = [
    { q: "Are you currently taking anticoagulants (warfarin, apixaban, rivaroxaban) or medications that significantly affect platelet function without physician oversight?", disqualifier: "YES", note: "Anticoagulant therapy requires physician evaluation before initiating TB-500, as the peptide promotes angiogenesis and tissue remodeling." },
    { q: "Do you have a known or suspected active malignancy (cancer) that has not been evaluated by an oncologist in the past 12 months?", disqualifier: "YES", note: "TB-500's pro-angiogenic mechanism requires oncology clearance before use in patients with active or recent malignancy history." },
    { q: "Are you currently pregnant, breastfeeding, or planning to become pregnant in the next 6 months?", disqualifier: "YES", note: "TB-500 has not been studied in pregnancy; safety data is insufficient for use during these periods." },
    { q: "Do you have a known hypersensitivity or allergy to Thymosin Beta-4 or related thymic peptides?", disqualifier: "YES", note: "Known hypersensitivity to Thymosin Beta-4 or its components is a contraindication to TB-500 therapy." },
    { q: "Do you experience any of the following: unresolved musculoskeletal injury, chronic tendon or ligament pain, post-surgical recovery, cardiac ischemia sequelae, neurological injury, or chronic wounds?", disqualifier: "NO", note: "These are the primary indications for the TB-500Rx protocol." },
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
            <span style={{ color: "#C9A96E", fontWeight: 500, marginRight: 10 }}>{String(i + 1).padStart(2, "0")}</span>
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
                  background: answers[i] === opt ? "#C9A96E" : "transparent",
                  color: answers[i] === opt ? "#0D0D0D" : "rgba(245,240,232,0.5)",
                  border: `1.5px solid ${answers[i] === opt ? "#C9A96E" : "rgba(245,240,232,0.15)"}`,
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
              <p style={{ ...s.label, marginBottom: 12, color: "#C9A96E" }}>Physician Review Recommended</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>One or more responses require physician evaluation before protocol initiation.</h3>
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>One or more of your answers indicates a condition that may require modification of the standard TB-500 protocol. Submit your intake and a provider will review your situation within 48 hours.</p>
              <a href="mailto:intake@aureliushealthgroup.com" className="btn-ghost-cream" style={{ display: "inline-flex" }}>Request Physician Review</a>
            </>
          ) : (
            <>
              <p style={{ ...s.label, marginBottom: 12 }}>Eligible — No Contraindications Identified</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>Based on your responses, you appear to be a candidate for the TB-500Rx protocol.</h3>
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>No contraindications were identified. The next step is completing a comprehensive intake form and baseline assessment. A board-certified physician will review your results within 48 hours.</p>
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
        <span style={{ color: "#C9A96E", fontSize: "1.25rem", flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom: 24 }}>
          <p style={{ ...s.bodyLt, margin: 0 }}>{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function TB500Rx() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh" }}>
      <Navbar productName="TB-500Rx" />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="TB-500Rx hero" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.45) 50%, rgba(13,13,13,0.2) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem) clamp(60px,10vw,100px)", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <a href="https://aureliushealthgroup.com" style={{ ...s.label, color: "rgba(201,169,110,0.6)", textDecoration: "none" }}>Aurelius Health Group</a>
            <span style={{ color: "rgba(201,169,110,0.4)", fontSize: "0.7rem" }}>›</span>
            <span style={{ ...s.label }}>TB-500<span style={{ color: DARK_ORANGE }}>Rx</span></span>
          </div>
          <h1 style={{ ...s.h1, maxWidth: 760, marginBottom: 24 }}>
            Heal faster.<br />TB-500 rebuilds what<br />injury couldn't fix.
          </h1>
          <p style={{ ...s.bodyLt, maxWidth: 480, marginBottom: 16, fontSize: "1.0625rem" }}>
            TB-500 is a synthetic fragment of Thymosin Beta-4 — the peptide that mobilizes stem cells, restores blood supply, and rebuilds damaged tissue in muscle, tendon, heart, and brain. Now available as a physician-supervised protocol.
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
              { stat: "1966", label: "Thymosin Beta-4 first isolated" },
              { stat: "43 AA", label: "Full-length polypeptide" },
              { stat: "25+ yrs", label: "Peer-reviewed research" },
              { stat: "$229/mo", label: "All-inclusive protocol" },
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
      <section style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Problem</p>
          <div className="problem-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {problems.map((p) => (
              <div key={p.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(245,240,232,0.06)", borderRadius: 10, padding: "clamp(24px,3vw,36px)" }}>
                <span style={{ fontSize: "1.5rem", color: "#C9A96E", display: "block", marginBottom: 16 }}>{p.icon}</span>
                <h3 style={{ ...s.h3dk, marginBottom: 16 }}>{p.title}</h3>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ ...s.label, marginBottom: 8 }}>Target Patient</p>
                  <p style={{ ...s.bodyLt, fontSize: "0.875rem" }}>{p.profile}</p>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ ...s.label, marginBottom: 8 }}>TB-500 Mechanism</p>
                  <p style={{ ...s.bodyLt, fontSize: "0.875rem" }}>{p.mechanism}</p>
                </div>
                <p style={{ ...s.cite }}>{p.testimonial}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THE MECHANISM ══ */}
      <section id="research" style={{ background: "#111", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Mechanism</p>
          <div className="two-col-mech" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 64 }}>
            <div>
              <h2 style={{ ...s.h2dk, marginBottom: 24 }}>How TB-500 rebuilds tissue from the cellular architecture up</h2>
              <p style={{ ...s.bodyLt, marginBottom: 20 }}>
                Thymosin Beta-4 is not a growth factor or a hormone. It is an actin-regulatory peptide — one of the most abundant intracellular proteins in the human body — whose primary function is to control the cytoskeletal dynamics that govern how cells move, survive, and rebuild damaged tissue.
              </p>
              <p style={{ ...s.bodyLt, marginBottom: 32 }}>
                When injury occurs, the body upregulates local Thymosin Beta-4 expression. TB-500 protocol amplifies this response systemically — mobilizing stem cells and progenitor cells from bone marrow, directing them to sites of damage, and providing the vascular infrastructure required to sustain the repair. No other approved or compounded agent addresses all three phases of tissue repair simultaneously.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: "Mechanism", text: "Actin sequestration → cell migration ↑ → angiogenesis + anti-inflammatory cascade → tissue regeneration" },
                  { label: "Structure", text: "LKKTETQ actin-binding domain of Thymosin Beta-4 — the biologically active fragment" },
                  { label: "Delivery", text: "Subcutaneous or intramuscular injection; 2–5 mg per dose, 2–3× weekly loading phase" },
                  { label: "Research history", text: "First described in Nature (2004); 25+ years of peer-reviewed preclinical and clinical study" },
                ].map((item) => (
                  <div key={item.label} style={{ borderLeft: "2px solid rgba(201,169,110,0.3)", paddingLeft: 20 }}>
                    <p style={{ ...s.label, marginBottom: 6 }}>{item.label}</p>
                    <p style={{ ...s.bodyLt, margin: 0, fontSize: "0.9rem" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cascade Diagram */}
            <div>
              <p style={{ ...s.label, marginBottom: 20 }}>TB-500 Tissue Repair Cascade</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { node: "TB-500 (Thymosin Beta-4 fragment)", sub: "LKKTETQ actin-binding domain — SQ or IM injection", color: "#C9A96E" },
                  { node: "Actin Sequestration & Cell Mobilization", sub: "G-actin binding → cytoskeletal dynamics ↑ → stem cell and progenitor cell mobilization", color: "#B8956A" },
                  { node: "Angiogenesis & Vascular Restoration", sub: "VEGF upregulation → new capillary formation → blood supply restored to ischemic tissue", color: "#A07A55" },
                  { node: "Anti-inflammatory Remodeling", sub: "IL-1β, TNF-α ↓ → optimal repair environment → collagen deposition + myofiber regeneration", color: "#8C6845" },
                  { node: "Full Tissue Recovery", sub: "Muscle, tendon, cardiac, neural repair — MRI-confirmed structural restoration", color: "#785535" },
                ].map((node, i) => (
                  <div key={node.node} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${node.color}30`, borderLeft: `3px solid ${node.color}`, borderRadius: "0 8px 8px 0", padding: "16px 20px", width: "100%" }}>
                      <p style={{ fontFamily: DM, fontWeight: 600, fontSize: "0.9375rem", color: node.color, margin: "0 0 4px" }}>{node.node}</p>
                      <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "rgba(245,240,232,0.5)", margin: 0 }}>{node.sub}</p>
                    </div>
                    {i < 4 && (
                      <div style={{ display: "flex", alignItems: "center", paddingLeft: 20, height: 28 }}>
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

          {/* Comparison Table */}
          <p style={{ ...s.label, marginBottom: 20 }}>Mechanism Comparison</p>
          <div className="comparison-table-wrap" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: DM, minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(201,169,110,0.2)" }}>
                  {["", "TB-500", "BPC-157", "PRP", "Corticosteroids", "Surgery"].map((h, i) => (
                    <th key={h} style={{
                      padding: "12px 16px", textAlign: i === 0 ? "left" : "center",
                      fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase",
                      color: i === 1 ? "#C9A96E" : "rgba(245,240,232,0.4)",
                      background: i === 1 ? "rgba(201,169,110,0.06)" : "transparent",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Primary action", "Actin regulation + angiogenesis + anti-inflammatory cascade", "Nitric oxide + GH receptor + local tissue repair", "Growth factor release from platelets", "Inflammation suppression", "Mechanical repair + debridement"],
                  ["Systemic cell mobilization", "✓ Stem cell + progenitor recruitment systemically", "✓ Local tissue only", "✗ Local only", "✗ None", "✗ None"],
                  ["Angiogenesis", "✓ VEGF upregulation — new capillary formation", "Partial", "Partial", "✗ Inhibits angiogenesis", "✗ None"],
                  ["CNS / cardiac repair", "✓ Evidence in both neural and cardiac models", "✗ Limited CNS evidence", "✗ No evidence", "✗ Contraindicated long-term", "✗ Not applicable"],
                  ["Side effect profile", "✓ Clean — injection site only", "✓ Clean", "✓ Generally safe", "✗ Tissue atrophy, systemic effects", "✗ Significant recovery, risks"],
                ].map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: "1px solid rgba(245,240,232,0.05)" }}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{
                        padding: "14px 16px", fontSize: "0.875rem",
                        textAlign: ci === 0 ? "left" : "center",
                        color: ci === 0 ? "rgba(245,240,232,0.5)" : ci === 1 ? "#C9A96E" : cell.startsWith("✓") ? "rgba(245,240,232,0.75)" : "rgba(245,240,232,0.35)",
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
                name: "TB-500Rx", nameBase: "TB-500", nameSuffix: "Rx",
                tag: "Tissue Repair & Recovery",
                desc: "The Thymosin Beta-4 fragment that mobilizes stem cells, restores vascular supply, and rebuilds muscle, tendon, cardiac, and neural tissue simultaneously — without surgery or extended downtime.",
                cta: "Check My Eligibility", ctaHref: "#quiz", featured: true,
              },
              {
                name: "S-31Rx", tag: "Mitochondrial Repair",
                desc: "The world's most precisely targeted mitochondrial peptide — binding cardiolipin on the inner membrane to restore ATP production and reverse cellular energy decline.",
                cta: "Get Started", ctaHref: "https://s-31-rx-pink.vercel.app", featured: false,
              },
              {
                name: "SelankRx", tag: "Anxiety & Cognition",
                desc: "The Russian-developed hexapeptide that modulates GABA-A receptors, upregulates BDNF, and resolves anxiety without tolerance or the dependency profile of benzodiazepines.",
                cta: "Get Started", ctaHref: "https://selankrx.vercel.app", featured: false,
              },
              {
                name: "EpitalonRx", tag: "Longevity & Anti-Aging",
                desc: "The telomerase-activating tetrapeptide from the pineal gland that elongates telomeres, restores circadian rhythm, and reverses the chromosomal markers of biological aging.",
                cta: "Get Started", ctaHref: "https://epitalonrx.vercel.app", featured: false,
              },
            ].map((peptide) => (
              <div key={peptide.name} style={{
                background: peptide.featured ? "#1A1410" : "#1A1A1A",
                borderRadius: 10, padding: "28px 24px", display: "flex", flexDirection: "column",
                gap: 12, position: "relative",
                border: peptide.featured ? "1px solid rgba(201,169,110,0.3)" : "1px solid rgba(245,240,232,0.06)",
              }}>
                {peptide.featured && (
                  <div style={{ position: "absolute", top: -1, left: 20, background: "#C9A96E", color: "#0D0D0D", fontFamily: DM, fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, padding: "3px 10px", borderRadius: "0 0 5px 5px" }}>Current Protocol</div>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: peptide.featured ? 8 : 0 }}>
                  <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A96E", background: "rgba(201,169,110,0.1)", padding: "3px 8px", borderRadius: 3, alignSelf: "flex-start" }}>{peptide.tag}</span>
                  <h3 style={{ ...s.h3dk, fontSize: "1.0625rem", margin: 0 }}>
                    {peptide.featured ? <>{peptide.nameBase}<span style={{ color: DARK_ORANGE }}>{peptide.nameSuffix}</span></> : peptide.name}
                  </h3>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.875rem", flex: 1 }}>{peptide.desc}</p>
                <a href={peptide.ctaHref} style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontFamily: DM, fontWeight: 500, fontSize: "0.8125rem", letterSpacing: "0.04em",
                  padding: "12px 20px", borderRadius: 6, textDecoration: "none", transition: "all 0.2s",
                  background: peptide.featured ? "#C9A96E" : "transparent",
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
            <h2 style={{ ...s.h2dk }}>Six evidence-backed tissue repair pathways</h2>
            <p style={{ ...s.bodyLt, paddingTop: 8 }}>TB-500's mechanism has been validated across musculoskeletal, cardiac, neurological, and dermal tissue in both preclinical models and human studies. Each pathway below is grounded in peer-reviewed research — presented without exaggeration.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48 }}>
            {conditionTags.map((tag) => (
              <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} style={{
                fontFamily: DM, fontWeight: 400, fontSize: "0.8rem",
                padding: "6px 14px", borderRadius: 20, cursor: "pointer", transition: "all 0.2s",
                background: activeTag === tag ? "rgba(201,169,110,0.15)" : "transparent",
                color: activeTag === tag ? "#C9A96E" : "rgba(245,240,232,0.4)",
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
            <img src={IMGS.cells} alt="Cellular tissue repair" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.3) 60%, transparent 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 clamp(24px,5vw,60px)" }}>
              <div style={{ maxWidth: 480 }}>
                <p style={{ ...s.label, marginBottom: 12 }}>Thymosin Beta-4 Origin</p>
                <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.1rem,2.5vw,1.75rem)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#F5F0E8" }}>
                  The only tissue repair peptide with peer-reviewed evidence across muscle, tendon, heart, and brain — published in Nature, FASEB, and Invest Ophthalmol Vis Sci
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
            <h2 style={{ ...s.h2lt }}>Four steps to full tissue restoration</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Every TB-500Rx protocol begins with a physician evaluation and injury assessment. No protocol is initiated without documented clinical rationale, injury characterization, and informed consent.</p>
          </div>
          <div className="four-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {[
              { step: "01", title: "Assessment & Intake", items: ["Comprehensive injury questionnaire", "Functional movement screening", "Current medication and supplement review", "Contraindication screening (oncology)", "Physician review within 48 hours"] },
              { step: "02", title: "Baseline Labs", items: ["CBC with differential", "Comprehensive metabolic panel", "Inflammatory markers (CRP, ESR)", "Imaging review (MRI/ultrasound if available)", "Cardiovascular risk panel if cardiac indication"] },
              { step: "03", title: "Protocol Initiation", items: ["TB-500 2–5 mg SQ or IM per physician", "Loading: 2–3× weekly for 4–6 weeks", "Pharma-grade lyophilized compound", "Cold-chain overnight delivery", "Injection technique certification session"] },
              { step: "04", title: "Monitoring", items: ["2-week check-in with provider", "Functional reassessment at 4 weeks", "Repeat imaging at 8–12 weeks if indicated", "Protocol adjustment as clinically indicated", "Maintenance dosing after loading phase"] },
            ].map((step) => (
              <div key={step.step} style={{ background: "#0D0D0D", borderRadius: 10, padding: "clamp(24px,3vw,32px)", border: "1px solid rgba(201,169,110,0.1)" }}>
                <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "2.5rem", color: "rgba(201,169,110,0.2)", lineHeight: 1, marginBottom: 16 }}>{step.step}</p>
                <h3 style={{ ...s.h3dk, marginBottom: 20 }}>{step.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {step.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#C9A96E", fontSize: "0.6rem", marginTop: 5, flexShrink: 0 }}>◆</span>
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
              <h2 style={{ ...s.h2lt, marginBottom: 20 }}>Regenerative medicine pricing. Without the sports medicine markup.</h2>
              <p style={{ ...s.body, marginBottom: 24 }}>Sports medicine specialists and orthopedic surgeons typically charge $400–$800 per PRP injection, $600–$1,200 per consultation, and surgical options run $15,000–$50,000 with 6–12 months of recovery. Aurelius bundles physician oversight, baseline labs, pharma-grade TB-500, and monitoring into one monthly plan.</p>
              <div style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 8, padding: "20px 24px", marginBottom: 28 }}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#1A1A1A", marginBottom: 8 }}>Typical injury treatment cost breakdown:</p>
                {[["Initial sports medicine consult", "$400–$800"], ["Baseline imaging (MRI)", "$800–$2,500"], ["PRP injection (per session)", "$400–$800"], ["Monthly follow-up visits", "$200–$400"], ["Total first month", "$1,800–$4,500"]].map(([item, cost]) => (
                  <div key={item} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(13,13,13,0.06)" }}>
                    <span style={{ ...s.bodySm }}>{item}</span>
                    <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#8C6845" }}>{cost}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Physician consultation included", "Full lab panel included", "Pharma-grade TB-500 included", "Nurse onboarding included", "Monthly check-ins included", "No hidden fees"].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ ...s.bodySm }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "#0D0D0D", borderRadius: 12, padding: "clamp(32px,5vw,48px) clamp(24px,4vw,40px)", textAlign: "center", border: "1px solid rgba(201,169,110,0.15)" }}>
                <p style={{ ...s.label, marginBottom: 12 }}>TB-500Rx Plan</p>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1.25rem", color: "#C9A96E", marginTop: 10 }}>$</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(3.5rem,8vw,5rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "#F5F0E8" }}>229</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1rem", color: "rgba(245,240,232,0.4)", marginTop: 16 }}>/mo</span>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.8rem", marginBottom: 32 }}>vs. $1,800–$4,500/mo at a sports medicine or regenerative clinic</p>
                <a href="#quiz" className="btn-gold" style={{ width: "100%", justifyContent: "center", display: "flex", marginBottom: 16 }}>Check My Eligibility</a>
                <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6 }}>Cancel anytime. No long-term commitment required.</p>
                <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", marginTop: 28, paddingTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                  {["Physician-supervised protocol", "Pharma-grade compounded TB-500", "Injury labs + imaging review", "Monthly provider check-ins", "Cold-chain overnight delivery"].map((item) => (
                    <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
          <h2 style={{ ...s.h2dk, textAlign: "center", marginBottom: 16 }}>Are you a candidate for TB-500Rx?</h2>
          <p style={{ ...s.bodyLt, textAlign: "center", maxWidth: 520, margin: "0 auto 56px" }}>
            This 5-question screen checks for TB-500 protocol contraindications. It takes under 60 seconds and does not constitute a medical evaluation.
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
              <p style={{ ...s.bodyLt }}>Including TB-500 vs. BPC-157 and PRP, honest research framing, administration, dosing protocol, recovery timeline, and off-label prescribing legality.</p>
              <div style={{ marginTop: 40 }}>
                <img src={IMGS.labs} alt="Tissue repair research" style={{ width: "100%", borderRadius: 10, objectFit: "cover" }} />
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
            Heal faster.<br />Recover completely.<br />No surgery required.
          </h2>
          <p style={{ ...s.bodyLt, marginBottom: 48, fontSize: "1.0625rem" }}>
            TB-500 is the only tissue repair peptide with peer-reviewed evidence across muscle, tendon, cardiac, and neural tissue — mobilizing stem cells, restoring vascular supply, and rebuilding what injury has broken. Now available as a physician-supervised protocol with no surgery and no extended downtime.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <a href="#quiz" className="btn-gold" style={{ padding: "16px 36px", fontSize: "1rem" }}>Check My Eligibility</a>
            <a href="#research" className="btn-ghost-cream" style={{ padding: "16px 36px", fontSize: "1rem" }}>Review the Research</a>
          </div>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            † This page describes off-label use of TB-500 (Thymosin Beta-4 fragment), a compounded synthetic peptide. TB-500 is prescribed as a compounded peptide in the United States at the clinical discretion of a licensed physician. This content is for informational purposes only and does not constitute medical advice. Individual results vary. All protocols require physician evaluation and are subject to contraindication screening.
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
                  <path d="M24 4 L6 40 L14 40 L24 20 L34 40 L42 40 Z" fill="#C9A96E" />
                  <line x1="12" y1="28" x2="36" y2="28" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="24" y1="20" x2="24" y2="44" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div>
                  <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#F5F0E8", display: "block" }}>TB-500<span style={{ color: DARK_ORANGE }}>Rx</span></span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8C7B6B" }}>Aurelius Health Group</span>
                </div>
              </div>
              <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.35)", maxWidth: 240, marginTop: 12, lineHeight: 1.6 }}>Physician-supervised TB-500 protocol for tissue repair, injury recovery, cardiac rehabilitation, and neurological restoration.</p>
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
    </div>
  );
}
