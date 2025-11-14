import { useState } from "react";
import { Form } from "react-bootstrap";
import { validatePassword } from "../../utils/passwordValidation";

interface InputFormPasswordProps {
  setFormProp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  value?: string;
  className?: string;
}

export default function InputFormPassword({
  setFormProp,
  label,
  placeholder,
  value = "",
  className = "",
}: InputFormPasswordProps) {
  const [errors, setErrors] = useState<string[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormProp(e);
    const result = validatePassword(e.target.value);
    setErrors(result.errors);
  }

  return (
    <Form.Group className={`${className} mb-3 w-100`}>
      <Form.Label className="d-block">
        <p className="mb-1 text-black">{label}</p>
        <Form.Control
          className="bg-light border-1 placeholder-text"
          name="password"
          type="password"
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
        />
      </Form.Label>

      {/* Show validation errors */}
      {errors.length > 0 && (
        <ul className="text-danger mb-0 ps-3">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
    </Form.Group>
  );
}
