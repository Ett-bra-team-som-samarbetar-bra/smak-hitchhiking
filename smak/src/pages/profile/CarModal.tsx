import InputFormText from "../../components/inputForms/InputFormText";
import SmakButton from "../../components/SmakButton";
import SmakModal from "../../components/SmakModal";

interface CarModalProps {
  show: boolean;
  title: string;
  onClose: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  payload: {
    id: string;
    brand: string;
    model: string;
    color: string;
    licensePlate: string;
    seats: number;
  };
  setPayload: React.Dispatch<
    React.SetStateAction<{
      id: string;
      brand: string;
      model: string;
      color: string;
      licensePlate: string;
      seats: number;
    }>
  >;
  isEdit?: boolean;
  isOwnProfile?: boolean;
}


export default function CarModal({
  show,
  onClose,
  title,
  payload,
  setPayload,
  onSave,
  onDelete,
  isEdit = false,
  isOwnProfile = true }:
  CarModalProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setPayload({ ...payload, [name]: value });
  }

  return (
    <SmakModal
      title={title}

      show={show} onClose={onClose}>
      <InputFormText
        placeholder="märke"
        label="Märke"
        value={payload.brand}
        setFormProp={handleChange}
        typeName="brand"
        disabled={!isOwnProfile}
      />
      <InputFormText
        placeholder="modell"
        label="Modell"
        value={payload.model}
        setFormProp={handleChange}
        typeName="model"
        disabled={!isOwnProfile}
      />
      <InputFormText
        placeholder="färg"
        label="Färg"
        value={payload.color}
        setFormProp={handleChange}
        typeName="color"
        disabled={!isOwnProfile}
      />
      <InputFormText
        placeholder="registreringsskylt"
        label="Registreringsskylt"
        value={payload.licensePlate}
        setFormProp={handleChange}
        typeName="licensePlate"
        disabled={!isOwnProfile}
      />
      <InputFormText
        placeholder="antal säten"
        label="Antal säten"
        value={payload.seats ? payload.seats.toString() : ""}
        setFormProp={handleChange}
        typeName="seats"
        disabled={!isOwnProfile}
      />

      {isOwnProfile && (
        <div className="d-flex gap-3 w-100 pt-2">
          <SmakButton
            className="text-nowrap"
            onClick={onSave} color="primary">
            {isEdit ? "Redigera bil" : "Spara bil"}
          </SmakButton>
          <SmakButton
            className="text-nowrap"
            onClick={onClose} color="secondary">Avbryt</SmakButton>

          {isEdit && (
            <SmakButton
              className="text-nowrap"
              onClick={onDelete}
              color="danger"
            >
              Ta bort bil
            </SmakButton>
          )}
        </div>
      )}
    </SmakModal>
  );
}
