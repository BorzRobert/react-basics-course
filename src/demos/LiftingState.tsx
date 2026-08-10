// Pas 10 — lifting state up.
// De ce: cand doua zone arata aceeasi informatie, fiecare copie poate deveni
// o sursa de bug-uri. Starea trebuie sa traiasca intr-un singur loc, iar
// copiii sa primeasca valoarea si sa ceara schimbarea prin callback-uri.
// Capcana: daca fiecare copil isi pastreaza propria variabila, se pot
// desincroniza instant, fara sa observe nimeni.

import { useState } from "react";

type PriceCardProps = {
  label: string;
  amount: number;
  currency: string;
  step?: number;
  onChange: (next: number) => void;
};

function PriceCard({ label, amount, currency, step = 1, onChange }: PriceCardProps) {
  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: 16, marginBottom: 12, maxWidth: 320 }}>
      <h3 style={{ margin: "0 0 8px" }}>{label}</h3>
      <p style={{ fontSize: 24, margin: "0 0 8px" }}>
        {amount} {currency}
      </p>
      <input
        type="number"
        min="0"
        step={step}
        value={amount}
        onChange={event => onChange(Number(event.target.value))}
      />
    </div>
  );
}

export function LiftingState() {
  // Singura sursa de adevar traieste aici, in parinte. Copiii nu au stare
  // proprie si nu pot ajunge la o valoare diferita de cea din parinte.
  const [amount, setAmount] = useState(10);
  const rate = 5;

  return (
    <div>
      <p style={{ marginTop: 0 }}>
        Schimbă valoarea în oricare dintre cele două carduri; cealaltă se va actualiza automat, fără a exista două copii
        independente ale aceleiași informații.
      </p>

      <PriceCard label="RON" amount={amount} currency="RON" onChange={setAmount} />
      <PriceCard
        label="Puncte de fidelitate"
        amount={amount * rate}
        currency="puncte"
        step={rate}
        onChange={next => setAmount(Math.round(next / rate))}
      />
    </div>
  );
}
