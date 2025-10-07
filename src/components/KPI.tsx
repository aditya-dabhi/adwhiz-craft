interface KPIProps {
  label: string;
  value: string | number;
}

export const KPI = ({ label, value }: KPIProps) => {
  return (
    <div className="p-4 rounded-lg bg-muted/50 border">
      <div className="text-sm font-medium text-muted-foreground mb-1">{label}</div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
    </div>
  );
};
