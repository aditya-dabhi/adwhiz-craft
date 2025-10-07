export const WatermarkOverlay = () => {
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      style={{ userSelect: "none" }}
    >
      <div 
        className="text-6xl font-bold text-foreground/10 transform rotate-[-30deg] tracking-widest"
        style={{ userSelect: "none" }}
      >
        ADWHIZ
      </div>
    </div>
  );
};
