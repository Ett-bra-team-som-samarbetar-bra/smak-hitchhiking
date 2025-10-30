import { Form } from "react-bootstrap";

interface InputFormTextProps {
  setFormProp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  className?: string;
  disabled?: boolean;
}

export default function InputFormText({
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
            onChange={setFormProp}
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
