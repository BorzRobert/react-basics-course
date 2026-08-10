// Pas 3 — funcții pure vs impure.
// De ce: o funcție care calculează interfața trebuie să depindă doar de datele
// primite, nu de „stare ascunsă” din DOM. Dacă citește valori în afara ei,
// React nu poate ști când trebuie să redeseneze și UI-ul rămâne stale.
// Capcana: un `const` cu un primitiv e tot pur, dar orice valoare care se poate
// schimba trebuie să intre ca argument / prop / state. `const config = { rate: 5 }`
// nu protejează conținutul — `const` blochează doar legătura, ca `final` in Java.

import { useState } from 'react'

export const RATE_INITIAL = 5
export const RATE_STEP = 0.05
export const COMISION_PCT = 0.01
export const COMISION_ID = 'pure-comision'

export function pureConvert(ron: number, rate: number) {
  return ron / rate
}

export function impureConvert(ron: number, rate: number) {
  const checkbox = document.getElementById(COMISION_ID)
  const isChecked = checkbox instanceof HTMLInputElement ? checkbox.checked : false
  const eur = ron / rate

  if (isChecked) {
    return eur * (1 - COMISION_PCT)
  }

  return eur
}

export function PureFunctions() {
  const [ron, setRon] = useState(100)
  const [rate, setRate] = useState(RATE_INITIAL)

  const pureValue = pureConvert(ron, rate)
  const impureValue = impureConvert(ron, rate)

  const decreaseRon = () => {
    setRon((current) => Math.max(0, current - 10))
  }

  const increaseRon = () => {
    setRon((current) => current + 10)
  }

  const decreaseRate = () => {
    setRate((current) => current - RATE_STEP)
  }

  const increaseRate = () => {
    setRate((current) => current + RATE_STEP)
  }

  const updateRon = (value: string) => {
    const parsed = Number(value)
    setRon(Number.isFinite(parsed) ? Math.max(0, parsed) : 0)
  }

  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
      <p style={{ margin: 0 }}>
        Introdu sumă în RON și vezi cât primești în EUR. Cursul poate fi schimbat
        din interfață, ca într-un caz real.
      </p>

      <label htmlFor="ron-input" style={{ fontWeight: 600 }}>
        Sumă în RON
      </label>
      <input
        id="ron-input"
        type="number"
        min="0"
        value={ron}
        onChange={(event) => updateRon(event.target.value)}
      />

      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" onClick={decreaseRon}>
          -10 RON
        </button>
        <button type="button" onClick={increaseRon}>
          +10 RON
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontWeight: 600 }}>Curs:</span>
        <button type="button" onClick={decreaseRate}>
          -{RATE_STEP.toFixed(2)}
        </button>
        <span>1 EUR = {rate.toFixed(2)} RON</span>
        <button type="button" onClick={increaseRate}>
          +{RATE_STEP.toFixed(2)}
        </button>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input id={COMISION_ID} type="checkbox" />
        Aplică comision (1%)
      </label>

      <div style={{ border: '1px solid #ccc', padding: 12, borderRadius: 6 }}>
        <p style={{ margin: '0 0 8px' }}>Rezultate</p>
        <p style={{ margin: 0 }}>
          Pure: {pureValue.toFixed(2)} EUR
        </p>
        <p style={{ margin: 0 }}>
          Impure: {impureValue.toFixed(2)} EUR
        </p>
      </div>

      <p style={{ margin: 0, fontSize: 13 }}>
        Observă: schimbarea sumei sau a cursului re-randează componenta. Bifează
        comisionul și vezi că valoarea din UI rămâne veche până la următorul render.
      </p>
    </div>
  )
}
