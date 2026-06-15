import { useState, useCallback } from "react";
import { callService } from "@/services/api";
import type { AnalysisResponse, TranscriptChunk } from "@/types";

export const useCallSimulation = () => {
  const [callId, setCallId] = useState<string | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptChunk[]>([]);
  const [currentAnalysis, setCurrentAnalysis] =
    useState<AnalysisResponse | null>(null);
  const [riskProgression, setRiskProgression] = useState<
    Array<{ time: number; risk: number }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCall = useCallback(async (language: string = "en") => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await callService.startCall(language);
      setCallId(response.call_id);
      setIsCallActive(true);
      setTranscript([]);
      setRiskProgression([]);
      return response.call_id;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to start call";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const analyzeChunk = useCallback(
    async (chunk: string, language: string = "en") => {
      if (!callId) {
        setError("No active call");
        return null;
      }

      setIsLoading(true);
      setError(null);
      try {
        const analysis = await callService.analyzeTranscript(chunk, language);

        // Add to transcript
        const newChunk: TranscriptChunk = {
          id: `chunk_${Date.now()}`,
          text: chunk,
          timestamp: Date.now(),
          analysis,
        };
        setTranscript((prev) => [...prev, newChunk]);

        // Update current analysis
        setCurrentAnalysis(analysis);

        // Update risk progression
        setRiskProgression((prev) => [
          ...prev,
          {
            time: prev.length * 10,
            risk: analysis.risk_score,
          },
        ]);

        return analysis;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to analyze transcript";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [callId]
  );

  const endCall = useCallback(async () => {
    if (!callId) {
      setError("No active call");
      return null;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await callService.endCall(callId);
      setIsCallActive(false);
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to end call";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [callId]);

  const resetCall = useCallback(() => {
    setCallId(null);
    setIsCallActive(false);
    setTranscript([]);
    setCurrentAnalysis(null);
    setRiskProgression([]);
    setError(null);
  }, []);

  return {
    callId,
    isCallActive,
    transcript,
    currentAnalysis,
    riskProgression,
    isLoading,
    error,
    startCall,
    analyzeChunk,
    endCall,
    resetCall,
  };
};
