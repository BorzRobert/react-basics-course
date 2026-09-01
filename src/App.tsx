import { type ReactNode } from "react";
import "./App.css";
import { useActiveStep } from "@/context/ActiveStepProvider";
import { Welcome } from "@/components/Welcome";
import { Counter } from "@/demos/Counter";
import { CounterClass } from "@/demos/CounterClass";
import { PrettierFormat } from "@/demos/PrettierFormat";
import { PureFunctions } from "@/demos/PureFunctions";
import { Timer } from "@/demos/Timer";
import { LiftingState } from "@/demos/LiftingState";
import { PathAlias } from "@/demos/PathAlias";
import { CustomHooks } from "@/demos/CustomHooks";
import { ContextDemo } from "@/demos/ContextDemo";
import { TailwindSetup } from "@/demos/TailwindSetup";
import DemoMenu from "@/demos/DemoMenu";
import DemoTab from "@/components/DemoTab";
import { NavigationProvider } from "@/context/NavigationContext";
import { ActiveStepProvider } from "@/context/ActiveStepProvider";

// ReactNode = orice poate fi randat (element, text, null). `element` chiar tine
// un element JSX, adica descrierea deja construita a demo-ului.
type Demo = { id: string; step: number; title: string; element: ReactNode };

const demos: Demo[] = [
  { id: "welcome", step: 1, title: "Structura proiectului", element: <Welcome /> },
  { id: "counter", step: 2, title: "useState", element: <Counter /> },
  { id: "counter-class", step: 3, title: "useState — varianta veche, cu clasa", element: <CounterClass /> },
  { id: "prettier-format", step: 4, title: "Prettier și formatare automată", element: <PrettierFormat /> },
  { id: "pure-functions", step: 5, title: "Pure vs impure functions", element: <PureFunctions /> },
  { id: "timer", step: 6, title: "useEffect și side effects", element: <Timer /> },
  { id: "demo-menu", step: 7, title: "Demo: meniu și starea navigării", element: <DemoMenu /> },
  { id: "lifting-state", step: 8, title: "Lifting state up", element: <LiftingState /> },
  { id: "path-alias", step: 9, title: "Path alias pentru importuri", element: <PathAlias /> },
  { id: "tailwind-setup", step: 10, title: "Tailwind CSS și design tokens", element: <TailwindSetup /> },
  { id: "custom-hooks", step: 12, title: "Custom Hooks", element: <CustomHooks /> },
  { id: "context", step: 13, title: "React Context API", element: <ContextDemo /> }
];

// Componenta interna care consuma contextul.
// Trebuie sa fie SUB provider-ul, de aia e separata de App.
function AppContent() {
  // Acum putem folosi hook-ul, pentru ca suntem sub provider.
  const { activeId } = useActiveStep();

  // `?? demos[0]` face ca `active` sa nu fie niciodata undefined — asa evitam
  // `!` (non-null assertion), care e interzis in acest proiect.
  const active = demos.find(d => d.id === activeId) ?? demos[0];

  return (
    <>
      <nav className="demo-menu" aria-label="Navigare demo-uri">
        <h2>Browsing demo-uri</h2>
        <ul>
          {demos.map(demo => (
            <li key={demo.id}>
              <DemoTab id={demo.id} step={demo.step} title={demo.title} />
            </li>
          ))}
        </ul>
      </nav>

      <main>
        <h1>
          Pas {active.step} — {active.title}
        </h1>
        {active.element}
      </main>
    </>
  );
}

// Shell-ul aplicatiei: wraps cu provider si randeaza continutul.
function App() {
  return (
    <ActiveStepProvider steps={demos}>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ActiveStepProvider>
  );
}

export default App;
