import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Row } from "react-bootstrap";
import SmakSlideInModal from "../../components/SmakSlideInModal";
import SubmitButton from "../../components/SubmitButton";
import InputFormPassword from "../../components/inputForms/InputFormPassword";
import SmakCard from "../../components/SmakCard";
import SmakButton from "../../components/SmakButton";
import InputFormEmail from "../../components/inputForms/InputFormEmail";
import SmakTopAlert from "../../components/SmakTopAlert";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  setshowPage: (show: boolean) => void;
}

export default function LoginModal({ isOpen, onClose, setshowPage }: LoginModalProps) {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  let [userPayload, setUserPayload] = useState<{ email: string; password: string }>({
    email: "",
    password: ""
  });

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
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 6000);

    } finally {
      setIsLoading(false);
    }
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
          onClick={onClose}>
          Avbryt
        </SmakButton>
      </SmakCard>

      <SmakTopAlert
        show={showAlert}
        textColor="white"
        backgroundColor={"danger"} >
        <p className="m-0">Ett fel uppstod vid inloggningen.</p>
        <p className="m-0">Kontrollera dina uppgifter och försök igen.</p>
      </SmakTopAlert>

    </SmakSlideInModal >
  );
}
