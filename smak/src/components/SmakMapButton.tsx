import { useState } from "react";
import { Button } from "react-bootstrap";

interface MapCircleButtonProps {
  onClick: () => void;
  className?: string;
  icon: string; // "bi-geo-alt-fill"
  iconClassName?: string;
}

export default function MapCircleButton({
  onClick,
  className = "",
  icon,
  iconClassName = "",
}: MapCircleButtonProps) {
  const [clicked, setClicked] = useState(false);

  const clickedAnimation = async () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 150);
  };

  const handleClick = async () => {
    clickedAnimation();
    onClick();
  };

  return (
    <div className="position-relative d-flex justify-content-end mb-2">
      <Button
        type="button"
        className={`rounded-circle shadow d-flex justify-content-center align-items-center interactive border-0 ${className} ${clicked ? "bg-info" : "bg-light"} `}
        onClick={handleClick}
        style={{ width: "40px", height: "40px" }}
      >
        <i className={`bi ${icon} text-black ${iconClassName}`}></i>
      </Button>
    </div >
  );
}
