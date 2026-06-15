import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CallSimulator } from "@/components/CallSimulator";
import { TranscriptViewer } from "@/components/TranscriptViewer";
import { RiskGauge } from "@/components/RiskGauge";
import { ThreatAlert } from "@/components/ThreatAlert";
import { ThreatDashboard } from "@/components/ThreatDashboard";
import { RiskTrendChart } from "@/components/RiskTrendChart";
import { useCallSimulation } from "@/hooks/useCallSimulation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function DetectionPage() {
  const [, setLocation] = useLocation();
  const { language } = useLanguage();
  const {
    callId,
    isCallActive,
    transcript,
    currentAnalysis,
    riskProgression,
    startCall,
    analyzeChunk,
    endCall,
    resetCall,
  } = useCallSimulation();

  const [alertVisible, setAlertVisible] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  useEffect(() => {
    if (currentAnalysis && currentAnalysis.threat_level === "HIGH") {
      setAlertVisible(true);
    }
  }, [currentAnalysis]);

  const handleStartCall = async () => {
    try {
      await startCall(language);
    } catch (error) {
      console.error("Failed to start call:", error);
    }
  };

  const handleEndCall = async () => {
    try {
      await endCall();
      setCallEnded(true);
    } catch (error) {
      console.error("Failed to end call:", error);
    }
  };

  const handleAddTranscript = async (text: string) => {
    try {
      await analyzeChunk(text, language);
    } catch (error) {
      console.error("Failed to analyze chunk:", error);
    }
  };

  const handleReset = () => {
    resetCall();
    setCallEnded(false);
    setAlertVisible(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 py-8">
      {/* Alert */}
      <ThreatAlert
        threatLevel={currentAnalysis?.threat_level || "LOW"}
        message={
          currentAnalysis?.threat_level === "HIGH"
            ? "Potential Scam Detected. Do not share OTP, bank details, or UPI PIN."
            : currentAnalysis?.threat_level === "MEDIUM"
              ? "Suspicious Activity Detected. Be cautious with personal information."
              : "Call appears safe."
        }
        show={alertVisible && isCallActive}
        onClose={() => setAlertVisible(false)}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Live Scam Detection
          </h1>
          <p className="text-slate-400">
            Real-time AI-powered threat analysis during calls
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Call Simulator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CallSimulator
              isActive={isCallActive}
              onStart={handleStartCall}
              onEnd={handleEndCall}
              onAddTranscript={handleAddTranscript}
            />
          </motion.div>

          {/* Middle Column - Transcript and Risk Gauge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Risk Gauge */}
            <div className="flex justify-center">
              <RiskGauge
                score={currentAnalysis?.risk_score || 0}
                threatLevel={currentAnalysis?.threat_level || "LOW"}
                size="md"
              />
            </div>

            {/* Transcript */}
            <div className="h-96">
              <TranscriptViewer chunks={transcript} isLive={isCallActive} />
            </div>
          </motion.div>

          {/* Right Column - Dashboard and Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Threat Dashboard */}
            <ThreatDashboard analysis={currentAnalysis} isLoading={isCallActive} />

            {/* Risk Trend Chart */}
            <div className="h-80">
              <RiskTrendChart data={riskProgression} />
            </div>
          </motion.div>
        </div>

        {/* Call Ended State */}
        {callEnded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30 p-8 text-center space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">
                Call Analysis Complete
              </h2>
              <p className="text-slate-300">
                View the detailed threat report for this call
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setLocation("/report")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
              >
                View Report
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-800 px-6 py-3"
              >
                Start New Call
              </Button>
            </div>
          </motion.div>
        )}

        {/* Info Box */}
        {!isCallActive && !callEnded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-500/10 rounded-lg border border-blue-500/30 p-6 text-center"
          >
            <p className="text-slate-300">
              Click "Accept Call" to start the simulation and see real-time scam detection in action
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
