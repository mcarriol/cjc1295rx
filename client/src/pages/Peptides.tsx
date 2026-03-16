/* Peptides — Aurelius Health Group Discover Peptides Page
   Typography System (DM Sans — geometric sans-serif):
   ─────────────────────────────────────────────────────
   H1 / Hero:   weight 300, tight tracking -0.03em, generous leading
   H2:          weight 300, tracking -0.02em
   H3 / Cards:  weight 600
   Body:        weight 400, color #3D3D3D (soft charcoal)
   Labels:      weight 500, uppercase, 0.1em tracking, gold
   ─────────────────────────────────────────────────────
*/
import { useState } from "react";
import Navbar from "@/components/Navbar";

const DM = "'DM Sans', system-ui, sans-serif";

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
};

/* ── All peptides from the CSV ── */
const peptides = [
  {
    name: "BPC-157",
    tag: "Tissue Repair",
    category: "Recovery",
    desc: "A gastric pentadecapeptide that accelerates healing of tendons, ligaments, muscles, and gut mucosa. Activates growth hormone receptors and promotes angiogenesis at injury sites. Widely studied for its systemic regenerative properties.",
    highlights: ["Tendon & ligament repair", "Gut mucosal healing", "Angiogenesis promotion", "Anti-inflammatory"],
    href: "https://aureliushealthgroup.com/bpc157",
  },
  {
    name: "Thymosin Alpha-1",
    tag: "Immune Modulation",
    category: "Immunity",
    desc: "A naturally occurring peptide derived from the thymus gland that modulates innate and adaptive immune responses. Used clinically in over 35 countries for immune deficiency, chronic infections, and cancer adjunct therapy.",
    highlights: ["T-cell activation", "Innate immune support", "Antiviral properties", "Anti-inflammatory"],
    href: "https://aureliushealthgroup.com/thymosinalpha1",
  },
  {
    name: "AOD-9604",
    tag: "Fat Metabolism",
    category: "Body Composition",
    desc: "A modified fragment of human growth hormone (hGH 176–191) that stimulates lipolysis and inhibits lipogenesis without the side effects of full hGH. Targets adipose tissue directly for fat reduction.",
    highlights: ["Lipolysis stimulation", "Lipogenesis inhibition", "No insulin resistance", "Cartilage repair"],
    href: "https://aureliushealthgroup.com/AOD9604",
  },
  {
    name: "CJC-1295",
    tag: "GH Axis",
    category: "Growth Hormone",
    desc: "A synthetic analogue of growth hormone-releasing hormone (GHRH) with an extended half-life due to drug affinity complex (DAC) technology. Produces sustained elevation of GH and IGF-1 levels over days.",
    highlights: ["Sustained GH elevation", "IGF-1 increase", "Muscle mass support", "Fat reduction"],
    href: "https://aureliushealthgroup.com/CJC1295",
  },
  {
    name: "Epitalon",
    tag: "Longevity",
    category: "Anti-Aging",
    desc: "A tetrapeptide derived from the pineal gland that activates telomerase and elongates telomeres — the protective caps on chromosomes that shorten with age. Studied for its anti-aging and circadian rhythm-regulating properties.",
    highlights: ["Telomerase activation", "Telomere elongation", "Circadian regulation", "Antioxidant effects"],
    href: "https://aureliushealthgroup.com/Epitalon",
  },
  {
    name: "Semax",
    tag: "Cognitive Enhancement",
    category: "Nootropic",
    desc: "A synthetic analogue of ACTH (4–7) developed in Russia that upregulates BDNF and NGF expression in the brain. Clinically used for stroke recovery, cognitive decline, and neuroprotection.",
    highlights: ["BDNF upregulation", "Neuroprotection", "Focus & memory", "Anxiety reduction"],
    href: "https://aureliushealthgroup.com/semax",
  },
  {
    name: "Kisspeptin-10",
    tag: "Hormonal Health",
    category: "Endocrine",
    desc: "A neuropeptide that acts as a master regulator of the hypothalamic-pituitary-gonadal (HPG) axis, stimulating LH and FSH release. Used to restore hormonal balance and support reproductive health.",
    highlights: ["LH & FSH stimulation", "Testosterone support", "HPG axis regulation", "Fertility support"],
    href: "https://aureliushealthgroup.com/kisspeptin10",
  },
  {
    name: "SS-31",
    tag: "Mitochondrial Protection",
    category: "Cellular Health",
    desc: "A mitochondria-targeted antioxidant peptide (Szeto-Schiller 31) that selectively concentrates in the inner mitochondrial membrane, reducing oxidative stress and preserving ATP synthesis. Studied in heart failure and aging.",
    highlights: ["Mitochondrial targeting", "ROS reduction", "ATP preservation", "Cardioprotection"],
    href: "https://aureliushealthgroup.com/ss31",
  },
  {
    name: "Tesamorelin",
    tag: "Visceral Fat",
    category: "Metabolic",
    desc: "An FDA-studied GHRH analogue with Phase 3 RCT data demonstrating significant reduction in visceral adipose tissue. The only peptide with robust human clinical trial evidence for abdominal fat reduction.",
    highlights: ["Visceral fat reduction", "Phase 3 RCT data", "IGF-1 normalization", "Metabolic improvement"],
    href: "https://aureliushealthgroup.com/tesamorelin",
  },
  {
    name: "Cerebrolysin",
    tag: "Neuroprotection",
    category: "Cognitive",
    desc: "A porcine brain-derived peptide preparation containing low molecular weight neuropeptides that mimic BDNF and NGF. Supported by Phase 3 RCT data for Alzheimer's disease and cognitive decline.",
    highlights: ["BDNF / NGF mimicry", "Neuroplasticity", "Phase 3 RCT data", "Amyloid reduction"],
    href: "https://aureliushealthgroup.com/cerebrolysin",
  },
  {
    name: "Argireline",
    tag: "Skin & Aesthetics",
    category: "Aesthetics",
    desc: "A hexapeptide (Acetyl Hexapeptide-3) that inhibits neurotransmitter release at the neuromuscular junction, reducing the appearance of expression lines. A topical alternative to botulinum toxin.",
    highlights: ["Expression line reduction", "Neurotransmitter inhibition", "Topical application", "Collagen support"],
    href: "https://aureliushealthgroup.com/argireline",
  },
  {
    name: "Ipamorelin",
    tag: "GH Secretion",
    category: "Growth Hormone",
    desc: "A selective growth hormone secretagogue that stimulates your pituitary's own GH pulse without cortisol or ACTH elevation. Supports body composition, recovery, sleep quality, and metabolic health.",
    highlights: ["Selective GH release", "No cortisol elevation", "Sleep quality", "Body composition"],
    href: "https://aureliushealthgroup.com/ipamorelin",
  },
  {
    name: "Melanotan",
    tag: "Skin Pigmentation",
    category: "Aesthetics",
    desc: "A synthetic analogue of alpha-melanocyte-stimulating hormone (α-MSH) that stimulates melanogenesis, producing a natural tan without UV exposure. Also studied for its effects on libido and appetite.",
    highlights: ["Melanogenesis stimulation", "UV-independent tanning", "Libido support", "Appetite modulation"],
    href: "https://aureliushealthgroup.com/melanotan",
  },
  {
    name: "Selank",
    tag: "Anxiolytic",
    category: "Nootropic",
    desc: "A synthetic analogue of the endogenous immunomodulatory peptide tuftsin, developed in Russia for anxiety and cognitive enhancement. Modulates GABA, serotonin, and dopamine systems without sedation or dependence.",
    highlights: ["Anxiety reduction", "GABA modulation", "Cognitive clarity", "Non-sedating"],
    href: "https://aureliushealthgroup.com/selank",
  },
  {
    name: "TB-500",
    tag: "Tissue Regeneration",
    category: "Recovery",
    desc: "A synthetic version of Thymosin Beta-4, a naturally occurring peptide that promotes actin polymerization, cell migration, and tissue repair. Widely used for injury recovery, wound healing, and inflammation reduction.",
    highlights: ["Actin polymerization", "Cell migration", "Wound healing", "Anti-inflammatory"],
    href: "https://aureliushealthgroup.com/tb500",
  },
  {
    name: "MOTS-c",
    tag: "Mitochondrial Health",
    category: "Longevity",
    desc: "The first peptide encoded in mitochondrial DNA, discovered at USC in 2015. Activates AMPK — the master metabolic switch — restoring cellular energy, insulin sensitivity, and longevity signaling from the source.",
    highlights: ["AMPK activation", "Mitochondrial biogenesis", "Insulin sensitivity", "Longevity signaling"],
    href: "https://aureliushealthgroup.com/mitochondrial",
  },
];

