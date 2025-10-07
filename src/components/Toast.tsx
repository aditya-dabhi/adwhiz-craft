import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ message, type, onClose, duration = 4000 }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const Icon = type === "success" ? CheckCircle2 : XCircle;
  const bgColor = type === "success" ? "bg-primary" : "bg-destructive";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className={`${bgColor} text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 max-w-md`}>
        <Icon className="w-5 h-5 flex-shrink-0" />
        <p className="font-medium text-sm flex-1">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-white rounded"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
