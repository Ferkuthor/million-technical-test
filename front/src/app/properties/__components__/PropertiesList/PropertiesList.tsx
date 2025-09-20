"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PropertyBasicCard } from "@/app/properties/__components__/PropertiesList/PropertyBasicCard";
import { Pagination } from "@/app/properties/__components__/PropertiesList/Pagination";
import { useProperties } from "../../hooks/useProperties";
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
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize] = useState(12); // You can make this configurable if desired

  // Sync with URL parameters
  useEffect(() => {
    const pageFromUrl = searchParams.get("page");
    const page = pageFromUrl ? parseInt(pageFromUrl) : 1;
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParams]); // Remove currentPage from dependencies to avoid infinite loop

  const { data, isLoading, error } = useProperties(
    { page: currentPage, pageSize },
    initialData && currentPage === initialPage ? initialData : undefined
  );

  // Detect when we're loading a different page than what's currently displayed
  const isPageTransition =
    isLoading || (data && data.pagination.currentPage !== currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
