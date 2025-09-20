import { Loader } from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-64">
      <Loader size="lg" />
    </div>
  );
}
