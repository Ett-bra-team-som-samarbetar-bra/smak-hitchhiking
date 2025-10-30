import { Form } from "react-bootstrap";

interface PreferenceOption {
  label: string;
  options: [string, string];
}

interface InputFormRadioGroupProps {
  preferences: PreferenceOption[];
  setPreferences: (selected: string[]) => void;
  selectedValues: string[];
  className?: string;
}

export default function InputFormRadioGroup({
  preferences,
  setPreferences,
  selectedValues,
  className = "",
}: InputFormRadioGroupProps) {
  // When a radio button is changed
  const handleChange = (categoryIndex: number, value: string) => {
    const updated = [...selectedValues];
    updated[categoryIndex] = value;
    setPreferences(updated);
  };

  return (
    <Form className={`${className}`}>
      <p>Preferenser</p>
      {preferences.map((pref, index) => (
        <Form.Group key={index} className="mb-3">
          <Form.Label className="text-black mb-2 d-block">
            {pref.label}
          </Form.Label>
          <div
            className="d-grid"
            style={{
              gridTemplateColumns: "1fr 1fr",
              columnGap: "2rem",
              alignItems: "center",
            }}
          >
            {pref.options.map((option) => (
              <Form.Check
                key={option}
                type="radio"
                id={`${pref.label}-${option}`}
                name={`pref-${index}`}
                label={option}
                value={option}
                checked={selectedValues[index] === option}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
          </div>
        </Form.Group>
      ))}
    </Form>
  );
}
