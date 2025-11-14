import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Row } from "react-bootstrap";
import { useSmakTopAlert } from "../../context/SmakTopAlertProvider";
import type { RegisterPayload } from "../../interfaces/RegisterPayload";
import SmakSlideInModal from "../../components/SmakSlideInModal";
import InputFormText from "../../components/inputForms/InputFormText";
import SubmitButton from "../../components/SubmitButton";
import InputFormEmail from "../../components/inputForms/InputFormEmail";
import preferenceOptions from "../../interfaces/PreferenceOptions";
import InputFormPassword from "../../components/inputForms/InputFormPassword";
import SmakCard from "../../components/SmakCard";
import SmakButton from "../../components/SmakButton";
import InputFormPreferences from "../../components/inputForms/InputFormPreferences";
import { validatePassword } from "../../utils/passwordValidation";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const { register } = useAuth();
  const { showAlert } = useSmakTopAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [registerPayload, setRegisterPayload] = useState<RegisterPayload>({
    userName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    description: "",
    rating: "5",
    tripCount: "0",
    preferences: [],
  });
  const [preferencesState, setPreferencesState] = useState<string[]>(
    preferenceOptions.map(() => "Ja")
  );

  // Sync preferences with registerPayload
  function handlePreferencesChange(newPreferences: string[]) {
    setPreferencesState(newPreferences);
    setRegisterPayload((prev) => ({
      ...prev,
      preferences: newPreferences,
    }));
  }

  function resetForm() {
    setRegisterPayload({
      userName: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      description: "",
      rating: "5",
      tripCount: "0",
      preferences: [],
    });
    setPreferencesState(preferenceOptions.map(() => "Ja"));
  }

  function setRegisterProp(event: React.ChangeEvent) {
    let { name, value }: { name: string; value: string | File | null } =
      event.target as HTMLInputElement;
    setRegisterPayload({ ...registerPayload, [name]: value });
  }

  async function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    const passwordCheck = validatePassword(registerPayload.password);
    if (!passwordCheck.isValid) {
      showAlert({
        message: "Lösenordet uppfyller inte kraven.",
        backgroundColor: "danger",
        textColor: "white",
      });
      return;
    }
    setIsLoading(true);

    // Map ja/nej to actual preference values
    const mappedPreferences = preferencesState.map((val, i) =>
      val === "Ja"
        ? preferenceOptions[i].options[0]
        : preferenceOptions[i].options[1]
    );

    try {
      await register({ ...registerPayload, preferences: mappedPreferences });
      onClose();
      resetForm();

      setTimeout(() => {
        showAlert({
          message: "Ditt konto har skapats! Du kan nu logga in.",
          backgroundColor: "success",
          textColor: "white",
          duration: 7000,
        });
      }, 500);
    } catch (error) {
      showAlert({
        message:
          error instanceof Error ? error.message : "Ett okänt fel uppstod.",
        backgroundColor: "danger",
        textColor: "white",
        duration: 7000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SmakSlideInModal
      className="slide-in-modal-content-scroll "
      isOpen={isOpen}
      onClose={onClose}
    >
      <Row className="non-interactive pt-4 mx-1">
        <div className="d-flex align-items-center flex-column justify-content-center">
          <i className="login-header-icon" />
          <h1 className="set-font-size-login-modals fw-bold text-primary text-center text-nowrap mt-2">
            Skapa ditt konto
          </h1>
        </div>
      </Row>

      <SmakCard className="mt-3 py-4 set-width-login-modals mx-auto">
        <form onSubmit={handleRegister}>
          <InputFormEmail
            label={"E-postadress"}
            placeholder="Ange din e-postadress"
            value={registerPayload.email}
            setFormProp={setRegisterProp}
          />

          <InputFormPassword
            value={registerPayload.password}
            setFormProp={setRegisterProp}
            label={"Lösenord"}
            placeholder={"Ange ditt lösenord"}
          ></InputFormPassword>

          <InputFormText
            placeholder="Ange ditt förnamn"
            label="Förnamn"
            value={registerPayload.firstName}
            setFormProp={setRegisterProp}
            isRequired={true}
            typeName="firstName"
          />

          <InputFormText
            placeholder="Ange ditt efternamn"
            label="Efternamn"
            value={registerPayload.lastName}
            setFormProp={setRegisterProp}
            isRequired={true}
            typeName="lastName"
          />

          <InputFormText
            placeholder="Ange ditt telefonnummer"
            label="Telefonnummer"
            maxLength={12}
            minLength={6}
            isRequired={true}
            value={registerPayload.phone}
            setFormProp={setRegisterProp}
            typeName="phone"
          />

          <InputFormText
            label="Beskrivning"
            placeholder="Beskriv dig själv med några ord..."
            isTextArea={false}
            maxLength={40}
            isRequired={true}
            value={registerPayload.description}
            setFormProp={setRegisterProp}
            typeName="description"
          />

          <InputFormPreferences
            className="mt-4 pt-1 mb-2"
            preferences={preferenceOptions}
            selectedValues={preferencesState}
            setPreferences={handlePreferencesChange}
          />

          <hr className="mt-4" />

          <SubmitButton
            isLoading={isLoading}
            className="mt-3"
            color={"primary"}
          >
            Skapa konto
          </SubmitButton>
        </form>

        <SmakButton
          color="secondary"
          className="mt-2 mb-2"
          onClick={() => {
            onClose();
            resetForm();
          }}
        >
          Avbryt
        </SmakButton>
      </SmakCard>
    </SmakSlideInModal>
  );
}
