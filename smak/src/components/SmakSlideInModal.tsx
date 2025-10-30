import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Button } from "react-bootstrap";

interface SlideUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function SmakSlideInModal({ isOpen, onClose, children }: SlideUpModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className={`interactive slide-in-modal-backdrop ${isAnimating ? 'active' : ''}`}>
      <div className={`slide-in-modal ${isAnimating ? 'slide-in' : ''}`}>
        <div className="p-3">
          {children}
        </div>

        <Button onClick={onClose}> Close </Button>

      </div>
    </div>
  );
}
