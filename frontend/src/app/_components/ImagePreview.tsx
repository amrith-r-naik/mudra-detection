import Image from "next/image";

export default function ImagePreview({
  preview,
  onRemove,
}: {
  preview: string;
  onRemove: () => void;
}) {
  return (
    <div className="group relative mb-4 h-64 w-full">
      <Image
        fill
        src={preview}
        alt="Preview"
        className="rounded-lg border border-[#CA8653] object-contain"
      />
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 hidden rounded-full bg-red-600 px-2 py-1 text-xs text-white group-hover:flex"
      >
        Remove
      </button>
    </div>
  );
}
