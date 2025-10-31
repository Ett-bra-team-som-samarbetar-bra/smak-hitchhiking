import { Modal } from "react-bootstrap";

interface SmakModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  dialogClassName?: string;
  contentClassName?: string;
  children?: React.ReactNode;
}

export default function SmakModal({
  show,
  onClose,
  title = "",
  className = "", // Style for backdrop
  dialogClassName = "", // Style for ?
  contentClassName = "", // Style for actual modal content
  children
}: SmakModalProps) {
  return (

    <Modal
      style={{
        marginTop: "-30px"
      }}
      show={show}
      onHide={onClose}
      centered
      dialogClassName={`${dialogClassName}`}
      contentClassName={`${contentClassName}`}
      className={`${className}`}

    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{
        paddingBlock: "1.5rem",
        overflowY: "auto",
        maxHeight: "80vh"
      }}
      >
        {children}
      </Modal.Body>
    </Modal>
  );
}
