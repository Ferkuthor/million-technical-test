import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <Link href="/">
          <Image
            src="https://cdn.millionluxury.com/image-resizing?image=https://maustorageprod.blob.core.windows.net/spinfileuat/Spin/Data/Estate/IMG/ceb693ad6b7643fc8c1be271d6a9c068.svg"
            alt="Logo"
            width={120}
            height={32}
            className="invert"
            unoptimized
          />
        </Link>
      </div>
    </header>
  );
}
