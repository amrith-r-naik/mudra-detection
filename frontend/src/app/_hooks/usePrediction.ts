import { useState } from "react";
import { api } from "~/trpc/react";
import toBase64 from "../_utils/toBase64";

export function usePrediction() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<{
    class: string;
    confidence: number;
  } | null>(null);

  const predict = api.predict.classify.useMutation({
    onSuccess: setResult,
    onError: console.error,
  });

  const savePrediction = api.savePrediction.save.useMutation({
    onSuccess: () => console.log("Saved"),
    onError: (err) => console.error("Save failed", err),
  });

  const handleFileChange = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!image) return;
    const base64 = await toBase64(image);
    predict.mutate({ imageUrl: base64.split(",")[1] ?? "" });
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    predict.reset();
  };

  return {
    image,
    preview,
    result,
    predict,
    savePrediction,
    handleFileChange,
    handleSubmit,
    reset,
  };
}
