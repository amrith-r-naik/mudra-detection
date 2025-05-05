import { motion } from "framer-motion";

interface PredictionResultProps {
  result: {
    class: string;
    confidence: number;
  };
  onSave: () => void;
  onReset: () => void;
  isSaved: boolean;
}

export default function PredictionResult({
  result,
  onSave,
  onReset,
  isSaved,
}: PredictionResultProps) {
  return (
    <motion.div
      className="mt-6 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-[#FFFFFF]/60">Prediction:</p>
      <p className="mt-2 bg-gradient-to-r from-[#CA8653] to-[#FFFFFF] bg-clip-text text-2xl font-bold text-transparent">
        {result.class}
      </p>
      <p className="mt-1 text-sm text-[#FFFFFF]/60">
        Confidence: {(result.confidence * 100).toFixed(2)}%
      </p>

      <button
        onClick={onSave}
        disabled={isSaved}
        className={`mt-4 w-full rounded-lg ${
          isSaved
            ? "cursor-not-allowed bg-[#FFFFFF]/10 text-[#FFFFFF]/40"
            : "bg-green-600 hover:bg-green-700"
        } px-4 py-3 font-medium text-white`}
      >
        {isSaved ? "Prediction Saved" : "Save Prediction"}
      </button>

      <button
        onClick={onReset}
        className="mt-4 w-full rounded-lg bg-[#CA8653] px-4 py-3 text-white hover:bg-[#b37447]"
      >
        Try Another Image
      </button>
    </motion.div>
  );
}
