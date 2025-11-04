import { Form } from "react-bootstrap";

interface NumberFormProps {
  setFormProp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  value?: number | null;
  typeName?: string;
  className?: string;
}

export default function InputFormNumber({
  setFormProp,
  label,
  placeholder,
  value,
  typeName = "name",
  className = "",
}: NumberFormProps) {
  return (
    <>
      <Form.Group className={`${className} mb-3 w-100`}>
        <Form.Label className="d-block">
          <p className="mb-1 text-black">{label}</p>
          <Form.Control
            className="bg-light border-1 placeholder-text"
            name={typeName}
            type="number"
            onChange={setFormProp}
            autoComplete="off"
            placeholder={placeholder}
            required
            value={!value ? "" : value}
          />
        </Form.Label>
      </Form.Group>
    </>
  );
}
