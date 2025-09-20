"use client";

import { PropertyBasicCard } from "@/app/properties/__components__/PropertyBasicCard/PropertyBasicCard";
import { useProperties } from "../hooks/useProperties";
import { PropertyListDto, PaginatedResponseDto } from "../types";

interface PropertiesClientProps {
  initialData?: PaginatedResponseDto<PropertyListDto>;
}

export function PropertiesClient({ initialData }: PropertiesClientProps) {
  const { data, isLoading, error } = useProperties(initialData);

  return (
    <div className="container mx-auto p-4">
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">
            Error loading properties: {error.message}
          </div>
        </div>
      )}
      {!isLoading && !error && data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.data.map((property) => {
            const imageSrc =
              property.mainImage ||
              "https://via.placeholder.com/1170x780?text=No+Image";

            const price = `$${property.price.toLocaleString()}`;

            return (
              <PropertyBasicCard
                key={property.id}
                id={property.id}
                imageSrc={imageSrc}
                name={property.name}
                address={property.address}
                price={price}
                year={property.year}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
