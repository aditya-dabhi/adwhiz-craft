import { WatermarkOverlay } from "./WatermarkOverlay";

interface VariantCardProps {
  id: string;
  imageUrl: string;
  caption: string;
  selected?: boolean;
  onSelect?: () => void;
  captionEditable?: boolean;
  onCaptionChange?: (caption: string) => void;
}

export const VariantCard = ({
  id,
  imageUrl,
  caption,
  selected,
  onSelect,
  captionEditable,
  onCaptionChange,
}: VariantCardProps) => {
  return (
    <div
      className={`rounded-xl border-2 overflow-hidden transition-all ${
        selected ? "border-primary shadow-md" : "border-border hover:border-primary/50"
      }`}
    >
      <div 
        className="relative aspect-square bg-muted"
        onContextMenu={(e) => e.preventDefault()}
        style={{ userSelect: "none" }}
      >
        <img
          src={imageUrl}
          alt="Ad variant preview"
          draggable={false}
          className="w-full h-full object-cover select-none"
          style={{ userSelect: "none", pointerEvents: "none" }}
        />
        <WatermarkOverlay />
      </div>
      
      <div className="p-4 space-y-3">
        {captionEditable ? (
          <textarea
            value={caption}
            onChange={(e) => onCaptionChange?.(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            rows={3}
            aria-label="Edit caption"
          />
        ) : (
          <p className="text-sm text-muted-foreground line-clamp-3">{caption}</p>
        )}
        
        {onSelect && (
          <button
            onClick={onSelect}
            className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
              selected
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
            aria-pressed={selected}
          >
            {selected ? "Selected" : "Select"}
          </button>
        )}
      </div>
    </div>
  );
};
