"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PropertyBasicCard } from "@/app/properties/__components__/PropertiesList/PropertyBasicCard";
import { Pagination } from "@/app/properties/__components__/PropertiesList/Pagination";
import { PropertiesFilters } from "@/app/properties/__components__/PropertiesList/PropertiesFilters";
import {
  useProperties,
  FetchPropertiesParams,
} from "../../hooks/useProperties";
import { PropertyListDto, PaginatedResponseDto } from "../../types";
import { Loader } from "@/components/ui/loader";

interface PropertiesClientProps {
  initialData?: PaginatedResponseDto<PropertyListDto>;
  currentParams?: FetchPropertiesParams;
}

export function PropertiesClient({
  initialData,
  currentParams: initialParams = { page: "1", pageSize: "12" },
}: PropertiesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentParams, setCurrentParams] = useState(initialParams);

  // Sync with URL parameters
  useEffect(() => {
    const params: FetchPropertiesParams = {
      page: searchParams.get("page") || "1",
      pageSize: searchParams.get("pageSize") || "12",
      name: searchParams.get("name") || undefined,
      address: searchParams.get("address") || undefined,
      minPrice: searchParams.get("minPrice") || undefined,
      maxPrice: searchParams.get("maxPrice") || undefined,
    };
    setCurrentParams(params);
  }, [searchParams]);

  const { data, isLoading, error } = useProperties(
    currentParams,
    initialData &&
      JSON.stringify(currentParams) === JSON.stringify(initialParams)
      ? initialData
      : undefined
  );

  // Detect when we're loading a different page than what's currently displayed
  const isPageTransition =
    isLoading ||
    (data &&
      data.pagination.currentPage !== parseInt(currentParams.page || "1"));

  const handlePageChange = (page: number) => {
    const newParams = { ...currentParams, page: page.toString() };
    setCurrentParams(newParams);
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

  const handleSearch = (searchParamsObj: Partial<FetchPropertiesParams>) => {
    const newParams = { ...searchParamsObj };
    setCurrentParams(newParams as FetchPropertiesParams);
    // Update URL
    const urlParams = new URLSearchParams();
    if (newParams.page && newParams.page !== "1")
      urlParams.set("page", newParams.page);
    if (newParams.pageSize && newParams.pageSize !== "12")
      urlParams.set("pageSize", newParams.pageSize);
    if (newParams.name) urlParams.set("name", newParams.name);
    if (newParams.address) urlParams.set("address", newParams.address);
    if (newParams.minPrice) urlParams.set("minPrice", newParams.minPrice);
    if (newParams.maxPrice) urlParams.set("maxPrice", newParams.maxPrice);

    const newUrl = urlParams.toString() ? `?${urlParams.toString()}` : "";
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
          <PropertiesFilters
            currentParams={currentParams}
            onSearch={handleSearch}
          />
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
