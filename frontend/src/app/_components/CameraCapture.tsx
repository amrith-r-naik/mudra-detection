// components/CameraCapture.tsx
"use client";

import React, { useEffect } from "react";

export default function CameraCapture({
  onCapture,
}: {
  onCapture: (file: File, preview: string) => void;
}) {
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
      if (video?.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capture = () => {
    const video = document.getElementById("camera") as HTMLVideoElement;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (video && context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
          const preview = URL.createObjectURL(file);
          onCapture(file, preview);
        }
      }, "image/jpeg");
    }
  };

  return (
    <>
      <video
        id="camera"
        autoPlay
        className="mb-4 w-full rounded-lg border border-[#CA8653]"
      />
      <button
        onClick={capture}
        className="mb-4 w-full rounded-lg bg-gradient-to-r from-[#CA8653] to-[#b27242] px-4 py-3 font-medium text-white hover:scale-105 hover:shadow-lg hover:shadow-[#CA8653]/20"
      >
        Capture Image
      </button>
    </>
  );
}
