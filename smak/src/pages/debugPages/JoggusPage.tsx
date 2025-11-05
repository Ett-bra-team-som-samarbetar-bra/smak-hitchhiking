import { useState } from "react";
import InputFormEmail from "../../components/inputForms/InputFormEmail";
import InputFormText from "../../components/inputForms/InputFormText";
import InputFormPassword from "../../components/inputForms/InputFormPassword";
import SubmitButton from "../../components/SubmitButton";
import SmakCard from "../../components/SmakCard";
import DividerLine from "../../components/DividerLine";
import TripCardSmall from "../../components/trip/TripCardSmall";
import TripCardBig from "../../components/trip/TripCardBig";
import IconButton from "../../components/IconButton";
import SmakButton from "../../components/SmakButton";
import SmakContact from "../../components/SmakContact";

export default function JoggusPage() {

  let [payload, setPayload] = useState<{ email: string; password: string }>({
    email: "",
    password: ""
  });

  function setFormProp(event: React.ChangeEvent) {
    let { name, value }: { name: string, value: string | null } = event.target as HTMLInputElement;
    setPayload({ ...payload, [name]: value.trim() });
  }

  const user = {
    id: "1",
    firstName: "Jocke",
    lastName: "Kek",
    profileImage: "/images/development/user2.png",
    description: "En trevlig kille som gillar långa promenader på stranden och att koda hela natten.",
    rating: 4,
  };



  return (
    <div className="d-flex justify-content-center align-items-center flex-column gap-3">
      <h1>Joggus - IV</h1>
      <p>Component showcase</p>

      <DividerLine className="mb-4" variant="info" />

      <SmakCard className="">
        <SubmitButton
          className="my-3"
          color="primary"
          isLoading={false}>
          submit button
        </SubmitButton>

        <SmakButton >
          onClick button
        </SmakButton >

        <IconButton icon={"bi-check-circle-fill"} className="mt-3" />
      </SmakCard>

      <InputFormEmail
        className="my-3"
        setFormProp={setFormProp}
        label="E-postadress"
        placeholder="Ange din e-postadress" disabled={false} />

      <InputFormText
        className="mb-3"
        setFormProp={setFormProp}
        label="Text Ba"
        placeholder="Text Ba" />

      <SmakCard>
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

      <TripCardSmall
        className=""
        firstName="Lena"
        lastName="Jansson"
        profileImage="/images/development/user2.png"
        startTime="15:00"
        endTime="19:30"
        startCity="Stockholm"
        endCity="Malmö"
        rating={4}
        distance={420} />

      <TripCardBig
        className=""
        firstName="Lena"
        lastName="kekek"
        startTime="15:00"
        endTime="19:30"
        startCity="Stockholm"
        endCity="Malmö"
        rating={4}
        distance={420}
        date="13/03 25"
        vehicleInfo="Keken"
        numOfSeats="42"
        cardButtonType="userBook" />

      <SmakContact
        user={user}
        className=""
        isAddedToTrip={true}
        isDriver={true} />




    </div>
  )
}
