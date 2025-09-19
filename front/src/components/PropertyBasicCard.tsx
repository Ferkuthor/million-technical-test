import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PropertyBasicCardProps {
  imageSrc: string;
  title: string;
  description: string;
  content: string;
}

export function PropertyBasicCard({ imageSrc, title, description, content }: PropertyBasicCardProps) {
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
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}