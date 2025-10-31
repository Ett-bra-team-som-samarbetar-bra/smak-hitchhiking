import { Form } from "react-bootstrap";

interface InputFormImageProps {
  setFormProp: (file: File | null) => void;
  label: string;
  className?: string;
  disabled?: boolean;
  typeName?: string;
}

export default function InputFormImage({
  setFormProp,
  label,
  typeName = "",
  className = "",
  disabled = false,
}: InputFormImageProps) {
  return (
    <>
      <Form.Group className={`${className} mb-3 w-100`}>
        <Form.Label className="d-block">
          <p className="mb-1 text-black">{label}</p>
          <Form.Control
            type="file"
            name={typeName}
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
