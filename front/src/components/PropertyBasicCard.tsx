import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PropertyBasicCardProps {
  imageSrc: string;
  name: string;
  address: string;
  price: string;
}

export function PropertyBasicCard({ imageSrc, name, address, price }: PropertyBasicCardProps) {
  return (
    <Card className="pt-0">
      <Image
        src={imageSrc}
        alt="Property image"
        width={1170}
        height={780}
        className="w-full h-auto rounded-t-lg mb-4"
      />
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{address}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-secondary">{price}</p>
          <Button>View</Button>
        </div>
      </CardContent>
    </Card>
  );
}