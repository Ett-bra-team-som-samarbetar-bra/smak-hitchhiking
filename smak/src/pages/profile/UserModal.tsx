import SmakModal from "../../components/SmakModal";
import InputFormText from "../../components/inputForms/InputFormText";
import InputFormEmail from "../../components/inputForms/InputFormEmail";
import InputFormImage from "../../components/inputForms/InputformImage";
import SmakButton from "../../components/SmakButton";
import InputFormRadioGroups from "../../components/inputForms/InputFormRadioGroups";
import { useState } from "react";

interface UserModalProps {
  show: boolean;
  onClose: () => void;
  payload: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    description: string;
    rating: number;
    tripCount: number;
    preferences: string[];
  };
  setPayload: React.Dispatch<
    React.SetStateAction<{
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
      description: string;
      rating: number;
      tripCount: number;
      preferences: string[];
    }>
  >;
  isEdit?: boolean;
  isOwnProfile?: boolean;
}

interface PreferenceOption {
  label: string;
  options: [string, string];
}

export default function UserModal({
  show,
  onClose,
  payload,
  setPayload,
  isEdit = false,
  isOwnProfile = true,
}: UserModalProps) {
  const [preferences, setPreferences] = useState<string[]>(
    payload.preferences || []
  );

  const preferenceOptions: PreferenceOption[] = [
    { label: "Rökning", options: ["Rökare", "Icke-Rökare"] as const },
    { label: "Djur", options: ["Djurvänlig", "Inga Pälsdjur"] as const },
    { label: "Musik", options: ["Musik", "Utan Musik"] as const },
    { label: "Kultur", options: ["Pratglad", "Tyst"] as const },
  ];

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setPayload({ ...payload, [name]: value });
  }

  return (
    <SmakModal
      title={isEdit ? "Redigera profil" : "Användarprofil"}
      show={show}
      onClose={onClose}
    >
      <InputFormEmail
        placeholder="email"
        label="Email"
        value={payload.email}
        setFormProp={handleChange}
        disabled={!isOwnProfile}
      />
      <InputFormText
        placeholder="förnamn"
        label="Förnamn"
        value={payload.firstName}
        setFormProp={handleChange}
        typeName="firstName"
        disabled={!isOwnProfile}
      />

      <InputFormText
        placeholder="efternamn"
        label="Efternamn"
        value={payload.lastName}
        setFormProp={handleChange}
        typeName="lastName"
        disabled={!isOwnProfile}
      />
      <InputFormText
        placeholder="telefonnummer"
        label="Telefonnummer"
        value={payload.phone}
        setFormProp={handleChange}
        typeName="phone"
        disabled={!isOwnProfile}
      />
      <InputFormText
        placeholder="beskrivning"
        label="Beskrivning"
        isTextArea={true}
        maxLength={40}
        value={payload.description}
        setFormProp={handleChange}
        typeName="description"
        disabled={!isOwnProfile}
      />
      <InputFormRadioGroups
        preferences={preferenceOptions}
        selectedValues={preferences}
        setPreferences={setPreferences}
      />
      <InputFormImage setFormProp={handleChange} label={"Profilbild"} />

      {isOwnProfile && (
        <div className="d-flex gap-3 w-100 pt-2">
          <SmakButton
            className="text-nowrap"
            onClick={() => console.log("Spara ändringar")}
          >
            Spara ändringar
          </SmakButton>
          <SmakButton
            className="text-nowrap"
            onClick={onClose}
            color="secondary"
          >
            Avbryt
          </SmakButton>
        </div>
      )}
    </SmakModal>
  );
}
