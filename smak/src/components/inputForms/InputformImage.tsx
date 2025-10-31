import { Form } from "react-bootstrap";

interface InputFormTextProps {
  setFormProp: (file: File | null) => void;
  label: string;
  className?: string;
  disabled?: boolean;
}

export default function InputFormImage({
  setFormProp,
  label,
  className = "",
  disabled = false,
}: InputFormTextProps) {
  return (
    <>
      <Form.Group className={`${className} mb-3 w-100`}>
        <Form.Label className="d-block">
          <p className="mb-1 text-black">{label}</p>
          <Form.Control
            type="file"
            accept="image/*"
            className="bg-light border-1 placeholder-text"
            onChange={(e) =>
              setFormProp((e.target as HTMLInputElement).files?.[0] || null)
            }
            autoComplete="off"
            minLength={2}
            required
            disabled={disabled}
            lang="sv"
            data-browse="Välj fil"
          />
          <p></p>
        </Form.Label>
      </Form.Group>
    </>
  );
}
