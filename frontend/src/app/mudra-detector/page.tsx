"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import Image from "next/image";
import AuthGuard from "../_components/AuthGuard";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

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

  const savePrediction = api.savePrediction.save.useMutation({
    onSuccess: () => console.log("Prediction saved successfully!"),
    onError: (err) => console.error("Failed to save prediction:", err),
  });

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleSavePrediction = () => {
    if (result && userId) {
      savePrediction.mutate({
        userId: userId,
        result: result.class,
      });
    }
  };

  useEffect(() => {
    const video = document.getElementById("camera") as HTMLVideoElement;
    if (video) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
        })
        .catch((err) => {
          console.error("Error accessing camera:", err);
        });
    }

    return () => {
      if (video && video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-[#1B212F] to-[#210f37] text-white">
        {/* Navigation Bar */}
        <header className="fixed w-full top-0 z-50 bg-[#1B212F]/80 backdrop-blur-md border-b border-[#CA8653]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#CA8653] to-[#FFFFFF] bg-clip-text text-transparent">
                    MudraGyana
                  </span>
                </Link>
              </div>

              <nav className="flex items-center space-x-8">
                <Link
                  href="/"
                  className="text-[#FFFFFF] hover:text-[#CA8653] transition-colors duration-200 text-sm uppercase tracking-wider font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/#about"
                  className="text-[#FFFFFF] hover:text-[#CA8653] transition-colors duration-200 text-sm uppercase tracking-wider font-medium"
                >
                  About Us
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex min-h-screen flex-col items-center justify-center pt-20 px-4">
          <div className="w-full max-w-md bg-[#241F2A] rounded-xl p-6 shadow-lg border border-[#CA8653]/10">
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#CA8653] to-[#FFFFFF] bg-clip-text text-transparent">
              Mudra Classifier
            </h1>

            <video
              id="camera"
              autoPlay
              className="w-full mb-4 rounded-lg border border-[#CA8653]"
              style={{ display: preview ? "none" : "block" }}
            ></video>
            <canvas id="canvas" style={{ display: "none" }}></canvas>

            <button
              onClick={() => {
                const video = document.getElementById("camera") as HTMLVideoElement;
                const canvas = document.getElementById("canvas") as HTMLCanvasElement;
                const context = canvas.getContext("2d");

                if (video && context) {
                  canvas.width = video.videoWidth;
                  canvas.height = video.videoHeight;
                  context.drawImage(video, 0, 0, canvas.width, canvas.height);
                  canvas.toBlob((blob) => {
                    if (blob) {
                      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
                      setImage(file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }, "image/jpeg");
                }
              }}
              className="w-full mb-4 rounded-lg bg-gradient-to-r from-[#CA8653] to-[#b27242] px-4 py-3 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#CA8653]/20 hover:scale-105"
            >
              Capture Image
            </button>

            <div className="relative mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full rounded-lg border border-[#CA8653] bg-[#1B212F] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CA8653]"
              />
            </div>

            {preview && (
              <div className="relative w-full h-64 mb-4">
                <Image
                  fill
                  src={preview}
                  alt="Preview"
                  className="rounded-lg border border-[#CA8653] object-contain"
                />
              </div>
            )}

            {!predict.isSuccess && (
              <button
                onClick={handleSubmit}
                className="w-full rounded-lg bg-gradient-to-r from-[#CA8653] to-[#b27242] px-4 py-3 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#CA8653]/20 hover:scale-105"
              >
                Predict
              </button>
            )}

            {predict.isPending && (
              <div className="mt-4 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#CA8653] border-t-transparent"></div>
                <p className="mt-2 text-[#FFFFFF]/80">Processing...</p>
              </div>
            )}

            {predict.isError && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-center text-red-500">
                  Error: {predict.error.message}
                </p>
              </div>
            )}

            {predict.isSuccess && result && (
              <div className="mt-6 text-center">
                <span className="text-[#FFFFFF]/60">Prediction:</span>
                <p className="text-2xl font-bold bg-gradient-to-r from-[#CA8653] to-[#FFFFFF] bg-clip-text text-transparent mt-2">
                  {result.class}
                </p>
                <p className="text-sm text-[#FFFFFF]/60 mt-1">
                  Confidence: {(result.confidence * 100).toFixed(2)}%
                </p>

                {!savePrediction.isSuccess ? (
                  <button
                    onClick={handleSavePrediction}
                    className="w-full mt-4 rounded-lg bg-green-600 px-4 py-3 text-white font-medium transition-all duration-200 hover:bg-green-700"
                  >
                    Save Prediction
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full mt-4 rounded-lg bg-[#FFFFFF]/10 px-4 py-3 text-[#FFFFFF]/40 cursor-not-allowed"
                  >
                    Prediction Saved
                  </button>
                )}

                <button
                  onClick={() => {
                    setImage(null);
                    setPreview(null);
                    setResult(null);
                    predict.reset();
                  }}
                  className="w-full mt-4 rounded-lg bg-[#CA8653] px-4 py-3 text-white font-medium transition-all duration-200 hover:bg-[#b37447]"
                >
                  Try Another Image
                </button>
              </div>
            )}
          </div>
        </div>

        
        {/* Footer */}
        <footer className="w-full bg-[#1B212F]/90 backdrop-blur-md border-t border-[#CA8653]/10 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Logo and Copyright */}
              <div className="mb-4 md:mb-0">
                <span className="text-xl font-bold bg-gradient-to-r from-[#CA8653] to-[#FFFFFF] bg-clip-text text-transparent">
                  MudraGyana
                </span>
                <p className="text-sm text-[#FFFFFF]/60 mt-2">
                  © 2024 MudraGyana. All rights reserved.
                </p>
              </div>

              {/* Project Link */}
              <Link
                href="https://github.com/trishashetty19/mudra-detection"
                target="_blank"
                className="text-[#FFFFFF]/80 hover:text-[#CA8653] transition-colors duration-200 flex items-center"
              >
                <FaGithub className="w-5 h-5 mr-2" />
                <span>View Project on GitHub</span>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </AuthGuard>
  );
}

// Helper function
function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}

