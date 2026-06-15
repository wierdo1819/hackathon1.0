import React from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TranscriptChunk } from "@/types";

interface TranscriptViewerProps {
  chunks: TranscriptChunk[];
  isLive?: boolean;
}

export const TranscriptViewer: React.FC<TranscriptViewerProps> = ({
  chunks,
  isLive = false,
}) => {
  const getThreatLevelClass = (threatLevel: string) => {
    if (threatLevel === "HIGH") return "bg-red-500/20 text-red-300";
    if (threatLevel === "MEDIUM") return "bg-yellow-500/20 text-yellow-300";
    return "bg-green-500/20 text-green-300";
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
        <h3 className="font-semibold text-white">Live Transcript</h3>
        {isLive && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs text-red-400">Recording</span>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {chunks.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-slate-400">
              <p className="text-sm">Waiting for transcript...</p>
            </div>
          ) : (
            chunks.map((chunk, index) => (
              <motion.div
                key={chunk.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-700/50 rounded p-3 border border-slate-600"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-400">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-100 break-words">
                      {chunk.text}
                    </p>
                    {chunk.analysis && (
                      <div className="mt-2 pt-2 border-t border-slate-600">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ${getThreatLevelClass(
                              chunk.analysis.threat_level
                            )}`}
                          >
                            {chunk.analysis.threat_level}
                          </span>
                          <span className="text-xs text-slate-400">
                            Risk: {chunk.analysis.risk_score}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TranscriptViewer;
