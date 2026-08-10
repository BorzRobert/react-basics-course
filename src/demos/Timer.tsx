// Pas 5 — useEffect.
// De ce: un cronometru are nevoie de un timer independent de randare; daca
// il punem direct in corpul componentei, fiecare re-render ar crea alt timer.
// useEffect e locul efectelor secundare (timere, fetch, event listeners): se
// executa dupa randare si cleanup-ul se apeleaza inainte de re-rularea
// efectului sau la unmount.

import { useEffect, useState } from "react";

let subscriptionCount = 0;

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    console.log("timer effect: running =", running);

    if (!running) {
      console.log("timer effect: nothing to start");
      return undefined;
    }

    console.log("timer effect: starting interval");
    const id = window.setInterval(() => {
      console.log("timer tick");
      setSeconds(s => s + 1);
    }, 1000);

    console.log("timer effect: interval id =", id);

    return () => {
      console.log("timer cleanup: clearing interval id =", id);
      window.clearInterval(id);
    };
  }, [running]);

  useEffect(() => {
    subscriptionCount += 1;
    const id = subscriptionCount;

    console.log(`tracker #${id} subscribed; ${subscriptionCount} active`);

    const onBodyClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const tag = target.tagName.toLowerCase();
      const x = Math.round(event.pageX);
      const y = Math.round(event.pageY);

      const ownText = Array.from(target.childNodes)
        .filter(node => node.nodeType === Node.TEXT_NODE)
        .map(node => node.textContent?.trim())
        .filter((text): text is string => Boolean(text))
        .join(" ");

      // classList e mai sigur decat className aici: pe SVG, className nu e string.
      const label = ownText || Array.from(target.classList).slice(0, 3).join(" ");

      console.log(`tracker #${id} → ${tag} "${label}" @ ${x}×${y}`);
    };

    document.body.addEventListener("click", onBodyClick);

    return () => {
      document.body.removeEventListener("click", onBodyClick);
      console.log(`tracker #${id} cleanup`);
    };
  }, []);

  return (
    <div>
      <p style={{ fontSize: 32, margin: "0 0 8px" }}>Seconds: {seconds}</p>
      <button type="button" onClick={() => setRunning(true)}>
        Pornește
      </button>
      <button type="button" onClick={() => setRunning(false)}>
        Pauză
      </button>
      <button type="button" onClick={() => setSeconds(0)}>
        Reset
      </button>
      <p style={{ marginTop: 12 }}>Click pe orice element din pagină pentru a vedea log-ul de telemetrie în consolă.</p>
    </div>
  );
}
