import { Button } from "@/components/ui/button";
import { Phone, Calendar, Heart } from "lucide-react";

export function PropertyActions() {
  return (
    <div className="flex flex-col space-y-3 items-center">
      <Button size="default" className="w-64 bg-primary ">
        <Phone className="w-4 h-4 mr-2" />
        Contact Agent
      </Button>
      <Button variant="outline" size="default" className="w-64">
        <Calendar className="w-4 h-4 mr-2" />
        Schedule Viewing
      </Button>
      <Button variant="secondary" size="default" className="w-64">
        <Heart className="w-4 h-4 mr-2" />
        Save Property
      </Button>
    </div>
  );
}