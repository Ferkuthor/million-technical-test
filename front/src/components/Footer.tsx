import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-gray-700">
      <div className="container mx-auto px-4 py-4 flex justify-center">
        <Image
          src="https://cdn.millionluxury.com/image-resizing?image=https://maustorageprod.blob.core.windows.net/spinfileuat/Spin/Data/Estate/IMG/ceb693ad6b7643fc8c1be271d6a9c068.svg"
          alt="Logo"
          width={120}
          height={32}
          unoptimized
        />
      </div>
    </footer>
  );
}
