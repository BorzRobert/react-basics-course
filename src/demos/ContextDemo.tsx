// Pas 13 — React Context API.
// De ce: o valoare stă într-un singur loc și e citită direct de oricine are nevoie,
// oriunde în arbore, fără a o pasa manual prin fiecare nivel intermediar (prop drilling).
// Context = stare partajată; hook-uri custom = logică reutilizabilă cu instanțe separate.
// Rețeta are 5 pași: crezi contextul, provider-ul, hook-ul de consum, wrapping-ul, utilizarea.

import { useCounter } from "@/hooks/useCounter";
import { useActiveStep } from "@/context/ActiveStepProvider";

// Component simplu pentru a arăta codul într-o cutie.
function CodeBlock({ code, title }: { code: string; title: string }) {
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "1rem",
        marginBottom: "1rem",
        overflow: "auto"
      }}
    >
      <h4 style={{ marginTop: 0, marginBottom: "0.5rem", color: "#333" }}>{title}</h4>
      <pre
        style={{
          margin: 0,
          fontSize: "0.85rem",
          lineHeight: 1.5,
          color: "#333",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word"
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function ContextDemo() {
  // ============================================================================
  // DOVADA 1: Citim activeId din context, FĂRĂ niciun prop.
  // ============================================================================
  // useActiveStep() mă lasă să citesc valoarea direct, indiferent de cât de adânc
  // sunt în arbore. E chiar contexul în care trăiește aplicația — nu-i inventat.
  const { activeId, setActiveId, steps } = useActiveStep();

  // ============================================================================
  // COMPARAȚIE: LOCAL = logică reutilizabilă cu instanțe separate (Pas 12).
  // ============================================================================
  // Fiecare apel al useCounter() are starea lui. `counter1` și `counter2` sunt
  // complet independenți — modificarea unuia nu-l afectează pe celălalt.
  const counter1 = useCounter(0, 1);
  const counter2 = useCounter(0, 1);

  return (
    <div style={{ padding: "1rem" }}>
      {/* DOVADA: Activul din context apare aici, și se schimbă când dai click în meniu */}
      <p style={{ backgroundColor: "#e3f2fd", padding: "0.75rem", borderRadius: "4px" }}>
        <strong>Dovada live:</strong> Pasul activ din context e <strong>{activeId}</strong> (citit cu{" "}
        <code>useActiveStep()</code>, fără niciun prop). Schimbă-l din meniu și vei vedea că se actualizează aici.
      </p>

      {/* SEPARATOR */}
      <hr style={{ margin: "2rem 0" }} />

      {/* DOUĂ COLOANE: GLOBAL vs LOCAL */}
      <h3>Comparație: Stare partajată (GLOBAL) vs Logică reutilizabilă (LOCAL)</h3>

      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
        {/* COLOANA 1: GLOBAL — useContext, o singură sursă pentru toți */}
        <div style={{ flex: 1, border: "2px solid #4caf50", padding: "1rem", borderRadius: "4px" }}>
          <h4 style={{ marginTop: 0, color: "#2e7d32" }}>GLOBAL (Context) — O singură sursă</h4>
          <p style={{ fontSize: "0.9rem", color: "#555" }}>
            Valoarea trăiește în context. Orice schimbare aici afectează TOȚI consumatorii.
          </p>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Selectează demo (schimbă și în header):</label>
          <select
            value={activeId}
            onChange={e => setActiveId(e.target.value)}
            style={{
              padding: "0.5rem",
              fontSize: "1rem",
              width: "100%",
              marginBottom: "0.5rem"
            }}
          >
            {steps.map(s => (
              <option key={s.id} value={s.id}>
                Pas {s.step} — {s.title}
              </option>
            ))}
          </select>
          <p style={{ fontSize: "0.9rem", color: "#2e7d32", marginTop: "1rem" }}>
            <strong>Acum:</strong> {activeId}
          </p>
          <p style={{ fontSize: "0.85rem", color: "#999" }}>
            ⚠ Schimbă aici și vei vedea în header că e aceeași stare.
          </p>
        </div>

        {/* COLOANA 2: LOCAL — useState, instanțe separate */}
        <div style={{ flex: 1, border: "2px solid #2196f3", padding: "1rem", borderRadius: "4px" }}>
          <h4 style={{ marginTop: 0, color: "#1565c0" }}>LOCAL (useState) — Instanțe separate</h4>
          <p style={{ fontSize: "0.9rem", color: "#555" }}>
            Fiecare hook are starea lui. Schimbarea unuia NU-l afectează pe celălalt.
          </p>

          <div style={{ marginBottom: "1rem" }}>
            <p>
              <strong>Counter 1:</strong> {counter1.count}
            </p>
            <button onClick={counter1.increment} style={{ marginRight: "0.5rem" }}>
              +1
            </button>
            <button onClick={counter1.decrement} style={{ marginRight: "0.5rem" }}>
              −1
            </button>
            <button onClick={counter1.reset}>Reset</button>
          </div>

          <div>
            <p>
              <strong>Counter 2:</strong> {counter2.count}
            </p>
            <button onClick={counter2.increment} style={{ marginRight: "0.5rem" }}>
              +1
            </button>
            <button onClick={counter2.decrement} style={{ marginRight: "0.5rem" }}>
              −1
            </button>
            <button onClick={counter2.reset}>Reset</button>
          </div>

          <p style={{ fontSize: "0.85rem", color: "#999", marginTop: "1rem" }}>
            ⚠ Modific-o pe prima, a doua rămâne neschimbată.
          </p>
        </div>
      </div>

      {/* SEPARATOR */}
      <hr style={{ margin: "2rem 0" }} />

      {/* REȚETA ÎN 5 PAȘI */}
      <h3>Rețeta: Cinci pași pentru a crea și folosi Context</h3>

      <CodeBlock
        title="PASUL 1: Crează contextul cu tipul de date și valoare implicită undefined"
        code={`const ActiveStepContext = createContext<ActiveStepContextValue | undefined>(undefined);`}
      />

      <CodeBlock
        title="PASUL 2: Cria componenta provider care ține starea și o publică"
        code={`export function ActiveStepProvider({ steps, children }: ActiveStepProviderProps) {
  // Lazy initializer: se execută o singură dată, la prima randare.
  // Restaurează din localStorage și validează (e-n lista de pași?).
  const [activeId, setActiveId] = useState(() => {
    try {
      const stored = localStorage.getItem('activeStepId');
      if (stored && steps.some(s => s.id === stored)) {
        return stored;
      }
    } catch {
      // localStorage nu e disponibil — continuăm fără el.
    }
    return steps[0]?.id || '';
  });

  return (
    <ActiveStepContext.Provider value={{ activeId, setActiveId, steps }}>
      {children}
    </ActiveStepContext.Provider>
  );
}`}
      />

      <CodeBlock
        title="PASUL 3: Sincronizează cu localStorage la fiecare schimbare (useEffect)"
        code={`useEffect(() => {
  try {
    localStorage.setItem('activeStepId', activeId);
  } catch {
    // localStorage nu e disponibil — ignorăm.
  }
}, [activeId]);`}
      />

      <CodeBlock
        title="PASUL 4: Hook custom pentru consum sigur (arunca eroare dacă nu e sub provider)"
        code={`export function useActiveStep(): ActiveStepContextValue {
  const context = useContext(ActiveStepContext);
  if (!context) {
    throw new Error(
      'useActiveStep() e folosit în afara <ActiveStepProvider>. ' +
      'Asigură-te că componenta e sub provider-ul în arbore.'
    );
  }
  return context;
}`}
      />

      <CodeBlock
        title="PASUL 5: Wrap consumatorii și folosește hook-ul fără props"
        code={`// În App.tsx: wrapping
<ActiveStepProvider steps={demos}>
  <DemoMenu />
  <Demo />
</ActiveStepProvider>

// Oriunde în arbore: consum
const { activeId, setActiveId, steps } = useActiveStep();`}
      />

      <div
        style={{
          backgroundColor: "#fff3e0",
          border: "1px solid #ffb74d",
          padding: "1rem",
          borderRadius: "4px",
          marginTop: "1rem"
        }}
      >
        <p style={{ marginTop: 0 }}>
          <strong>Key insight:</strong> Contextul e o singură sursă de adevăr — toți consumatorii citesc și scriu
          aceeași valoare. La Pas 12 (Custom Hooks), fiecare apel al hook-ului avea instanța lui. Aceeași rețetă
          (provider + hook custom) o folosești pentru temă (`ThemeProvider`/`useTheme`), utilizator curent, localizare,
          etc.
        </p>
      </div>
    </div>
  );
}
