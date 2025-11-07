import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ReturnButton() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  // onClick animation
  const handleGoBack = () => {
    setClicked(true);

    if (window.history.length > 1) {
      navigate(-1);
    }
    setTimeout(() => setClicked(false), 150);
  };

  return (
    <button
      onClick={handleGoBack}
      className={`btn btn-link text-decoration-none p-0 ${clicked ? "text-primary text-grow" : "text-secondary"}`}>
      <i className="bi bi-arrow-left-circle bg-transparent nav-icon-size"></i>
    </button >
  );
}