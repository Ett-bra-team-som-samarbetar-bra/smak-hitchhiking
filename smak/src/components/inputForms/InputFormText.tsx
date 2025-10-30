import { Form } from "react-bootstrap";

interface InputFormTextProps {
  setFormProp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  maxLength?: number;
  typeName?: string;
  value?: string;
  isTextArea?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function InputFormText({
  setFormProp,
  label,
  placeholder,
  maxLength = 100,
  typeName = "name",
  value = "",
  isTextArea = false,
  className = "",
  disabled = false

}: InputFormTextProps) {

  return <>
    <Form.Group className={`${className} mb-3 w-100`}>
      <Form.Label className="d-block">
        <p className="mb-1 text-black">{label}</p>
        <Form.Control
          className="bg-light border-1 placeholder-text"
          name={typeName}
          onChange={setFormProp}
          autoComplete="off"
          placeholder={placeholder}
          maxLength={maxLength}
          minLength={2}
          as={isTextArea ? "textarea" : "input"}
          required
          defaultValue={value}
          disabled={disabled}
        />
      </Form.Label>
    </Form.Group>
  </>
}
