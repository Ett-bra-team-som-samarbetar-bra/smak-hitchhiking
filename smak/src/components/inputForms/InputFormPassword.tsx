import { Form } from "react-bootstrap";

interface InputFormPasswordProps {
  setFormProp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  value?: string;
  className?: string;
}

export default function InputFormPassword({ setFormProp, label, placeholder, className = "" }: InputFormPasswordProps) {
  return <>
    <Form.Group className={`${className} mb-3 w-100`}>
      <Form.Label className="d-block">
        <p className="mb-1 text-black">{label}</p>
        <Form.Control
          className="bg-light border-1 placeholder-text"
          name="password"
          type="password"
          onChange={setFormProp}
          autoComplete="off"
          placeholder={placeholder}
          maxLength={100}
          minLength={6}
          required />
      </Form.Label>
    </Form.Group>
  </>
}
