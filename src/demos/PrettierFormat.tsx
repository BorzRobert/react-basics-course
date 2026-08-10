// Pas 4 — Prettier formatting.
// De ce: configurarea unui formatter automat reduce dezacordurile de stil si
// face codul scris de mai multi oameni sa apara uniform, fara sa mai fie nevoie
// sa ne uitam la preferintele personale.

export function PrettierFormat() {
  return (
    <section>
      <h2>Prettier și formatare automată</h2>
      <p>Am pus un formatter fix pentru întregul proiect, cu salvare automată în editor și comenzi terminal.</p>
      <p>Setările din proiect sunt:</p>
      <ul>
        <li>semi: true</li>
        <li>singleQuote: false</li>
        <li>printWidth: 120</li>
        <li>arrowParens: avoid</li>
      </ul>
      <p>
        În VS Code, salvarea activează formatarea automat. Configurația e salvată în proiect, deci toată echipa o
        folosește la fel.
      </p>
      <p>Exemplu de ignorare locală pentru un bloc greu de citit:</p>
      <pre>{`// prettier-ignore
const matrix = [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
];`}</pre>
      <p>
        În JavaScript/TypeScript, <code>// prettier-ignore</code> afectează doar nodul imediat următor. Nu există o
        variantă „ignoră de aici până aici” pentru acest caz.
      </p>
      <p>
        Se folosește rar și doar atunci când formatarea automată face un bloc mai greu de citit, de exemplu o matrice
        sau un tabel de valori aliniate.
      </p>
      <p>
        În JSX, sintaxa este <code>{`{/* prettier-ignore */}`}</code> și se aplică elementului următor.
      </p>
    </section>
  );
}
