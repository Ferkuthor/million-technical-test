"use client";

import React from "react";
import { PropertyImageGallery, PropertyInfo, PropertyActions, PropertyTrace, PropertyOwner } from ".";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PropertyDetailContainerProps {
  property: {
    name: string;
    address: string;
    price: number;
    codeInternal: string;
    year: number;
    images: { file: string; enabled: boolean }[];
    trace: { dateSale: Date; name: string; value: number; tax: number }[];
    owner?: {
      name: string;
      address: string;
      photo: string;
      birthday: Date;
    };
  };
}

export function PropertyDetailContainer({ property }: PropertyDetailContainerProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto p-5 max-w-4xl">
      <div className="flex justify-end mb-6">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <PropertyImageGallery images={property.images} />
        </div>
        <div className="space-y-6">
          <PropertyInfo
            name={property.name}
            address={property.address}
            price={property.price}
            codeInternal={property.codeInternal}
            year={property.year}
          />
          <PropertyActions />
        </div>
      </div>
      {property.trace.length > 0 && (
        <div className="mt-8">
          <PropertyTrace trace={property.trace} />
        </div>
      )}
      {property.owner && (
        <div className="mt-8">
          <PropertyOwner owner={property.owner} />
        </div>
      )}
    </div>
  );
}
