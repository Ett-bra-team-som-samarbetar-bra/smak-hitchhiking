import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button, Row } from "react-bootstrap";
import SmakSlideInModal from "../../components/SmakSlideInModal";
import InputFormText from "../../components/inputForms/InputFormText";
import SubmitButton from "../../components/SubmitButton";
import InputFormPassword from "../../components/inputForms/InputFormPassword";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  setshowPage: (show: boolean) => void;
}

export default function LoginModal({ isOpen, onClose, setshowPage }: LoginModalProps) {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);


  let [userPayload, setUserPayload] = useState<{ name: string; password: string }>({
    name: "thomas@nodehill.com",
    password: "Abcd1234!" // todo
  });

  function setUserProp(event: React.ChangeEvent) {
    let { name, value }: { name: string, value: string | null } = event.target as HTMLInputElement;
    setUserPayload({ ...userPayload, [name]: value.trim() });
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await login(userPayload.name, userPayload.password);
      setshowPage(false);
      onClose();

    } catch (error) {
      alert("Ett fel uppstod vid registrering. Försök igen.");

    } finally {
      setIsLoading(false);
    }
  }


  return (
    <SmakSlideInModal
      isOpen={isOpen}
      onClose={onClose}>

      <Row className="non-interactive">
        <div className="d-flex align-items-center flex-column justify-content-center">
          <i className="login-header-icon" />
          <h1 className="set-font-size fw-bold text-black text-center text-nowrap">
            Logga in
          </h1>
        </div>
      </Row>

      <form onSubmit={handleLogin}>
        <InputFormText
          className="interactive"
          value={userPayload.name}
          setFormProp={setUserProp}
          typeName={"name"}
          label={"Email address"}
          isRequired={true}
          placeholder={"Namn"} >
        </InputFormText>

        <InputFormPassword
          className="interactive"
          value={userPayload.password}
          setFormProp={setUserProp}
          label={"Lösenord"}
          placeholder={"Löäsen"} >
        </InputFormPassword>

        <SubmitButton
          isLoading={isLoading}
          className="mt-4 interactive"
          color={"primary"}>
          Logga in
        </SubmitButton>
      </form>

      <div className="d-flex justify-content-center mt-3">
        <Button variant="danger" onClick={onClose}>Stäng ba</Button>
      </div>

    </SmakSlideInModal >
  );
}
