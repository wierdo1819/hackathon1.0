import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Zap, Target } from "lucide-react";
import type { AnalysisResponse } from "@/types";

interface ThreatDashboardProps {
  analysis: AnalysisResponse | null;
  isLoading?: boolean;
}

export const ThreatDashboard: React.FC<ThreatDashboardProps> = ({
  analysis,
  isLoading = false,
}) => {
  if (!analysis) {
    return (
      <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <div className="flex items-center justify-center h-40 text-slate-400">
          <p className="text-sm">Waiting for analysis...</p>
        </div>
      </Card>
    );
  }

  const getThreatColor = (level: string) => {
    if (level === "HIGH") return "from-red-500/10 to-red-600/10";
    if (level === "MEDIUM") return "from-yellow-500/10 to-yellow-600/10";
    return "from-green-500/10 to-green-600/10";
  };

  const getThreatTextColor = (level: string) => {
    if (level === "HIGH") return "text-red-400";
    if (level === "MEDIUM") return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br ${getThreatColor(
        analysis.threat_level
      )} rounded-lg border border-slate-700 p-6 space-y-6`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Threat Analysis</h3>
          <p className="text-sm text-slate-400 mt-1">Real-time detection</p>
        </div>
        <motion.div
          animate={analysis.threat_level === "HIGH" ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <AlertTriangle
            className={`w-6 h-6 ${getThreatTextColor(analysis.threat_level)}`}
          />
        </motion.div>
      </div>

      {/* Threat Level */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <p className="text-xs text-slate-400 uppercase tracking-wider">
            Threat Level
          </p>
          <p
            className={`text-2xl font-bold mt-2 ${getThreatTextColor(
              analysis.threat_level
            )}`}
          >
            {analysis.threat_level}
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <p className="text-xs text-slate-400 uppercase tracking-wider">
            Risk Score
          </p>
          <p className="text-2xl font-bold mt-2 text-blue-400">
            {Math.round(analysis.risk_score)}%
          </p>
        </div>
      </div>

      {/* Category */}
      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
        <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
          Scam Category
        </p>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-400" />
          <p className="text-sm font-semibold text-white">
            {analysis.category}
          </p>
        </div>
      </div>

      {/* Reasons */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-yellow-400" />
          <p className="text-xs text-slate-400 uppercase tracking-wider">
            Detection Reasons
          </p>
        </div>
        <div className="space-y-2">
          {analysis.reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2 text-sm text-slate-300 bg-slate-800/30 rounded p-2 border border-slate-700/50"
            >
              <span className="text-yellow-400 font-bold mt-0.5">•</span>
              <span>{reason}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
          <motion.div
            className="w-2 h-2 bg-blue-500 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          Analyzing...
        </div>
      )}
    </motion.div>
  );
};

export default ThreatDashboard;
