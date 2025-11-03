import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Row } from "react-bootstrap";
import { useSmakTopAlert } from "../../context/SmakTopAlertProvider";
import SmakSlideInModal from "../../components/SmakSlideInModal";
import SubmitButton from "../../components/SubmitButton";
import InputFormPassword from "../../components/inputForms/InputFormPassword";
import SmakCard from "../../components/SmakCard";
import SmakButton from "../../components/SmakButton";
import InputFormEmail from "../../components/inputForms/InputFormEmail";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  setshowPage: (show: boolean) => void;
}

export default function LoginModal({ isOpen, onClose, setshowPage }: LoginModalProps) {
  const { login } = useAuth();
  const { showAlert } = useSmakTopAlert();
  const [isLoading, setIsLoading] = useState(false);
  let [userPayload, setUserPayload] = useState<{ email: string; password: string }>({
    email: "",
    password: ""
  });
  const initialPayload = { email: "", password: "" };

  function setUserProp(event: React.ChangeEvent) {
    let { name, value }: { name: string, value: string | null } = event.target as HTMLInputElement;
    setUserPayload({ ...userPayload, [name]: value.trim() });
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await login(userPayload.email, userPayload.password);
      setshowPage(false);
      onClose();

    } catch (error) {
      showAlert({
        message: "Ett fel uppstod vid inloggning. Försök igen.",
        backgroundColor: "danger",
        textColor: "white",
        duration: 5000,
      });

    } finally {
      setIsLoading(false);
    }
  }

  function handleCancel() {
    onClose();
    setUserPayload(initialPayload);
  }

  return (
    <SmakSlideInModal
      className="slide-in-modal-content-scroll "
      isOpen={isOpen}
      onClose={onClose}>

      <Row className="non-interactive pt-4 mx-1">
        <div className="d-flex align-items-center flex-column justify-content-center">
          <i className="login-header-icon" />
          <h1 className="set-font-size-login-modals fw-bold text-primary text-center text-nowrap mt-2">
            Välkommen tillbaka!
          </h1>
        </div>
      </Row>

      <SmakCard className="mt-3 py-4 set-width-login-modals mx-auto">
        <form onSubmit={handleLogin}>
          <InputFormEmail
            label={"E-postadress"}
            placeholder="Ange din e-postadress"
            value={userPayload.email}
            setFormProp={setUserProp} />

          <InputFormPassword
            value={userPayload.password}
            setFormProp={setUserProp}
            label={"Lösenord"}
            placeholder={"Ange ditt lösenord"} >
          </InputFormPassword>

          <SubmitButton
            isLoading={isLoading}
            className="mt-4"
            color={"primary"}>
            Logga in
          </SubmitButton>
        </form>

        <SmakButton
          color="secondary"
          className="mt-2"
          onClick={handleCancel}>
          Avbryt
        </SmakButton>
      </SmakCard>
    </SmakSlideInModal >
  );
}
