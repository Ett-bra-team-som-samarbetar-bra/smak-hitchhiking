import { ButtonGroup, Form, ToggleButton } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

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

export default function InputRadioGroup({
  preferences,
  setPreferences,
  selectedValues,
  className = ""
}: InputFormRadioGroupProps) {
  const options = ["Ja", "Nej"];

  const handleChange = (categoryIndex: number, value: string) => {
    const updated = [...selectedValues];
    updated[categoryIndex] = value;
    setPreferences(updated);
  };

  const rows = [];
  for (let i = 0; i < preferences.length; i += 2) {
    rows.push(preferences.slice(i, i + 2));
  }

  return (
    <div className={`${className}`}>
      <div className="d-flex align-items-center mb-2">
        <div className="flex-grow-1 border-bottom"></div>
        <span className="mx-3 text-nowrap">Preferenser</span>
        <div className="flex-grow-1 border-bottom"></div>
      </div>

      {rows.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((pref, colIndex) => {
            const index = rowIndex * 2 + colIndex;
            return (
              <Col xs={6} key={pref.label}>
                <Form.Group>

                  <Form.Label className="text-black mb-1">
                    {pref.label}
                  </Form.Label>

                  <ButtonGroup className="w-100 mb-2">
                    {options.map((option) => (
                      <ToggleButton
                        key={option}
                        id={`${pref.label}-${option}`}
                        type="radio"
                        name={`pref-${index}`}
                        value={option}
                        variant={selectedValues[index] === option ? "outline-primary" : "outline-secondary"}
                        checked={selectedValues[index] === option}
                        onChange={e => handleChange(index, e.currentTarget.value)}
                        className="flex-fill py-1">
                        {option}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </Form.Group>
              </Col>
            );
          })}
        </Row>
      ))}
    </div>
  );
}
