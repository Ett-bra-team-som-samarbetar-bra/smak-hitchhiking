import { Form } from "react-bootstrap";
import React from "react";

interface InputFormTextProps {
  setFormProp: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  label?: string;
  placeholder: string;
  maxLength?: number;
  minLength?: number;
  typeName?: string;
  value?: string;
  isTextArea?: boolean;
  className?: string;
  formClassName?: string;
  disabled?: boolean;
  isRequired?: boolean;
  marginBottom?: boolean;
  inputRef?: React.RefObject<HTMLTextAreaElement | null>;
}

export default function InputFormText({
  setFormProp,
  label,
  placeholder,
  maxLength = 100,
  minLength = 0,
  typeName = "name",
  value = "",
  isTextArea = false,
  className = "",
  disabled = false,
  isRequired = false,
  marginBottom = true,
  formClassName = "",
  inputRef,
}: InputFormTextProps) {
  return (
    <>
      <Form.Group className={`${className} ${marginBottom ? "mb-3" : ""} w-100`}>
        <Form.Label className="d-block">
          {label && (<p className="mb-1 text-black">{label}</p>)}
          <Form.Control
            className={`bg-light border-1 placeholder-text ${formClassName}`}
            name={typeName}
            onChange={setFormProp}
            autoComplete="off"
            placeholder={placeholder}
            maxLength={maxLength}
            minLength={minLength}
            as={isTextArea ? "textarea" : "input"}
            required={isRequired}
            value={value ?? ""}
            disabled={disabled}
            ref={isTextArea ? inputRef : undefined}
          />
        </Form.Label>
      </Form.Group>
    </>
  );
}
