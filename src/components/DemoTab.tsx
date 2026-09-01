import { useActiveStep } from "@/context/ActiveStepProvider";

type Props = {
  id: string;
  step: number;
  title: string;
};

export function DemoTab({ id, step, title }: Props) {
  // Citim starea din context, în loc s-o primim ca props.
  // De asta nu mai avem nevoie de activeId și onSelect ca parametri.
  const { activeId, setActiveId } = useActiveStep();
  const isActive = id === activeId;

  return (
    <button
      type="button"
      className={isActive ? "demo-tab demo-tab--active" : "demo-tab"}
      aria-current={isActive ? "page" : undefined}
      onClick={() => setActiveId(id)}
    >
      <span className="demo-tab__label">{title}</span>
      <span className="demo-tab__badge" aria-hidden>
        {step}
      </span>
    </button>
  );
}

export default DemoTab;
