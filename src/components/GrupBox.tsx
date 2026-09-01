interface Props {
  title: string;
  pricePerUnit: number;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

// Sub-component pur de prezentare — nu are stare proprie.
// Tot ce afișează vine prin props.
export function GrupBox({
  title,
  pricePerUnit,
  count,
  onIncrement,
  onDecrement,
  onReset,
}: Props) {
  const subtotal = count * pricePerUnit;

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>{title}</h3>
      <p>{pricePerUnit} lei / persoană</p>
      <p>Persoane: <strong>{count}</strong></p>
      <p>Subtotal: <strong>{subtotal} lei</strong></p>
      <div style={{ marginTop: '0.5rem' }}>
        <button onClick={onDecrement} disabled={count === 0}>
          −1
        </button>
        <button onClick={onIncrement} style={{ marginLeft: '0.5rem' }}>
          +1
        </button>
        <button onClick={onReset} disabled={count === 0} style={{ marginLeft: '0.5rem' }}>
          Reset
        </button>
      </div>
    </div>
  );
}
