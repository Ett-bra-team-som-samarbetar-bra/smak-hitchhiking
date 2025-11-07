import InputFormNumber from "../../components/inputForms/InputFormNumber";
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
  isOwnProfile = true
}: CarModalProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setPayload({ ...payload, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (onSave) onSave();
  }

  return (
    <SmakModal
      title={title}
      show={show}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <InputFormText
          placeholder="Märke"
          label="Märke"
          minLength={2}
          isRequired={true}
          value={payload.brand}
          setFormProp={handleChange}
          typeName="brand"
          disabled={!isOwnProfile}
        />
        <InputFormText
          placeholder="Modell"
          label="Modell"
          minLength={2}
          isRequired={true}
          value={payload.model}
          setFormProp={handleChange}
          typeName="model"
          disabled={!isOwnProfile}
        />
        <InputFormText
          placeholder="Färg"
          label="Färg"
          minLength={2}
          isRequired={true}
          value={payload.color}
          setFormProp={handleChange}
          typeName="color"
          disabled={!isOwnProfile}
        />
        <InputFormText
          placeholder="Registreringsskylt"
          label="Registreringsskylt"
          minLength={6}
          isRequired={true}
          value={payload.licensePlate}
          setFormProp={handleChange}
          typeName="licensePlate"
          disabled={!isOwnProfile}
        />
        <InputFormNumber
          placeholder="Antal platser"
          label="Antal platser"
          value={payload.seats ? payload.seats : 0}
          setFormProp={handleChange}
          typeName="seats"
        />

        <div className="d-flex gap-3 w-100 pt-2">
          {isOwnProfile && (
            <>
              <SmakButton
                className="text-nowrap"
                type="submit"
                color="primary"
              >
                Spara bil
              </SmakButton>

              {isEdit && (
                <SmakButton
                  className="text-nowrap"
                  type="button"
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
            type="button"
            onClick={onClose}
            color="secondary"
          >
            Avbryt
          </SmakButton>
        </div>
      </form>
    </SmakModal>
  );
}
