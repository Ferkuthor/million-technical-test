import { PropertiesClient } from "./__components__/PropertiesList/PropertiesList";
import { PropertyListDto, PaginatedResponseDto } from "./types";
import { fetchProperties } from "./hooks/useProperties";

interface PropertiesPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const searchParamsResolved = await searchParams;

  // Set defaults if not provided
  const fetchParams = {
    page: (searchParamsResolved.page as string) || "1",
    pageSize: (searchParamsResolved.pageSize as string) || "12",
    name: searchParamsResolved.name as string,
    address: searchParamsResolved.address as string,
    minPrice: searchParamsResolved.minPrice as string,
    maxPrice: searchParamsResolved.maxPrice as string,
  };

  let initialData: PaginatedResponseDto<PropertyListDto> | undefined =
    undefined;

  try {
    initialData = await fetchProperties(fetchParams);
  } catch (err) {
    // If server fetch fails, let client handle it
    console.error("Server-side fetch failed:", err);
  }

  return (
    <PropertiesClient initialData={initialData} initialParams={fetchParams} />
  );
}
