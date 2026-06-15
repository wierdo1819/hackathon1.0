import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, PhoneOff, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CallSimulatorProps {
  isActive: boolean;
  onStart: () => void;
  onEnd: () => void;
  onAddTranscript: (text: string) => void;
}

// Sample scam call transcripts for demo
const SAMPLE_TRANSCRIPTS = [
  "Hello, this is your bank calling. We need to verify your account.",
  "We detected suspicious activity on your account. Please provide your OTP.",
  "Your account will be blocked if you don't verify immediately.",
  "Can you confirm your debit card number for verification?",
  "This is urgent. We need your UPI PIN to secure your account.",
];

export const CallSimulator: React.FC<CallSimulatorProps> = ({
  isActive,
  onStart,
  onEnd,
  onAddTranscript,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isPlaying || !isActive) return;

    const interval = setInterval(() => {
      if (currentIndex < SAMPLE_TRANSCRIPTS.length) {
        onAddTranscript(SAMPLE_TRANSCRIPTS[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, isActive, onAddTranscript]);

  const handleStart = () => {
    onStart();
    setCurrentIndex(0);
  };

  const handleEnd = () => {
    onEnd();
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  const handlePlayPause = () => {
    if (isActive) {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-slate-700 p-6 space-y-6">
        {/* Phone Display */}
        <div className="bg-slate-800 rounded-lg p-6 text-center space-y-4">
          <motion.div
            className="w-16 h-16 rounded-full bg-blue-500/20 mx-auto flex items-center justify-center"
            animate={isActive ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Phone className="w-8 h-8 text-blue-400" />
          </motion.div>

          <div>
            <h3 className="text-lg font-semibold text-white">Incoming Call</h3>
            <p className="text-sm text-slate-400">+91 XXXX XXXX XXX</p>
          </div>

          {isActive && (
            <motion.div
              className="text-2xl font-mono font-bold text-green-400"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {Math.floor(currentIndex * 2)}s
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          {!isActive ? (
            <Button
              onClick={handleStart}
              className="bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              <Phone className="w-4 h-4" />
              Accept Call
            </Button>
          ) : (
            <>
              <Button
                onClick={handlePlayPause}
                variant="outline"
                className="gap-2"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Play
                  </>
                )}
              </Button>
              <Button
                onClick={handleEnd}
                className="bg-red-600 hover:bg-red-700 text-white gap-2"
              >
                <PhoneOff className="w-4 h-4" />
                End Call
              </Button>
            </>
          )}
        </div>

        {/* Progress */}
        {isActive && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Progress</span>
              <span>{currentIndex} / 5</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-blue-500 h-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentIndex / 5) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        {/* Status */}
        <div className="text-center text-xs text-slate-400">
          {!isActive ? (
            <p>Click "Accept Call" to start the simulation</p>
          ) : isPlaying ? (
            <p>Call in progress... Transcript being analyzed</p>
          ) : (
            <p>Call paused. Click "Play" to continue</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallSimulator;
