import { useState } from "react";
import SmakModal from "../../components/SmakModal";
import InputFormText from "../../components/inputForms/InputFormText";
import SmakButton from "../../components/SmakButton";
import { Dropdown } from "react-bootstrap";

export default function KalvPage() {

  const [show, setShow] = useState(false);

  function setFormProp(event: React.ChangeEvent) {
    let { name, value }: { name: string, value: string | null } = event.target as HTMLInputElement;
    setPayload({ ...payload, [name]: value.trim() });
  }
  let [payload, setPayload] = useState<{ email: string; password: string }>({
    email: "",
    password: ""
  });

  return (
    <div className="d-flex justify-content-center align-items-center flex-column h-100">
      <h1>KalvPage</h1>
      <button className="btn btn-primary" onClick={() => setShow(true)}>
        öppna modal
      </button>
      <SmakModal
        title="Lägg till bil"
        show={show}
        onClose={() => setShow(false)}
        className=""
        dialogClassName=""
        contentClassName="my-5"
      >
        <InputFormText label="Namn" placeholder="yo" setFormProp={setFormProp} />
        <InputFormText label="Storlek" placeholder="yo" setFormProp={setFormProp} />


        <Dropdown className="flex-1 bg-white mb-3">
          <Dropdown.Toggle variant="primary" id="dropdown-basic" className="w-100 d-flex justify-content-between align-items-center">
            Välj bil
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-100">
            <Dropdown.Item href="#/action-1">OFK 227</Dropdown.Item>
            <Dropdown.Item href="#/action-2">RRK 220</Dropdown.Item>
            <Dropdown.Item href="#/action-3">FKS 103</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <InputFormText label="modell" placeholder="yo" setFormProp={setFormProp} />
        <InputFormText label="Något" placeholder="yo" setFormProp={setFormProp} />

        <InputFormText label="modell" placeholder="yo" setFormProp={setFormProp} />
        <InputFormText label="Något" placeholder="yo" setFormProp={setFormProp} />

        <InputFormText label="modell" placeholder="yo" setFormProp={setFormProp} />
        <InputFormText label="Något" placeholder="yo" setFormProp={setFormProp} />
        <InputFormText label="modell" placeholder="yo" setFormProp={setFormProp} />

        <div className="d-flex gap-3 w-100 mb-3">
          <SmakButton onClick={() => console.log("Spara clicked")} className="flex-1">
            Spara
          </SmakButton>
          <SmakButton onClick={() => setShow(false)} color="warning" className="flex-1">
            Avbryt
          </SmakButton>
        </div>
      </SmakModal>
    </div>
  )
}
