import { useState } from "react";
import SmakModal from "../../components/SmakModal";
import InputFormText from "../../components/inputForms/InputFormText";
import InputFormEmail from "../../components/inputForms/InputFormEmail";
import InputFormImage from "../../components/inputForms/InputformImage";
import SmakButton from "../../components/SmakButton";
import InputFormRadioGroups from "../../components/inputForms/InputFormRadioGroups";
import type User from "../../interfaces/User";
import preferenceOptions from "../../interfaces/PreferenceOptions";

interface UserModalProps {
  show: boolean;
  onClose: () => void;
  payload: {
    user: User;
  };
  setPayload: React.Dispatch<
    React.SetStateAction<{
      user: User;
    } | null>
  >;
  isEdit?: boolean;
  isOwnProfile?: boolean;
  onSave?: (user: User, profileFile?: File | null) => void;
}

export default function UserModal({
  show,
  onClose,
  payload,
  setPayload,
  isEdit = false,
  isOwnProfile = true,
  onSave,
}: UserModalProps) {
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [preferences, setPreferences] = useState<string[]>(
    payload.user.preferences || []
  );

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setPayload((prev) => {
      if (!prev) return prev; // or return null
      return {
        ...prev,
        user: {
          ...prev.user,
          [name]: value,
        },
      };
    });
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
        value={payload.user.email}
        setFormProp={handleChange}
        disabled={true}
      />
      <InputFormText
        placeholder="förnamn"
        label="Förnamn"
        value={payload.user.firstName}
        setFormProp={handleChange}
        typeName="firstName"
        disabled={!isOwnProfile}
      />

      <InputFormText
        placeholder="efternamn"
        label="Efternamn"
        value={payload.user.lastName}
        setFormProp={handleChange}
        typeName="lastName"
        disabled={!isOwnProfile}
      />
      <InputFormText
        placeholder="telefonnummer"
        label="Telefonnummer"
        value={payload.user.phoneNumber}
        setFormProp={handleChange}
        typeName="phone"
        disabled={!isOwnProfile}
      />
      <InputFormText
        placeholder="beskrivning"
        label="Beskrivning"
        isTextArea={true}
        maxLength={40}
        value={payload.user.description}
        setFormProp={handleChange}
        typeName="description"
        disabled={!isOwnProfile}
      />
      <InputFormRadioGroups
        preferences={preferenceOptions}
        selectedValues={preferences}
        setPreferences={setPreferences}
      />
      <InputFormImage setFormProp={setProfileFile} label={"Profilbild"} />

      {isOwnProfile && (
        <div className="d-flex gap-3 w-100 pt-2">
          <SmakButton
            className="text-nowrap"
            onClick={() => {
              if (onSave) {
                const updatedUser = {
                  ...payload.user,
                  preferences: preferences,
                };
                onSave(updatedUser, profileFile);
              }
            }}
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
