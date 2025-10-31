import { Button, Row } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import SmakSlideInModal from "../../components/SmakSlideInModal";
import InputFormText from "../../components/inputForms/InputFormText";
import SubmitButton from "../../components/SubmitButton";

export default function LoginOrRegister() {
  const { login } = useAuth();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);








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
    console.log("login");
    setIsLoading(true);


    try {
      /* await login(payload.name, payload.password);
      setShowLoginModal(false);
      commitLogin(); */

      /* setTimeout(() => { console.log("kör"); commitLogin(); }, 3000); */


      await login(payload.name, payload.password);


      //setShowLoginModal(false);
      /* setTimeout(() => {
        commitLogin();
      }, 300); // Wait for modal animation to finish */



    } catch (error) {
      console.error("Login error:", error);
      alert("Ett fel uppstod vid inloggning. Försök igen.");

    } finally {
      setIsLoading(false);
    }
  }






  const loginClicked = async () => {
    setShowLoginModal(true);
  };

  const registerClicked = async () => {
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

      <Row className="dynamic-map-ontop-login px-3 d-flex flex-column">
        <Button
          className="btn btn-light mb-3 rounded-5 py-2 interactive"
          onClick={registerClicked}>
          Registrera
        </Button>

        <Button
          className="btn btn-primary rounded-5 py-2 interactive"
          onClick={loginClicked}>
          Logga in
        </Button>
      </Row >



      {/* Register */}
      <SmakSlideInModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}>


        <Row className="non-interactive">
          <div className="d-flex align-items-center flex-column justify-content-center">
            <i className="login-header-icon" />
            <h1 className="set-font-size fw-bold text-white text-center text-nowrap">
              Registrera <span className="text-white">dig</span>
            </h1>
          </div>
        </Row>



        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <h1>Register!</h1>
        </div>




        {/* id: user?.id,
            username: user?.username,
            email: user?.email,
            firstName: user?.firstName,
            lastName: user?.lastName,
            phoneNumber: user?.phoneNumber,
            description: user?.description,
            rating: user?.rating,
            tripCount: user?.tripCount,
            preferences: preferences, */}
      </SmakSlideInModal>








      {/* Login */}
      <SmakSlideInModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}>



        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <h1>Login!</h1>



          {/* Form */}
          <form onSubmit={handleLogin}>
            <InputFormText
              className="interactive"
              value={payload.name}
              setFormProp={setFormProp}
              typeName={"name"}
              label={""}
              isRequired={true}
              placeholder={"Namn"} >
            </InputFormText>

            <InputFormText
              className="interactive"
              value="Abcd1234!"
              setFormProp={setFormProp}
              typeName={"password"}
              label={""}
              isRequired={true}
              placeholder={"Löäsen"} >
            </InputFormText>

            <SubmitButton
              isLoading={isLoading}
              className="mt-4 interactive"
              color={"primary"}>
              Logga in
            </SubmitButton>
          </form>









        </div>
      </SmakSlideInModal>





    </>
  )
}
