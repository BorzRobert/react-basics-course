// Pas 9 — Path alias pentru importuri.
// De ce: importurile relative pot deveni greu de citit și fragile când muți
// fișiere într-un arbore de directoare adânc. Un alias scurt, stabil, face ca
// importurile interne să funcționeze identic din orice folder.
// Punem asta acum pentru că shadcn/ui va cere alias-uri, dar beneficiul este
// util oricând: mutarea fișierelor nu mai rupe importurile interne.

import { useState } from "react";

const relativeImports = [
  "import { Welcome } from '../components/Welcome';",
  "import { DemoMenu } from '../demos/DemoMenu';",
  "import { Bubble } from '../../../components/chat/message/Bubble';"
];

const aliasImports = [
  "import { Welcome } from '@/components/Welcome';",
  "import { DemoMenu } from '@/demos/DemoMenu';",
  "import { Bubble } from '@/components/chat/message/Bubble';"
];

export function PathAlias() {
  const [useAlias, setUseAlias] = useState(false);

  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setUseAlias(false)} disabled={!useAlias}>
          Fără alias (relativ)
        </button>
        <button onClick={() => setUseAlias(true)} disabled={useAlias}>
          Cu alias @/
        </button>
      </div>

      <section style={{ padding: 16, border: "1px solid #ccc", borderRadius: 10 }}>
        <h2>Importuri {useAlias ? "cu alias" : "relative"}</h2>
        <pre style={{ background: "#f7f7f7", padding: 12, borderRadius: 6, overflowX: "auto" }}>
          {useAlias ? aliasImports.join("\n") : relativeImports.join("\n")}
        </pre>
      </section>

      <section style={{ display: "grid", gap: 16 }}>
        <article style={{ padding: 16, border: "1px solid #e3e3e3", borderRadius: 10 }}>
          <h3>De ce avem nevoie de `tsconfig.app.json`?</h3>
          <p>
            TypeScript și editorul folosesc această configurație pentru a înțelege că `@/` înseamnă `src/`. Fără ea,
            editorul nu va face autocompletare, "go to definition" și nici tipare nu vor funcționa corect.
          </p>
          <p>
            Configurația este:
            <code style={{ display: "block", marginTop: 8, whiteSpace: "pre" }}>
              {`"baseUrl": ".",
"paths": { "@/*": ["./src/*"] }`}
            </code>
          </p>
        </article>

        <article style={{ padding: 16, border: "1px solid #e3e3e3", borderRadius: 10 }}>
          <h3>De ce avem nevoie de `vite.config.ts`?</h3>
          <p>
            Vite este bundler-ul care construiește aplicația la dev și la build. El trebuie să știe că `@` este un alias
            real și că trebuie să-l înlocuiască cu calea corectă la fișierul din `src/`.
          </p>
          <p>
            Configurația este:
            <code style={{ display: "block", marginTop: 8, whiteSpace: "pre" }}>
              {`resolve: {\n  alias: { "@": path.resolve(__dirname, "./src") }\n}`}
            </code>
          </p>
        </article>
      </section>

      <section style={{ padding: 16, border: "1px dashed #bbb", borderRadius: 10 }}>
        <h3>Ce se întâmplă dacă lipsește unul dintre ele?</h3>
        <ul>
          <li>
            Fără `tsconfig.app.json`: editorul și TypeScript nu recunosc aliasul, deși Vite poate să construiască. Ai
            erori în cod și nu funcționează "go to definition".
          </li>
          <li>
            Fără `vite.config.ts`: aliasurile par ok în editor, dar build-ul sau dev server-ul vor eșua pentru că
            bundler-ul nu găsește fișierele.
          </li>
        </ul>
      </section>
    </div>
  );
}
