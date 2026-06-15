import React from "react";
import { motion } from "framer-motion";

interface RiskGaugeProps {
  score: number;
  threatLevel: "LOW" | "MEDIUM" | "HIGH";
  size?: "sm" | "md" | "lg";
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  threatLevel,
  size = "md",
}) => {
  const getColor = () => {
    if (threatLevel === "HIGH") return "#ef4444";
    if (threatLevel === "MEDIUM") return "#eab308";
    return "#22c55e";
  };

  const getBackgroundColor = () => {
    if (threatLevel === "HIGH") return "from-red-500/10 to-red-600/10";
    if (threatLevel === "MEDIUM") return "from-yellow-500/10 to-yellow-600/10";
    return "from-green-500/10 to-green-600/10";
  };

  const getSizeClasses = () => {
    if (size === "sm") return "w-20 h-20";
    if (size === "lg") return "w-40 h-40";
    return "w-32 h-32";
  };

  const getTextSize = () => {
    if (size === "sm") return "text-lg";
    if (size === "lg") return "text-4xl";
    return "text-3xl";
  };

  const radius = size === "sm" ? 36 : size === "lg" ? 72 : 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div
      className={`flex flex-col items-center justify-center ${getSizeClasses()}`}
    >
      <div
        className={`relative w-full h-full rounded-full bg-gradient-to-br ${getBackgroundColor()} backdrop-blur-sm border border-white/10`}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth="4"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className={`${getTextSize()} font-bold`}
            style={{ color: getColor() }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {Math.round(score)}
          </motion.div>
          <motion.div
            className="text-xs font-semibold uppercase tracking-wider mt-1"
            style={{ color: getColor() }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {threatLevel}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RiskGauge;
