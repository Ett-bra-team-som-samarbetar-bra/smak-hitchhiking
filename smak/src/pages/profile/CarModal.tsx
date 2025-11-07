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
      show={show}
      onClose={onClose}>

      <InputFormText
        placeholder="Märke"
        label="Märke"
        isRequired={true}
        value={payload.brand}
        setFormProp={handleChange}
        typeName="brand"
        disabled={!isOwnProfile}
      />
      <InputFormText
        placeholder="Modell"
        label="Modell"
        isRequired={true}
        value={payload.model}
        setFormProp={handleChange}
        typeName="model"
        disabled={!isOwnProfile}
      />
      <InputFormText
        placeholder="Färg"
        label="Färg"
        isRequired={true}
        value={payload.color}
        setFormProp={handleChange}
        typeName="color"
        disabled={!isOwnProfile}
      />
      <InputFormText
        placeholder="Registreringsskylt"
        label="Registreringsskylt"
        isRequired={true}
        value={payload.licensePlate}
        setFormProp={handleChange}
        typeName="licensePlate"
        disabled={!isOwnProfile}
      />
      <InputFormText
        placeholder="Antal platser"
        label="Antal platser"
        isRequired={true}
        value={payload.seats ? payload.seats.toString() : ""}
        setFormProp={handleChange}
        typeName="seats"
        disabled={!isOwnProfile}
      />

      <div className="d-flex gap-3 w-100 pt-2">
        {isOwnProfile && (
          <>
            <SmakButton
              className="text-nowrap"
              onClick={onSave}
              color="primary"
            >
              {/* {isEdit ? "Redigera bil" : "Spara bil"} */}
              Spara bil
            </SmakButton>

            {isEdit && (
              <SmakButton
                className="text-nowrap"
                onClick={onDelete}
                color="danger"
              >
                Ta bort bil
              </SmakButton>
            )}
          </>
        )}
        <SmakButton
          className="text-nowrap"
          onClick={onClose} color="secondary">
          Avbryt
        </SmakButton>
      </div>

    </SmakModal>
  );
}
