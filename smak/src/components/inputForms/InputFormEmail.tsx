import { Form } from "react-bootstrap";

interface InputFormEmailProps {
  setFormProp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  value?: string;
  className?: string;
}

export default function InputFormEmail({ setFormProp, label, placeholder, value = "", className = "" }: InputFormEmailProps) {
  return <>
    <Form.Group className={`${className} mb-3 w-100`}>
      <Form.Label className="d-block">
        <p className="mb-1 text-secondary">{label}</p>
        <Form.Control
          name="email"
          type="email"
          onChange={setFormProp}
          autoComplete="email"
          placeholder={placeholder}
          maxLength={100}
          minLength={5}
          required
          inputMode="email"
          pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
          defaultValue={value} />
      </Form.Label>
    </Form.Group>
  </>
}
