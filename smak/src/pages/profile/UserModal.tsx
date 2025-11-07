import { useState } from "react";
import SmakModal from "../../components/SmakModal";
import InputFormText from "../../components/inputForms/InputFormText";
import InputFormEmail from "../../components/inputForms/InputFormEmail";
import InputFormImage from "../../components/inputForms/InputformImage";
import SmakButton from "../../components/SmakButton";
import type User from "../../interfaces/User";
import preferenceOptions from "../../interfaces/PreferenceOptions";
import InputFormPreferences from "../../components/inputForms/InputFormPreferences";

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
    Array.isArray(payload.user.preferences)
      ? payload.user.preferences.map((val, i) =>
        val === preferenceOptions[i].options[0] ? "Ja" : "Nej"
      )
      : preferenceOptions.map(() => "Nej")
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
      onClose={onClose}>

      <InputFormEmail
        placeholder="E-postadress"
        label="E-postadress"
        value={payload.user.email}
        setFormProp={handleChange}
        disabled={true}
      />
      <InputFormText
        placeholder="Förnamn"
        label="Förnamn"
        value={payload.user.firstName}
        setFormProp={handleChange}
        typeName="firstName"
        disabled={!isOwnProfile}
      />

      <InputFormText
        placeholder="Efternamn"
        label="Efternamn"
        value={payload.user.lastName}
        setFormProp={handleChange}
        typeName="lastName"
        disabled={!isOwnProfile}
      />

      <InputFormText
        placeholder="Telefonnummer"
        label="Telefonnummer"
        maxLength={12}
        minLength={6}
        value={payload.user.phoneNumber}
        setFormProp={handleChange}
        typeName="phoneNumber"
        disabled={!isOwnProfile}
      />

      <InputFormText
        placeholder="Beskrivning"
        label="Beskrivning"
        isTextArea={false}
        maxLength={40}
        value={payload.user.description}
        setFormProp={handleChange}
        typeName="description"
        disabled={!isOwnProfile}
      />

      <InputFormImage
        className="mt-3"
        setFormProp={setProfileFile}
        label={"Profilbild"} />

      <InputFormPreferences
        className="mt-4 mb-3"
        preferences={preferenceOptions}
        selectedValues={preferences}
        setPreferences={setPreferences}
      />

      <hr className="mt-4 mb-3" />

      {isOwnProfile && (
        <div className="d-flex gap-3 w-100 pt-2">

          <SmakButton
            className="text-nowrap"
            onClick={() => {
              if (onSave) {
                // Map "Ja"/"Nej" back to the actual preference values
                const mappedPreferences = preferences.map((val, i) =>
                  val === "Ja" ? preferenceOptions[i].options[0] : preferenceOptions[i].options[1]
                );
                const updatedUser = {
                  ...payload.user,
                  preferences: mappedPreferences,
                };
                onSave(updatedUser, profileFile);
              }
            }}>
            Spara ändringar
          </SmakButton>

          <SmakButton
            className="text-nowrap"
            onClick={onClose}
            color="secondary">
            Avbryt
          </SmakButton>

        </div>
      )}
    </SmakModal>
  );
}
