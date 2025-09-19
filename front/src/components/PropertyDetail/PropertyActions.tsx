import { Button } from "@/components/ui/button";

export function PropertyActions() {
  return (
    <div className="flex flex-col space-y-2">
      <Button size="lg" className="w-full">
        Contact Agent
      </Button>
      <Button variant="outline" size="lg" className="w-full">
        Schedule Viewing
      </Button>
      <Button variant="secondary" size="lg" className="w-full">
        Save Property
      </Button>
    </div>
  );
}