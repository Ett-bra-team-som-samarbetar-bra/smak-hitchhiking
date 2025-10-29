import SmakModal from "../../components/SmakModal";
import InputFormText from "../../components/inputForms/InputFormText";
import InputFormEmail from "../../components/inputForms/InputFormEmail";

interface UserModalProps {
    show: boolean;
    onClose: () => void;
    payload: { username: string; email: string; firstName: string; lastName: string; phone: string; description: string; rating: number; tripCount: number };
    setPayload: React.Dispatch<React.SetStateAction<{ username: string; email: string; firstName: string; lastName: string; phone: string; description: string; rating: number; tripCount: number }>>;
    isEdit?: boolean;
    isOwnProfile?: boolean;
}

/*interface InputFormEmailProps {
  setFormProp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  value?: string;
  className?: string;
}*/

export default function UserModal({
    show,
    onClose,
    payload,
    setPayload,
    isEdit = false,
    isOwnProfile = true }:
    UserModalProps) {
    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setPayload({ ...payload, [name]: value });
    }

    return (
        <SmakModal title={isEdit ? "Redigera profil" : "Användarprofil"} show={show} onClose={onClose}>
            <InputFormText
                placeholder="förnamn"
                label="Förnamn"
                value={payload.firstName}
                setFormProp={handleChange}
                typeName="firstName"
                disabled={!isOwnProfile}
            />
            <InputFormEmail placeholder="email"
                label="Email"
                value={payload.email}
                setFormProp={handleChange}
                disabled={!isOwnProfile} />
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
        </SmakModal>
    );
}