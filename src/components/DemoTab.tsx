type Props = {
  id: string;
  step: number;
  title: string;
  activeId: string;
  onSelect: () => void;
};

export function DemoTab({ id, step, title, activeId, onSelect }: Props) {
  const isActive = id === activeId;

  return (
    <button
      type="button"
      className={isActive ? "demo-tab demo-tab--active" : "demo-tab"}
      aria-current={isActive ? "page" : undefined}
      onClick={onSelect}
    >
      <span className="demo-tab__label">{title}</span>
      <span className="demo-tab__badge" aria-hidden>
        {step}
      </span>
    </button>
  );
}

export default DemoTab;