/* ── Category filter options ── */
const categories = ["All", "Recovery", "Immunity", "Body Composition", "Growth Hormone", "Anti-Aging", "Nootropic", "Endocrine", "Cellular Health", "Metabolic", "Cognitive", "Aesthetics", "Longevity"];

export default function Peptides() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? peptides
    : peptides.filter((p) => p.category === activeCategory);

  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh" }}>
      <Navbar productName="TB-500Rx" />

      {/* ══ HERO ══ */}
      <section style={{
        background: "#0D0D0D",
        padding: "clamp(120px,15vw,180px) 0 clamp(60px,8vw,100px)",
        borderBottom: "1px solid rgba(201,169,110,0.1)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
              <span style={{ ...s.label, color: "rgba(201,169,110,0.6)" }}>Aurelius Health Group</span>
            </a>
            <span style={{ color: "rgba(201,169,110,0.3)", fontSize: "0.75rem" }}>›</span>
            <span style={{ ...s.label, color: "#C9A96E" }}>Discover Peptides</span>
          </div>
          <div className="peptides-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end" }}>
            <div>
              <h1 style={{ ...s.h1, marginBottom: 24 }}>
                Physician-supervised<br />
                peptide protocols.
              </h1>
              <p style={{ ...s.bodyLt, fontSize: "1.0625rem", maxWidth: 480, marginBottom: 40 }}>
                Every protocol in the Aurelius library is built around peer-reviewed evidence, pharma-grade compounds, and measurable outcomes — supervised by licensed physicians from intake to results.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="#peptides" className="btn-gold" style={{ padding: "14px 32px", fontSize: "0.9375rem" }}>
                  Browse Protocols
                </a>
                <a href="/" className="btn-ghost-cream" style={{ padding: "14px 32px", fontSize: "0.9375rem" }}>
                  Back to TB-500Rx
                </a>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { n: "16", label: "Peptide Protocols" },
                { n: "8+", label: "Clinical Categories" },
                { n: "100%", label: "Physician-Supervised" },
                { n: "48h", label: "Avg. Consultation" },
              ].map((stat) => (
                <div key={stat.label} style={{
                  background: "rgba(245,240,232,0.03)",
                  border: "1px solid rgba(201,169,110,0.12)",
                  borderRadius: 10,
                  padding: "24px 20px",
                }}>
                  <div style={{
                    fontFamily: DM, fontWeight: 300,
                    fontSize: "clamp(1.75rem,3vw,2.5rem)",
                    lineHeight: 1, letterSpacing: "-0.03em",
                    color: "#C9A96E", marginBottom: 8,
                  }}>{stat.n}</div>
                  <div style={{ ...s.label, color: "rgba(245,240,232,0.45)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PEPTIDE GRID ══ */}
      <section id="peptides" style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>

          {/* Category filter bar */}
          <div style={{ marginBottom: 48, overflowX: "auto", paddingBottom: 8 }}>
            <div style={{ display: "flex", gap: 8, minWidth: "max-content" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: DM, fontWeight: 500, fontSize: "0.8rem",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    padding: "9px 18px", borderRadius: 6, cursor: "pointer",
                    border: activeCategory === cat
                      ? "1.5px solid #C9A96E"
                      : "1.5px solid rgba(245,240,232,0.12)",
                    background: activeCategory === cat
                      ? "rgba(201,169,110,0.12)"
                      : "transparent",
                    color: activeCategory === cat
                      ? "#C9A96E"
                      : "rgba(245,240,232,0.45)",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p style={{ ...s.label, color: "rgba(245,240,232,0.3)", marginBottom: 32 }}>
            {filtered.length} {filtered.length === 1 ? "Protocol" : "Protocols"}{activeCategory !== "All" ? ` · ${activeCategory}` : ""}
          </p>

          {/* Cards grid */}
          <div className="peptides-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {filtered.map((peptide) => (
              <div
                key={peptide.name}
                className="peptide-card"
                style={{
                  background: "rgba(245,240,232,0.02)",
                  border: "1px solid rgba(201,169,110,0.1)",
                  borderRadius: 12,
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  transition: "border-color 0.25s, background 0.25s, transform 0.25s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,169,110,0.35)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(245,240,232,0.04)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,169,110,0.1)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(245,240,232,0.02)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <h3 style={{ ...s.h3dk, fontSize: "1.125rem", margin: 0, marginBottom: 4 }}>{peptide.name}</h3>
                    <span style={{ ...s.label, color: "rgba(245,240,232,0.3)", fontSize: "0.62rem" }}>{peptide.category}</span>
                  </div>
                  <span style={{
                    fontFamily: DM, fontWeight: 500, fontSize: "0.62rem",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#C9A96E",
                    background: "rgba(201,169,110,0.08)",
                    border: "1px solid rgba(201,169,110,0.2)",
                    borderRadius: 4, padding: "5px 10px",
                    whiteSpace: "nowrap", flexShrink: 0,
                  }}>{peptide.tag}</span>
                </div>

                {/* Description */}
                <p style={{ ...s.bodyLt, fontSize: "0.875rem", margin: 0, flex: 1 }}>{peptide.desc}</p>

                {/* Highlights */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {peptide.highlights.map((h) => (
                    <span key={h} style={{
                      fontFamily: DM, fontWeight: 400, fontSize: "0.72rem",
                      color: "rgba(245,240,232,0.45)",
                      background: "rgba(245,240,232,0.04)",
                      border: "1px solid rgba(245,240,232,0.08)",
                      borderRadius: 4, padding: "4px 10px",
                    }}>{h}</span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={peptide.href}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: DM, fontWeight: 500, fontSize: "0.875rem",
                    letterSpacing: "0.04em", textDecoration: "none",
                    padding: "13px 20px", borderRadius: 6,
                    background: "#C9A96E", color: "#0D0D0D",
                    transition: "background 0.2s",
                    marginTop: "auto",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#B8956A")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#C9A96E")}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STANDARDS STRIP ══ */}
      <section style={{ background: "rgba(201,169,110,0.06)", borderTop: "1px solid rgba(201,169,110,0.12)", borderBottom: "1px solid rgba(201,169,110,0.12)", padding: "clamp(40px,6vw,64px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <div className="standards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40 }}>
            {[
              { icon: "◎", title: "Physician-Supervised", desc: "Every protocol reviewed and prescribed by a licensed provider before dispensing." },
              { icon: "⊕", title: "Pharma-Grade Compounds", desc: "Sourced from licensed compounding pharmacies with Certificates of Analysis." },
              { icon: "◷", title: "Cold-Chain Shipping", desc: "Temperature-controlled packaging with overnight delivery to preserve potency." },
              { icon: "✓", title: "Evidence-Based Only", desc: "Every peptide in our library is backed by peer-reviewed published research." },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  border: "1px solid rgba(201,169,110,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#C9A96E", fontSize: "1rem", flexShrink: 0,
                }}>{item.icon}</div>
                <h3 style={{ ...s.h3dk, fontSize: "0.9375rem", margin: 0 }}>{item.title}</h3>
                <p style={{ ...s.bodyLt, fontSize: "0.8125rem", margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CLOSING CTA ══ */}
      <section style={{ background: "#0D0D0D", padding: "clamp(80px,10vw,120px) 0", textAlign: "center", borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 20 }}>Aurelius Health Group</p>
          <h2 style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.8rem,4vw,3rem)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#F5F0E8", marginBottom: 20 }}>
            Not sure which protocol is right for you?
          </h2>
          <p style={{ ...s.bodyLt, marginBottom: 40, fontSize: "1rem" }}>
            Our physicians review your intake, labs, and goals to design a personalized protocol. Start with a 3-minute eligibility screen.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/" className="btn-gold" style={{ padding: "14px 36px", fontSize: "0.9375rem" }}>
              Check Eligibility
            </a>
            <a href="/" className="btn-ghost-cream" style={{ padding: "14px 36px", fontSize: "0.9375rem" }}>
              Back to TB-500Rx
            </a>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(245,240,232,0.06)", padding: "clamp(40px,6vw,64px) 0 clamp(24px,4vw,40px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4 L6 40 L14 40 L24 20 L34 40 L42 40 Z" fill="#C9A96E" />
                  <line x1="12" y1="28" x2="36" y2="28" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="24" y1="20" x2="24" y2="44" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div style={{ lineHeight: 1 }}>
                  <span style={{ display: "block", fontFamily: DM, fontWeight: 600, fontSize: "0.875rem", letterSpacing: "0.1em", color: "#F5F0E8", textTransform: "uppercase" }}>Aurelius Health Group</span>
                  <span style={{ display: "block", fontFamily: DM, fontWeight: 300, fontSize: "0.5625rem", letterSpacing: "0.12em", color: "#8C7B6B", textTransform: "uppercase", marginTop: 2 }}>Physician-Supervised Peptide Protocols</span>
                </div>
              </div>
              <p style={{ ...s.bodyLt, fontSize: "0.8125rem", maxWidth: 280 }}>
                Evidence-based peptide protocols supervised by licensed physicians. Pharma-grade compounds, cold-chain delivery, measurable outcomes.
              </p>
            </div>
            {[
              { heading: "Protocols", links: ["MOTS-c", "Ipamorelin", "Tesamorelin", "Cerebrolysin", "BPC-157"] },
              { heading: "Company", links: ["About Aurelius", "Our Physicians", "All Treatments", "Blog"] },
              { heading: "Legal", links: ["Privacy Policy", "Terms of Service", "Medical Disclaimer", "HIPAA Notice"] },
            ].map((col) => (
              <div key={col.heading}>
                <p style={{ ...s.label, marginBottom: 16 }}>{col.heading}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.8)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.45)")}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", margin: 0 }}>
              © 2025 Aurelius Health Group. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {["Privacy Policy", "Terms of Service", "Medical Disclaimer"].map((link) => (
                <a key={link} href="#" style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", textDecoration: "none" }}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ══ RESPONSIVE STYLES ══ */}
      <style>{`
        /* Tablet */
        @media (max-width: 1024px) {
          .peptides-grid { grid-template-columns: repeat(2,1fr) !important; }
          .standards-grid { grid-template-columns: repeat(2,1fr) !important; gap: 28px !important; }
        }
        @media (max-width: 900px) {
          .peptides-hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        /* Mobile */
        @media (max-width: 640px) {
          .peptides-grid { grid-template-columns: 1fr !important; }
          .standards-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .peptides-hero-grid > div:last-child { grid-template-columns: 1fr 1fr !important; }
        }
        /* Touch targets */
        @media (max-width: 768px) {
          .btn-gold, .btn-ghost-cream { min-height: 48px; }
        }
      `}</style>
    </div>
  );
}
