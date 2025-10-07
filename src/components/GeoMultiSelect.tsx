import { useState } from "react";
import { X, Plus } from "lucide-react";

interface GeoMultiSelectProps {
  selected: string[];
  onChange: (cities: string[]) => void;
}

const PRESET_CITIES = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
];

export const GeoMultiSelect = ({ selected, onChange }: GeoMultiSelectProps) => {
  const [customCity, setCustomCity] = useState("");

  const toggleCity = (city: string) => {
    if (selected.includes(city)) {
      onChange(selected.filter((c) => c !== city));
    } else {
      onChange([...selected, city]);
    }
  };

  const addCustomCity = () => {
    const trimmed = customCity.trim();
    if (trimmed && !selected.includes(trimmed)) {
      onChange([...selected, trimmed]);
      setCustomCity("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomCity();
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        Geographies {selected.length === 0 && <span className="text-muted-foreground">(Global if none)</span>}
      </label>
      
      <div className="flex flex-wrap gap-2">
        {PRESET_CITIES.map((city) => {
          const isSelected = selected.includes(city);
          return (
            <button
              key={city}
              onClick={() => toggleCity(city)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                isSelected
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
              aria-pressed={isSelected}
            >
              {city}
              {isSelected && <X className="w-3 h-3" />}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={customCity}
          onChange={(e) => setCustomCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add custom city..."
          className="flex-1 px-3 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Add custom city"
        />
        <button
          onClick={addCustomCity}
          disabled={!customCity.trim()}
          className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Add city"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          {selected.map((city) => (
            <span
              key={city}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-accent text-accent-foreground"
            >
              {city}
              <button
                onClick={() => toggleCity(city)}
                className="hover:text-accent-foreground/80 focus:outline-none focus:ring-1 focus:ring-accent-foreground rounded-full"
                aria-label={`Remove ${city}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
