import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface PropertyBasicCardProps {
  id: string;
  imageSrc: string;
  name: string;
  address: string;
  price: string;
  year: number;
}

export function PropertyBasicCard({
  id,
  imageSrc,
  name,
  address,
  price,
  year,
}: PropertyBasicCardProps) {
  return (
    <Card className="pt-0">
      <Image
        src={imageSrc}
        alt={name}
        width={1170}
        height={780}
        className="w-full h-auto rounded-t-lg mb-4"
      />
      <CardHeader>
        <CardTitle>
          <h2>{name}</h2>
        </CardTitle>
        <CardDescription>{address}</CardDescription>
        <CardDescription>{year}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-secondary">{price}</p>
          <Link href={`/properties/${id}`}>
            <Button>
              <Eye /> View
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
