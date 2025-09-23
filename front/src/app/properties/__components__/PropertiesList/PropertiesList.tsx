"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PropertyBasicCard } from "@/app/properties/__components__/PropertiesList/PropertyBasicCard";
import { Pagination } from "@/app/properties/__components__/PropertiesList/Pagination";
import { PropertiesFilters } from "@/app/properties/__components__/PropertiesList/PropertiesFilters";
import { FetchPropertiesParams } from "../../hooks/useProperties";
import { PropertyListDto, PaginatedResponseDto } from "../../types";
import { Loader } from "@/components/ui/loader";
import { usePropertiesStore } from "@/app/properties/stores/propertiesStore";

interface PropertiesClientProps {
  initialData?: PaginatedResponseDto<PropertyListDto>;
  initialParams?: FetchPropertiesParams;
}

export function PropertiesClient({
  initialData,
  initialParams = { page: "1", pageSize: "12" },
}: PropertiesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    data,
    loading,
    error,
    pagination,
    filters,
    initialize,
    setPagination,
    setFilters,
    fetchData,
    resetFilters,
  } = usePropertiesStore();

  // Initialize store with SSR data
  useEffect(() => {
    if (initialData) {
      initialize(initialData, initialParams);
    }
  }, [initialData, initialParams, initialize]);

  // Sync store with URL parameters on mount/client navigation
  useEffect(() => {
    const params: FetchPropertiesParams = {
      page: searchParams.get("page") || "1",
      pageSize: searchParams.get("pageSize") || "12",
      name: searchParams.get("name") || "",
      address: searchParams.get("address") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    };

    setFilters({
      name: params.name || "",
      address: params.address || "",
      minPrice: params.minPrice || "",
      maxPrice: params.maxPrice || "",
    });
    setPagination({
      page: parseInt(params.page || "1"),
      pageSize: parseInt(params.pageSize || "12"),
    });
  }, [searchParams, setFilters, setPagination]);

  // Detect when we're loading a different page than what's currently displayed
  const isPageTransition =
    loading || (data && data.pagination.currentPage !== pagination.page);

  const handlePageChange = async (page: number) => {
    setPagination({ page });
    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    const newUrl = params.toString() ? `?${params.toString()}` : "";
    router.replace(`/properties${newUrl}`);
    // Fetch data
    await fetchData();
  };

  const handleSearch = async (
    searchParamsObj: Partial<FetchPropertiesParams>
  ) => {
    const newFilters = {
      name: searchParamsObj.name || "",
      address: searchParamsObj.address || "",
      minPrice: searchParamsObj.minPrice || "",
      maxPrice: searchParamsObj.maxPrice || "",
    };
    setFilters(newFilters);
    setPagination({ page: 1 }); // Reset to first page

    // Update URL
    const urlParams = new URLSearchParams();
    if (searchParamsObj.page && searchParamsObj.page !== "1")
      urlParams.set("page", searchParamsObj.page);
    if (searchParamsObj.pageSize && searchParamsObj.pageSize !== "12")
      urlParams.set("pageSize", searchParamsObj.pageSize);
    if (searchParamsObj.name) urlParams.set("name", searchParamsObj.name);
    if (searchParamsObj.address)
      urlParams.set("address", searchParamsObj.address);
    if (searchParamsObj.minPrice)
      urlParams.set("minPrice", searchParamsObj.minPrice);
    if (searchParamsObj.maxPrice)
      urlParams.set("maxPrice", searchParamsObj.maxPrice);

    const newUrl = urlParams.toString() ? `?${urlParams.toString()}` : "";
    router.replace(`/properties${newUrl}`);
    // Fetch data
    await fetchData();
  };

  const handleReset = async () => {
    resetFilters();
    // Update URL to reset
    const newUrl = "";
    router.replace(`/properties${newUrl}`);
    // Fetch data
    await fetchData();
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
            Error loading properties: {error}
          </div>
        </div>
      )}
      {!isPageTransition && !error && data && (
        <>
          <PropertiesFilters
            currentParams={{
              page: pagination.page.toString(),
              pageSize: pagination.pageSize.toString(),
              name: filters.name || "",
              address: filters.address || "",
              minPrice: filters.minPrice || "",
              maxPrice: filters.maxPrice || "",
            }}
            onSearch={handleSearch}
            onReset={handleReset}
          />
          {data.data.length > 0 ? (
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
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">No properties found</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
