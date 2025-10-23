import { useState, useEffect } from "react";
import type GeocodeSelection from "../interfaces/GeocodeSelection.ts";

interface GeocodeInputProps {
  value: GeocodeSelection | null;
  onChange: (value: GeocodeSelection | null) => void;
  placeholder: string;
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function GeocodeInput({
  value,
  onChange,
  placeholder,
}: GeocodeInputProps) {
  const [query, setQuery] = useState(value?.name || "");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5`
      );
      const data = await res.json();
      setSuggestions(data.features || []);
    };

    const timeout = setTimeout(fetchSuggestions, 300); // debounce to not spam mapbox API
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (place: any) => {
    const selection: GeocodeSelection = {
      name: place.text,
      coordinates: place.center,
    };
    setQuery(selection.name);
    setShowSuggestions(false);
    onChange(selection);
  };

  return (
    <div className="position-relative mb-3">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          const newValue = e.target.value;
          setQuery(newValue);
          setShowSuggestions(true);

          if (newValue.trim() === "") {
            onChange(null);
          }
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul
          className="list-group position-absolute w-100 mt-1 shadow-sm"
          style={{
            zIndex: 1050,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((s) => (
            <li
              key={s.id}
              className="list-group-item list-group-item-action"
              onMouseDown={() => handleSelect(s)}
            >
              {s.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
