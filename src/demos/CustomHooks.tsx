// Pas 8 — Custom Hooks.
// De ce: logica de stare se repetă (counterul pentru copii și pentru adulți, citirea
// dimensiunilor ferestrei). Putem extrage-o în funcții custom (numite useX...) — similar
// cu metodele private dintr-o clasă. Fiecare APEL al hookului are stare independentă:
// useCounter() de două ori = două contoare separate, nu partajate.
// Diferența cu context (pe care o vedem mai târziu): azi fiecare valoare e locală;
// context-ul partajează o SINGURĂ sursă pentru toți consumatorii.

import { useCounter } from '@/hooks/useCounter';
import { useWindowSize } from '@/hooks/useWindowSize';
import { GrupBox } from '@/components/GrupBox';

const PRET_COPIL = 2;
const PRET_ADULT = 5;

export function CustomHooks() {
  // Două apeluri independente ale aceluiași hook — două instanțe de stare separate.
  const copii = useCounter(0, 1);
  const adulti = useCounter(0, 1);

  // Citim dimensiunile ferestrei (se actualizează la resize).
  const windowSize = useWindowSize();

  // Subtotalurile și totalul sunt date DERIVATE — calculate la randare, nu în useState.
  // Avantaj: nu pot ieși din sinc cu contoarele.
  const subtotalCopii = copii.count * PRET_COPIL;
  const subtotalAdulti = adulti.count * PRET_ADULT;
  const totalPersone = copii.count + adulti.count;
  const totalPlata = subtotalCopii + subtotalAdulti;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Bilete la intrare</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ flex: 1 }}>
          <GrupBox
            title="Copii"
            pricePerUnit={PRET_COPIL}
            count={copii.count}
            onIncrement={copii.increment}
            onDecrement={copii.decrement}
            onReset={copii.reset}
          />
        </div>

        <div style={{ flex: 1 }}>
          <GrupBox
            title="Adulți"
            pricePerUnit={PRET_ADULT}
            count={adulti.count}
            onIncrement={adulti.increment}
            onDecrement={adulti.decrement}
            onReset={adulti.reset}
          />
        </div>
      </div>

      <div style={{ border: '2px solid #333', padding: '1rem', marginBottom: '2rem' }}>
        <h3>Total grup</h3>
        <p>Persoane: <strong>{totalPersone}</strong></p>
        <p>Plată totală: <strong>{totalPlata} lei</strong></p>
      </div>

      <div style={{ fontSize: '0.9rem', color: '#666' }}>
        Dimensiuni fereastră: {windowSize.width}x{windowSize.height}
      </div>
    </div>
  );
}
