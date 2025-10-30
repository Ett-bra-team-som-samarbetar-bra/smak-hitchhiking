import { Button, Row } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import SmakSlideInModal from "../../components/SmakSlideInModal";
import InputFormText from "../../components/inputForms/InputFormText";

export default function LoginOrRegister() {
  const { login } = useAuth();
  const [showRegisterModal, setShowRegisterModal] = useState(false);


  // Login TODO
  let [payload, setPayload] = useState<{ name: string; password: string }>({
    name: "tom",
    password: "Abcd1234!"
  });

  function setFormProp(event: React.ChangeEvent) {
    let { name, value }: { name: string, value: string | null } = event.target as HTMLInputElement;
    setPayload({ ...payload, [name]: value.trim() });
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    try {
      await login(payload.name, payload.password);
    } catch (error) {
      console.error("Login error:", error);
      alert("Ett fel uppstod vid inloggning. Försök igen.");
    }
  }



  const handleRegister = async () => {
    console.log("register");
    setShowRegisterModal(true);
  };



  return (
    <>
      {/* Header */}
      <Row className="dynamic-map-ontop-header non-interactive">
        <div className="d-flex align-items-center flex-column justify-content-center">
          <i className="login-header-icon" />
          <h1 className="set-font-size fw-bold text-white text-center text-nowrap">
            Samåk med <span className="text-white">Småk</span>
          </h1>
        </div>
      </Row>

      {/* Buttons */}
      <Row className="dynamic-map-ontop-login px-3 d-flex flex-column">



        {/* TODO */}
        <InputFormText
          value="tom"
          setFormProp={setFormProp}
          typeName={"name"}
          label={""}
          placeholder={"Namn"} >
        </InputFormText>
        <InputFormText
          value="Abcd1234!"
          setFormProp={setFormProp}
          typeName={"password"}
          label={""}
          placeholder={"Löäsen"} >
        </InputFormText>





        <Button
          className="btn btn-light mb-3 rounded-5 py-2"
          onClick={handleRegister}>
          Registrera
        </Button>

        <Button
          className="btn btn-primary rounded-5 py-2"
          onClick={handleLogin}>
          Logga in
        </Button>
      </Row >



      {/* Register */}
      <SmakSlideInModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}>

        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <h1>Hello from Modal!</h1>
        </div>



      </SmakSlideInModal>
    </>
  )
}
