import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button, Row } from "react-bootstrap";
import type { RegisterPayload } from "../../interfaces/RegisterPayload";
import SmakSlideInModal from "../../components/SmakSlideInModal";
import InputFormText from "../../components/inputForms/InputFormText";
import SubmitButton from "../../components/SubmitButton";
import InputFormEmail from "../../components/inputForms/InputFormEmail";
import InputFormRadioGroups from "../../components/inputForms/InputFormRadioGroups";
import preferenceOptions from "../../interfaces/PreferenceOptions";
import InputFormPhoneNumber from "../../components/inputForms/InputFormPhoneNumber";
import InputFormPassword from "../../components/inputForms/InputFormPassword";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [registerPayload, setRegisterPayload] = useState<RegisterPayload>({
    userName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: 0,
    description: "",
    preferences: [],
  });

  const [preferences, setPreferencesState] = useState<string[]>(
    registerPayload.preferences || []
  );

  // Sync preferences with registerPayload
  function handlePreferencesChange(newPreferences: string[]) {
    setPreferencesState(newPreferences);
    setRegisterPayload((prev) => ({
      ...prev,
      preferences: newPreferences,
    }));
  }

  function setRegisterProp(event: React.ChangeEvent) {
    let { name, value }: { name: string, value: string | File | null } = event.target as HTMLInputElement;
    setRegisterPayload({ ...registerPayload, [name]: value });
  }

  async function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await register({ ...registerPayload, preferences });
      //onClose();

    } catch (error) {
      alert(error);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SmakSlideInModal
      className="slide-in-modal-content-scroll"
      isOpen={isOpen}
      onClose={onClose}>

      <Row className="non-interactive">
        <div className="d-flex align-items-center flex-column justify-content-center">
          <i className="login-header-icon" />
          <h1 className="set-font-size fw-bold text-black text-center text-nowrap">
            Registrera
          </h1>
        </div>
      </Row>



      <form onSubmit={handleRegister}>

        <InputFormEmail
          label="Email"
          placeholder="Ange din email"
          value={registerPayload.email}
          setFormProp={setRegisterProp} />

        <InputFormPassword
          className="interactive"
          value={registerPayload.password}
          setFormProp={setRegisterProp}
          label={"Lösenord"}
          placeholder={"Ange ditt lösenord"} >
        </InputFormPassword>

        <InputFormText
          placeholder="Ange ditt förnamn"
          label="Förnamn"
          value={registerPayload.firstName}
          setFormProp={setRegisterProp}
          isRequired={true}
          typeName="firstName" />

        <InputFormText
          placeholder="Ange ditt efternamn"
          label="Efternamn"
          value={registerPayload.lastName}
          setFormProp={setRegisterProp}
          isRequired={true}
          typeName="lastName" />

        <InputFormPhoneNumber
          placeholder="Ange ditt telefonnummer"
          label="Telefonnummer"
          value={registerPayload.phoneNumber}
          setFormProp={setRegisterProp}
          typeName="phoneNumber" />

        <InputFormText
          placeholder="Beskrivning som visas på din profil"
          label="Beskrivning"
          isTextArea={true}
          maxLength={40}
          isRequired={true}
          value={registerPayload.description}
          setFormProp={setRegisterProp}
          typeName="description" />

        <InputFormRadioGroups
          className="pt-3"
          preferences={preferenceOptions}
          selectedValues={preferences}
          setPreferences={handlePreferencesChange} />

        <SubmitButton
          isLoading={isLoading}
          className="mt-4"
          color={"primary"}>
          Registrera
        </SubmitButton>
      </form>

      <div className="d-flex justify-content-center mt-3">
        <Button variant="danger" onClick={onClose}>Stäng ba</Button>
      </div>

    </SmakSlideInModal>
  );
}
