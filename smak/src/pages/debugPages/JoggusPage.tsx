import { useState } from "react";
import InputFormEmail from "../../components/inputForms/InputFormEmail";
import InputFormText from "../../components/inputForms/InputFormText";
import InputFormPassword from "../../components/inputForms/InputFormPassword";
import SubmitButton from "../../components/SubmitButton";
import SmakCard from "../../components/SmakCard";
import DividerLine from "../../components/DividerLine";
import TripCardSmall from "../../components/trip/TripCardSmall";
import TripCardBig from "../../components/trip/TripCardBig";

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
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h1>Joggus - IV</h1>
      <p>Component showcase</p>


      <DividerLine className="mb-4" variant="info" />


      <SmakCard className="mb-2 p-3">
        <SubmitButton
          className="my-3"
          color="primary"
          isLoading={true}>
          Hitta Resa
        </SubmitButton>
      </SmakCard>


      <InputFormEmail
        className="my-3"
        setFormProp={setFormProp}
        label="E-postadress"
        placeholder="Ange din e-postadress" />


      <InputFormText
        className="mb-3"
        setFormProp={setFormProp}
        label="Text Ba"
        placeholder="Text Ba" />


      <SmakCard className="p-3">
        <InputFormPassword
          className="mb-3"
          setFormProp={setFormProp}
          label="Password"
          placeholder="Password" />

        <InputFormText
          className="mb-3"
          setFormProp={setFormProp}
          label="Text area"
          placeholder="Text area"
          isTextArea={true} />
      </SmakCard>

      <TripCardSmall className="mt-3" />

      <TripCardSmall
        className="mt-3"
        firstName="Lena"
        lastName="Handen"
        startTime="15:00"
        endTime="19:30"
        startCity="Stockholm"
        endCity="Malmö"
        rating={4}
        distance={420} />

      <TripCardBig
        className="mt-3"
        firstName="Lena"
        lastName="Handen"
        startTime="15:00"
        endTime="19:30"
        startCity="Stockholm"
        endCity="Malmö"
        rating={4}
        distance={420}
        date="13/03 25"
        vehicleInfo="Keken"
        numOfSeats="42" />



    </div>
  )
}
