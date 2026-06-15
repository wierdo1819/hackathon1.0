import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PostCallReport } from "@/components/PostCallReport";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import type { ReportData } from "@/types";

export default function ReportPage() {
  const [, setLocation] = useLocation();
  const [report, setReport] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading a report
    // In a real app, this would fetch from the API using a call_id from URL params
    const timer = setTimeout(() => {
      const mockReport: ReportData = {
        report_id: "report_abc123def456",
        call_id: "call_xyz789",
        summary:
          "Call analyzed with 5 transcript chunks. Overall threat level: HIGH. Multiple scam indicators detected including OTP requests, urgency language, and authority impersonation.",
        category: "OTP Scam",
        recommendations:
          "Block the number immediately and report fraud to your bank and local authorities. Do not share any personal or financial information.",
        detected_indicators: [
          "OTP request",
          "Bank impersonation",
          "Urgency language",
          "Account verification",
          "Financial request",
        ],
        risk_progression: [
          { score: 20, timestamp: 10 },
          { score: 45, timestamp: 20 },
          { score: 72, timestamp: 30 },
          { score: 85, timestamp: 40 },
          { score: 92, timestamp: 50 },
        ],
        created_at: new Date().toISOString(),
      };
      setReport(mockReport);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Threat Report
          </h1>
          <p className="text-slate-400">
            Detailed analysis of the detected scam call
          </p>
        </motion.div>

        {/* Content */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-20"
          >
            <div className="space-y-4 text-center">
              <motion.div
                className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-blue-500 mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-slate-400">Loading report...</p>
            </div>
          </motion.div>
        ) : report ? (
          <PostCallReport report={report} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 rounded-lg border border-slate-700 p-12 text-center space-y-6"
          >
            <p className="text-slate-400">No report available</p>
            <Button
              onClick={() => setLocation("/detection")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Start a New Call
            </Button>
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 justify-center pt-8"
        >
          <Button
            onClick={() => setLocation("/detection")}
            variant="outline"
            className="border-slate-600 text-white hover:bg-slate-800"
          >
            Back to Detection
          </Button>
          <Button
            onClick={() => setLocation("/")}
            variant="outline"
            className="border-slate-600 text-white hover:bg-slate-800"
          >
            Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
