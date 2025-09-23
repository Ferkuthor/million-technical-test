import Image from "next/image";

interface PropertyImageGalleryProps {
  images: { file: string; enabled: boolean }[];
}

export function PropertyImageGallery({ images }: PropertyImageGalleryProps) {
  const enabledImages = images.filter((img) => img.enabled);

  if (enabledImages.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative w-full h-64 rounded-lg overflow-hidden">
        <Image
          src={enabledImages[0].file}
          alt="Main property image"
          fill
          className="object-cover"
        />
      </div>
      {enabledImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {enabledImages.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="relative w-full h-16 rounded overflow-hidden"
            >
              <Image
                src={image.file}
                alt={`Property image ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}