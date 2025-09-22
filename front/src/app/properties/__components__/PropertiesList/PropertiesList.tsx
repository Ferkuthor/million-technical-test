"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PropertyBasicCard } from "@/app/properties/__components__/PropertiesList/PropertyBasicCard";
import { Pagination } from "@/app/properties/__components__/PropertiesList/Pagination";
import { PropertiesFilters } from "@/app/properties/__components__/PropertiesList/PropertiesFilters";
import { useProperties } from "../../hooks/useProperties";
import { useFiltersStore } from "../../stores/useFiltersStore";
import { PropertyListDto, PaginatedResponseDto } from "../../types";
import { Loader } from "@/components/ui/loader";

interface PropertiesClientProps {
  initialData?: PaginatedResponseDto<PropertyListDto>;
  currentPage?: number;
}

export function PropertiesClient({
  initialData,
  currentPage: initialPage = 1,
}: PropertiesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pageSize] = useState(12); // You can make this configurable if desired
  const [pageChanging, setPageChanging] = useState(false);
  const { filters } = useFiltersStore();

  const currentPage = parseInt(searchParams.get("page") || "1");

  // Extract all params as strings
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  if (!params.pageSize) params.pageSize = pageSize.toString();

  const { data, isLoading, error } = useProperties(
    params,
    initialData && currentPage === initialPage ? initialData : undefined
  );

  // Reset pageChanging when data matches current page
  useEffect(() => {
    if (data && data.pagination.currentPage === currentPage) {
      setPageChanging(false);
    }
  }, [data, currentPage]);

  // Detect when we're loading a different page than what's currently displayed
  const isPageTransition =
    isLoading ||
    pageChanging ||
    (data && data.pagination.currentPage !== currentPage);

  const handlePageChange = (page: number) => {
    setPageChanging(true);
    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    const newUrl = params.toString() ? `?${params.toString()}` : "";
    router.replace(`/properties${newUrl}`);
  };

  return (
    <div className="container mx-auto p-4">
      {isPageTransition && (
        <div className="flex justify-center items-center h-64">
          <Loader size="lg" />
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">
            Error loading properties: {error.message}
          </div>
        </div>
      )}
      {!isPageTransition && !error && data && (
        <>
          <PropertiesFilters />
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
          <Pagination
            currentPage={data.pagination.currentPage}
            totalPages={data.pagination.totalPages}
            hasNext={data.pagination.hasNext}
            hasPrevious={data.pagination.hasPrevious}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
