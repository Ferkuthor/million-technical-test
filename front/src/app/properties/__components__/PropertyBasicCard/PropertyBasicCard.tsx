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

interface PropertyBasicCardProps {
  id: string;
  imageSrc: string;
  name: string;
  address: string;
  price: string;
  codeInternal: string;
  year: number;
}

export function PropertyBasicCard({
  id,
  imageSrc,
  name,
  address,
  price,
  codeInternal,
  year,
}: PropertyBasicCardProps) {
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
        <CardTitle>
          <h2>{name}</h2>
        </CardTitle>
        <CardDescription>{address}</CardDescription>
        <CardDescription>Code: {codeInternal}</CardDescription>
        <CardDescription>Year: {year}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-secondary">{price}</p>
          <Link href={`/properties/${id}`}>
            <Button>View</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
