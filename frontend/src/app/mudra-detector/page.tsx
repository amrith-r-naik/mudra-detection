"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import Image from "next/image";
import AuthGuard from "../_components/AuthGuard";
import { useSession } from "next-auth/react";

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
    predict.mutate({ imageUrl: base64.split(",")[1] ?? "" }); // Remove the data URL prefix
  };

  const savePrediction = api.savePrediction.save.useMutation({
    onSuccess: () => console.log("Prediction saved successfully!"),
    onError: (err) => console.error("Failed to save prediction:", err),
  });

  const { data: session } = useSession();
  const userId = session?.user?.id; // Get the user ID from the session

  const handleSavePrediction = () => {
    if (result && userId) {
      savePrediction.mutate({
        userId: userId,
        result: result.class,
      });
    }
  };

  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <div className="flex w-full max-w-md flex-col items-center justify-center rounded-xl bg-white p-6 shadow-lg">
          <h1 className="mb-4 text-center text-2xl font-semibold">
            Mudra Classifier
          </h1>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />

          {preview && (
            <Image
              height={256}
              width={200}
              src={preview}
              alt="Preview"
              className="mb-4 rounded"
            />
          )}

          {!predict.isSuccess && (
            <button
              onClick={handleSubmit}
              className="w-full rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Predict
            </button>
          )}

          {predict.isPending && <p className="mt-4 text-center">Loading...</p>}
          {predict.isError && (
            <p className="mt-4 text-center text-red-500">
              Error: {predict.error.message}
            </p>
          )}
          {predict.isSuccess && result && (
            <div className="mt-4 text-center">
              <span className="text-gray-700">Prediction:</span>
              <p className="text-xl font-bold text-green-600">{result.class}</p>
              <p className="text-sm text-gray-500">
                Confidence: {(result.confidence * 100).toFixed(2)}%
              </p>
            </div>
          )}

          {result && savePrediction.isSuccess && (
            <button
              disabled
              className="mt-4 w-full cursor-not-allowed rounded bg-gray-400 px-4 py-2 text-white"
            >
              Prediction Saved
            </button>
          )}
          {result && !savePrediction.isSuccess && (
            <button
              onClick={handleSavePrediction}
              className="mt-4 w-full rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
            >
              Save Prediction
            </button>
          )}

          {result && (
            <button
              onClick={() => {
                setImage(null);
                setPreview(null);
                setResult(null);
                predict.reset(); // Reset the mutation state
              }}
              className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Try Another Image
            </button>
          )}
        </div>
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
