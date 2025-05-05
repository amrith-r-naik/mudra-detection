import React from "react";

export default function FileUpload({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="file"
      accept="image/*"
      onChange={onChange}
      className="w-full rounded-lg border border-[#CA8653] bg-[#1B212F] px-4 py-3 text-white"
    />
  );
}
