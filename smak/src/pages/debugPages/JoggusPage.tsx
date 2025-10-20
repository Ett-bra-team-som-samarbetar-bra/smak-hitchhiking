import { useState } from "react";
import InputFormEmail from "../../components/inputForms/InputFormEmail";
import InputFormText from "../../components/inputForms/InputFormText";
import InputFormPassword from "../../components/inputForms/InputFormPassword";
import SubmitButton from "../../components/SubmitButton";

export default function JoggusPage() {

  let [payload, setPayload] = useState<{ email: string; password: string }>({
    email: "",
    password: ""
  });

  function setFormProp(event: React.ChangeEvent) {
    let { name, value }: { name: string, value: string | null } = event.target as HTMLInputElement;
    setPayload({ ...payload, [name]: value.trim() });
  }

  return (
    <div className="d-flex justify-content-center align-items-center flex-column h-100">
      <h1>JoggusPage</h1>

      <SubmitButton
        className="mb-1"
        isLoading={true}>
        Hitta Resa
      </SubmitButton>

      <InputFormEmail
        className="mb-1"
        setFormProp={setFormProp}
        label="E-postadress"
        placeholder="Ange din e-postadress" />

      <InputFormText
        className="mb-1"
        setFormProp={setFormProp}
        label="Text Ba"
        placeholder="Text Ba" />

      <InputFormPassword
        className="mb-1"
        setFormProp={setFormProp}
        label="Password"
        placeholder="Password" />

      <InputFormText
        className="mb-1"
        setFormProp={setFormProp}
        label="Text area"
        placeholder="Text area"
        isTextArea={true} />




    </div>
  )
}
