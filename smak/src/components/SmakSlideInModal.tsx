import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface SlideUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export default function SmakSlideInModal({ isOpen, children, className = "" }: SlideUpModalProps) {
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className={`non-interactive slide-in-modal-backdrop ${isAnimating ? 'active' : ''} ${className}`}>
      <div className={`slide-in-modal ${isAnimating ? 'slide-in' : ''} interactive`}>
        <div className="p-3 slide-in-modal-content-scroll interactive">
          {children}
        </div>
      </div>
    </div>
  );
}
