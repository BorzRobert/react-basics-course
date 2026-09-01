import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// ============================================================================
// PASUL 1: Creează contextul cu tipul de date și valoarea implicită.
// ============================================================================
// Valoarea implicită e `undefined` — asta îți permite să prinzi erorile:
// dacă cineva folosește useActiveStep() fără a fi sub provider, va primi
// `undefined` și hook-ul va arunca o eroare clar.

type ActiveStepContextValue = {
  activeId: string;
  setActiveId: (id: string) => void;
  steps: Array<{ id: string; step: number; title: string }>;
};

const ActiveStepContext = createContext<ActiveStepContextValue | undefined>(undefined);

// ============================================================================
// PASUL 2: Crea componenta provider care ține starea și o publică.
// ============================================================================
// - Primește lista de pași ca prop (provider-ul e reutilizabil, nu depinde de app)
// - Ține `activeId` în state, pe care îl sincronizează cu localStorage
// - Lazy initializer: la prima randare, încearcă să-l restaureze din localStorage
//   și îl validează (e-n lista de pași? dacă nu, fallback la premiers pas)
// - useEffect scrie în localStorage de fiecare dată când se schimbă activeId

type ActiveStepProviderProps = {
  steps: Array<{ id: string; step: number; title: string }>;
  children: ReactNode;
};

export function ActiveStepProvider({ steps, children }: ActiveStepProviderProps) {
  // ============================================================================
  // PASUL 3: Folosește lazy initializer pentru a citi din localStorage.
  // ============================================================================
  // Funcția anonimă se execută o SINGURĂ dată, la prima randare.
  // Asta e importante pentru a nu rescanda localStorage la fiecare re-render.

  const [activeId, setActiveId] = useState(() => {
    try {
      const stored = localStorage.getItem("activeStepId");
      // Validare: valoarea din localStorage trebuie să fie în lista de pași.
      // Dacă nu, folosim `steps[0].id` ca fallback.
      if (stored && steps.some(s => s.id === stored)) {
        return stored;
      }
    } catch {
      // Dacă localStorage nu e disponibil (sandbox, private mode, etc), ignorăm.
    }
    return steps[0]?.id || "";
  });

  // ============================================================================
  // PASUL 4: Sincronizează activeId cu localStorage la fiecare schimbare.
  // ============================================================================
  // useEffect se rulează după fiecare re-render. Dacă activeId se schimbă,
  // side effect-ul scrie noua valoare în localStorage, pentru a supraviețui refresh-ului.

  useEffect(() => {
    try {
      localStorage.setItem("activeStepId", activeId);
    } catch {
      // Dacă localStorage nu e disponibil, continuăm fără a persista.
    }
  }, [activeId]);

  // ============================================================================
  // PASUL 5: Furnizează valoarea prin Provider, pentru a fi citită de useActiveStep().
  // ============================================================================
  // Oricine e sub acest provider și apelează useActiveStep() va primi
  // activeId, setActiveId și lista de pași. FĂRĂ a fi nevoie să le paseze ca props.

  return <ActiveStepContext.Provider value={{ activeId, setActiveId, steps }}>{children}</ActiveStepContext.Provider>;
}

// ============================================================================
// BONUS: Hook custom pentru consum sigur.
// ============================================================================
// Acest hook înlocuiește useContext() și arunca eroare expres dacă cineva
// l-o folosi în afara provider-ului. Asta te-ajută să prinzi o greșeală
// încă din faza de dezvoltare, nu la runtime în prod.

export function useActiveStep(): ActiveStepContextValue {
  const context = useContext(ActiveStepContext);
  if (!context) {
    throw new Error(
      "useActiveStep() e folosit în afara <ActiveStepProvider>. " +
        "Asigură-te că componenta e under provider-ul în arbore."
    );
  }
  return context;
}
