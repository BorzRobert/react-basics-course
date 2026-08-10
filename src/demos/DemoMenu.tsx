// Pas 7 — Demo: meniu si starea navigarii
// De ce: aratam modelul minim pentru un meniu de demo-uri si explicam
// diferenta intre starea locala (se pierde la refresh) si starea globala
// persistata in context + localStorage.

import React, { useState } from "react";
import { useNavigation } from "../context/NavigationContext";

type MiniDemo = { id: string; step: number; title: string; content: React.ReactNode };

// TIPAR IN MINIATURA: array de 3 intrari + useState pentru activeId.
export function DemoMenu() {
  const miniDemos: MiniDemo[] = [
    { id: "m-one", step: 1, title: "Primul", content: <div>Conținutul Primului demo</div> },
    { id: "m-two", step: 2, title: "Al doilea", content: <div>Conținutul celui de-al doilea demo</div> },
    { id: "m-three", step: 3, title: "Al treilea", content: <div>Alt conținut</div> }
  ];

  // LOCAL: se pierde la refresh.
  const [localActive, setLocalActive] = useState(miniDemos[0].id);

  // GLOBAL: foloseste context + localStorage — ramane dupa refresh.
  const { activeId: globalActive, setActiveId: setGlobalActive, theme, setTheme } = useNavigation();

  const localActiveItem = miniDemos.find(d => d.id === localActive) ?? miniDemos[0];
  const globalActiveItem = miniDemos.find(d => d.id === (globalActive ?? miniDemos[0].id)) ?? miniDemos[0];

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <p>
        Observație: sursa unică de adevăr e `activeId`. Restul UI-ului se derivă din el — nu păstrăm în paralel lista și
        elementul selectat.
      </p>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <section style={{ flex: 1 }}>
          <h3>Local (useState) — se pierde la refresh</h3>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            {miniDemos.map(d => (
              <button key={d.id} onClick={() => setLocalActive(d.id)}>
                {d.title}
              </button>
            ))}
          </div>
          <div style={{ padding: 12, border: "1px solid #ddd" }}>{localActiveItem.content}</div>
        </section>

        <section style={{ flex: 1 }}>
          <h3>Global (context + localStorage) — rămâne la refresh</h3>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            {miniDemos.map(d => (
              <button key={d.id} onClick={() => setGlobalActive(d.id)}>
                {d.title}
              </button>
            ))}
          </div>
          <div style={{ padding: 12, border: "1px solid #ddd" }}>{globalActiveItem.content}</div>

          <div style={{ marginTop: 12 }}>
            <div>Theme (persisted): {theme}</div>
            <div style={{ marginTop: 6 }}>
              <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Toggle theme</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DemoMenu;
