import { useState } from "react";

// Pas 10 — Tailwind CSS și design tokens.
// De ce: Stilurile „de mână" dau impresia că inventezi culori și spații la fiecare pas.
// Tailwind oferă un sistem de design (culori, spații, raze) definit într-un loc,
// și le accesezi prin utilitare în markup. Varianta hardcodată rămâne albă în dark mode,
// pentru că are valori fixe. Varianta Tailwind se adaptează automat.
// Beneficiul real nu e „mai puțin cod", ci: vezi stilul lângă structură,
// valorile vin din set fix → UI consecvent, și tema funcționează singur.

export function TailwindSetup() {
  const [variant, setVariant] = useState<"hardcoded" | "tailwind">("hardcoded");
  const [isDark, setIsDark] = useState(false);

  // Atunci când îi clici pe button, schimb clasa .dark pe <html>.
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  // Card cu stiluri hardcodate — culori fixe, fără variabile CSS.
  // Rămâne albă în dark mode pentru că #fafafa și #171717 sunt literale.
  const CardHardcoded = () => (
    <div
      style={{
        backgroundColor: "#fafafa",
        border: "1px solid #e5e4e7",
        borderRadius: "8px",
        padding: "24px",
        color: "#6b6375"
      }}
    >
      <h3 style={{ color: "#08060d", marginTop: 0, marginBottom: "12px", fontSize: "18px" }}>Card Hardcoded</h3>
      <p style={{ marginBottom: "16px" }}>
        Stiluri scrise direct cu valori fixe. În dark mode, rămâne albă și ilegibilă.
      </p>
      <button
        style={{
          backgroundColor: "#aa3bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "8px 16px",
          cursor: "pointer",
          fontSize: "14px"
        }}
      >
        Click me
      </button>
    </div>
  );

  // Card cu utilitare Tailwind — culori din variabile CSS.
  // Se adaptează automat la dark mode pentru că valorile vin din :root / .dark.
  const CardTailwind = () => (
    <div className="bg-card text-muted-foreground rounded-lg border border-[var(--color-border)] p-6">
      <h3 className="text-text-heading mt-0 mb-3 text-lg">Card Tailwind</h3>
      <p className="mb-4">Stiluri prin utilitare Tailwind. Culori din variabile CSS care se schimbă în dark mode.</p>
      <button className="bg-primary cursor-pointer rounded px-4 py-2 text-sm text-white transition-opacity hover:opacity-90">
        Click me
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Controale */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-2 block text-sm">Varianta:</label>
          <div className="flex gap-2">
            <button
              onClick={() => setVariant("hardcoded")}
              className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
                variant === "hardcoded" ? "bg-primary text-white" : "bg-border text-text"
              }`}
            >
              Hardcoded
            </button>
            <button
              onClick={() => setVariant("tailwind")}
              className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
                variant === "tailwind" ? "bg-primary text-white" : "bg-border text-text"
              }`}
            >
              Tailwind
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm">Temă:</label>
          <button
            onClick={toggleTheme}
            className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
              isDark ? "bg-primary text-white" : "bg-border text-text"
            }`}
          >
            {isDark ? "🌙 Dark" : "☀️ Light"}
          </button>
          <p className="text-muted-foreground mt-2 text-xs">
            Tema se aplică prin clasa <code className="bg-code-bg rounded px-1">.dark</code> pe{" "}
            <code className="bg-code-bg rounded px-1">&lt;html&gt;</code>
          </p>
        </div>
      </div>

      {/* Demo */}
      <div className="border-border bg-card rounded-lg border p-4">
        {variant === "hardcoded" ? <CardHardcoded /> : <CardTailwind />}
      </div>

      {/* Explicație */}
      <div className="bg-accent-bg border-accent-border text-text rounded-lg border p-4">
        <p className="text-sm">
          <strong>Observă diferența:</strong> Schimbă tema la dark. Card-ul hardcoded rămâne alb și ilegibil (culori
          fixe). Card-ul Tailwind se adaptează automat (culori din variabile CSS care se schimbă în{" "}
          <code className="bg-code-bg rounded px-1">.dark</code>).
        </p>
        <div className="mt-2 text-sm">
          <strong>De ce Tailwind:</strong> Nu e vorba de „mai puțin cod", ci că:
          <ul className="mt-2 ml-4 list-disc text-sm">
            <li>Stilul e lângă structură, nu în fișier paralel</li>
            <li>Valorile vin dintr-un set fix (spacing, culori, radius)</li>
            <li>Tema funcționează singură dacă variabilele CSS sunt corecte</li>
            <li>Prettier sortează clasele canonic</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
