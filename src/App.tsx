// Shell-ul aplicatiei: tine registrul de demo-uri si pasul activ, niciodata
// codul unui demo. Un pas nou = un fisier in src/demos/ + o intrare in `demos`.

import { useState, type ReactNode } from "react";
import "./App.css";
import { Welcome } from "./components/Welcome";
import { Counter } from "./demos/Counter";
import { CounterClass } from "./demos/CounterClass";
import { PrettierFormat } from "./demos/PrettierFormat";
import { PureFunctions } from "./demos/PureFunctions";
import { Timer } from "./demos/Timer";
import { LiftingState } from "./demos/LiftingState";

// ReactNode = orice poate fi randat (element, text, null). `element` chiar tine
// un element JSX, adica descrierea deja construita a demo-ului.
type Demo = { id: string; step: number; title: string; element: ReactNode };

const demos: Demo[] = [
  { id: "welcome", step: 1, title: "Structura proiectului", element: <Welcome /> },
  { id: "counter", step: 2, title: "useState", element: <Counter /> },
  { id: "counter-class", step: 2, title: "useState — varianta veche, cu clasa", element: <CounterClass /> },
  { id: "prettier-format", step: 4, title: "Prettier și formatare automată", element: <PrettierFormat /> },
  { id: "pure-functions", step: 3, title: "Pure vs impure functions", element: <PureFunctions /> },
  { id: "timer", step: 5, title: "useEffect și side effects", element: <Timer /> },
  { id: "lifting-state", step: 6, title: "Lifting state up", element: <LiftingState /> }
];

function App() {
  const [activeId, setActiveId] = useState("lifting-state");

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
              <button
                type="button"
                className={demo.id === activeId ? "demo-menu-button active" : "demo-menu-button"}
                aria-current={demo.id === activeId ? "page" : undefined}
                onClick={() => setActiveId(demo.id)}
              >
                {demo.step}. {demo.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <h1>
        Pas {active.step} — {active.title}
      </h1>
      {active.element}
    </>
  );
}

export default App;
