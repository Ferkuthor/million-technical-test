"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Loading from "../loading";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleViewClick = () => {
    setIsLoading(true);
    router.push(`/properties/${id}`);
  };

  if (isLoading) {
    return <Loading />;
  }

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
          <Button onClick={handleViewClick}>
            <Eye /> View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
