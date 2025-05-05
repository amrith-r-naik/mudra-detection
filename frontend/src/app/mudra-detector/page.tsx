"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import Image from "next/image";
import AuthGuard from "../_components/AuthGuard";
import { useSession } from "next-auth/react";
import Navbar from "../_components/Navbar";
import { motion } from "framer-motion";
import CameraCapture from "../_components/CameraCapture";
import Footer from "../_components/Footer";

export default function HomePage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<{
    class: string;
    confidence: number;
  } | null>(null);

  const predict = api.predict.classify.useMutation({
    onSuccess: (data) => setResult(data),
    onError: (err) => console.error(err),
  });

  const savePrediction = api.savePrediction.save.useMutation({
    onSuccess: () => console.log("Prediction saved successfully!"),
    onError: (err) => console.error("Failed to save prediction:", err),
  });

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!image) return;
    const base64 = await toBase64(image);
    predict.mutate({ imageUrl: base64.split(",")[1] ?? "" });
  };

  const handleSavePrediction = () => {
    if (result && userId) {
      savePrediction.mutate({
        userId,
        result: result.class,
      });
    }
  };

  const resetState = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    predict.reset();
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-[#1B212F] to-[#210f37] text-white">
        <Navbar />

        <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-20">
          <div className="w-full max-w-md rounded-xl border border-[#CA8653]/10 bg-[#241F2A] p-6 shadow-lg">
            <h1 className="mb-8 bg-gradient-to-r from-[#CA8653] to-[#FFFFFF] bg-clip-text text-center text-3xl font-bold text-transparent">
              Mudra Classifier
            </h1>

            {!preview && (
              <CameraCapture
                onCapture={(file: File, preview: string) => {
                  setImage(file);
                  setPreview(preview);
                }}
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4 w-full rounded-lg border border-[#CA8653] bg-[#1B212F] px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#CA8653] focus:outline-none"
            />

            {preview && (
              <div className="relative mb-4 h-64 w-full">
                <Image
                  fill
                  src={preview}
                  alt="Preview"
                  className="rounded-lg border border-[#CA8653] object-contain"
                />
                <button
                  onClick={resetState}
                  className="absolute top-2 right-2 rounded-full bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
                >
                  Retake
                </button>
              </div>
            )}

            {!predict.isSuccess && (
              <button
                onClick={handleSubmit}
                className="mb-4 w-full rounded-lg bg-gradient-to-r from-[#CA8653] to-[#b27242] px-4 py-3 font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#CA8653]/20"
              >
                Predict
              </button>
            )}

            {predict.isPending && (
              <div className="mt-4 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#CA8653] border-t-transparent"></div>
                <p className="mt-2 text-[#FFFFFF]/80">Processing...</p>
              </div>
            )}

            {predict.isError && (
              <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                <p className="text-center text-red-500">
                  Error: {predict.error.message}
                </p>
              </div>
            )}

            {predict.isSuccess && result && (
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-[#FFFFFF]/60">Prediction:</span>
                <p className="mt-2 bg-gradient-to-r from-[#CA8653] to-[#FFFFFF] bg-clip-text text-2xl font-bold text-transparent">
                  {result.class}
                </p>
                <p className="mt-1 text-sm text-[#FFFFFF]/60">
                  Confidence: {(result.confidence * 100).toFixed(2)}%
                </p>

                {!savePrediction.isSuccess ? (
                  <button
                    onClick={handleSavePrediction}
                    className="mt-4 w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition-all duration-200 hover:bg-green-700"
                  >
                    Save Prediction
                  </button>
                ) : (
                  <button
                    disabled
                    className="mt-4 w-full cursor-not-allowed rounded-lg bg-[#FFFFFF]/10 px-4 py-3 text-[#FFFFFF]/40"
                  >
                    Prediction Saved
                  </button>
                )}

                <button
                  onClick={resetState}
                  className="mt-4 w-full rounded-lg bg-[#CA8653] px-4 py-3 font-medium text-white transition-all duration-200 hover:bg-[#b37447]"
                >
                  Try Another Image
                </button>
              </motion.div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </AuthGuard>
  );
}

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}
