import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";

interface ThreatAlertProps {
  threatLevel: "LOW" | "MEDIUM" | "HIGH";
  message: string;
  show: boolean;
  onClose?: () => void;
}

export const ThreatAlert: React.FC<ThreatAlertProps> = ({
  threatLevel,
  message,
  show,
  onClose,
}) => {
  useEffect(() => {
    if (show && threatLevel === "HIGH") {
      // Play alert sound
      const audio = new Audio(
        "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=="
      );
      audio.play().catch(() => {});

      // Flash effect
      const interval = setInterval(() => {
        document.body.style.backgroundColor =
          document.body.style.backgroundColor === "rgb(239, 68, 68)"
            ? ""
            : "rgb(239, 68, 68)";
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        document.body.style.backgroundColor = "";
      }, 1000);
    }
  }, [show, threatLevel]);

  const getStyles = () => {
    if (threatLevel === "HIGH") {
      return {
        bg: "bg-red-500/90",
        border: "border-red-400",
        icon: AlertTriangle,
        textColor: "text-white",
      };
    }
    if (threatLevel === "MEDIUM") {
      return {
        bg: "bg-yellow-500/90",
        border: "border-yellow-400",
        icon: AlertCircle,
        textColor: "text-gray-900",
      };
    }
    return {
      bg: "bg-green-500/90",
      border: "border-green-400",
      icon: CheckCircle,
      textColor: "text-white",
    };
  };

  const styles = getStyles();
  const Icon = styles.icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${styles.bg} border-2 ${styles.border} rounded-lg shadow-2xl max-w-md`}
        >
          <div className="flex items-center gap-4 p-4">
            <Icon className="w-6 h-6 flex-shrink-0" />
            <div className="flex-1">
              <p className={`font-bold ${styles.textColor}`}>{message}</p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className={`text-lg font-bold ${styles.textColor} hover:opacity-70`}
              >
                ×
              </button>
            )}
          </div>

          {threatLevel === "HIGH" && (
            <motion.div
              className="absolute inset-0 rounded-lg border-2 border-red-400"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(239, 68, 68, 0.7)",
                  "0 0 0 10px rgba(239, 68, 68, 0)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThreatAlert;
