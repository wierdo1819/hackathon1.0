import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Download,
  Share2,
} from "lucide-react";
import type { ReportData } from "@/types";

interface PostCallReportProps {
  report: ReportData;
  onClose?: () => void;
}

export const PostCallReport: React.FC<PostCallReportProps> = ({
  report,
  onClose,
}) => {
  const getThreatIcon = () => {
    if (report.category.includes("HIGH")) return AlertTriangle;
    if (report.category.includes("MEDIUM")) return AlertCircle;
    return CheckCircle;
  };

  const getThreatColor = () => {
    if (report.category.includes("HIGH")) return "text-red-400";
    if (report.category.includes("MEDIUM")) return "text-yellow-400";
    return "text-green-400";
  };

  const ThreatIcon = getThreatIcon();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 p-8 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ThreatIcon className={`w-8 h-8 ${getThreatColor()}`} />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-white">Threat Report</h2>
              <p className="text-sm text-slate-400 mt-1">
                Call ID: {report.call_id}
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-2xl"
            >
              ×
            </button>
          )}
        </div>

        {/* Risk Score */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 text-center"
          >
            <p className="text-xs text-slate-400 uppercase tracking-wider">
              Final Score
            </p>
            <p className="text-3xl font-bold text-blue-400 mt-2">
              {Math.round(parseFloat(report.category.split(" ")[0]) || 0)}%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 text-center"
          >
            <p className="text-xs text-slate-400 uppercase tracking-wider">
              Threat Level
            </p>
            <p className={`text-2xl font-bold mt-2 ${getThreatColor()}`}>
              HIGH
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 text-center"
          >
            <p className="text-xs text-slate-400 uppercase tracking-wider">
              Category
            </p>
            <p className="text-sm font-bold text-white mt-2">
              {report.category}
            </p>
          </motion.div>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/30 rounded-lg p-4 border border-slate-700"
        >
          <h3 className="font-semibold text-white mb-2">Summary</h3>
          <p className="text-sm text-slate-300">{report.summary}</p>
        </motion.div>

        {/* Detected Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-semibold text-white mb-3">Detected Indicators</h3>
          <div className="flex flex-wrap gap-2">
            {report.detected_indicators.map((indicator, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-semibold border border-red-500/30"
              >
                {indicator}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/30"
        >
          <h3 className="font-semibold text-yellow-300 mb-2">
            Recommended Actions
          </h3>
          <p className="text-sm text-slate-300">{report.recommendations}</p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-4 pt-4 border-t border-slate-700"
        >
          <Button
            variant="outline"
            className="gap-2 flex-1"
            onClick={() => window.print()}
          >
            <Download className="w-4 h-4" />
            Download Report
          </Button>
          <Button
            variant="outline"
            className="gap-2 flex-1"
            onClick={() => {
              navigator.share?.({
                title: "SurakshaAI Threat Report",
                text: "Check this threat report from SurakshaAI",
              });
            }}
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default PostCallReport;
