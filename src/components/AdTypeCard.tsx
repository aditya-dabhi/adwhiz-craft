import { LucideIcon } from "lucide-react";

interface AdTypeCardProps {
  icon: LucideIcon;
  title: string;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export const AdTypeCard = ({ icon: Icon, title, disabled, selected, onClick }: AdTypeCardProps) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`relative p-6 rounded-xl border-2 transition-all text-left ${
        disabled
          ? "cursor-not-allowed opacity-50 border-border bg-muted/30"
          : selected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border hover:border-primary/50 hover:shadow-sm bg-card"
      }`}
      aria-pressed={selected}
      aria-disabled={disabled}
    >
      {disabled && (
        <span className="absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
          Coming soon
        </span>
      )}
      <Icon className={`w-8 h-8 mb-3 ${selected ? "text-primary" : "text-muted-foreground"}`} />
      <h3 className="font-semibold text-sm">{title}</h3>
    </button>
  );
};
