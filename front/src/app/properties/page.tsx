import { PropertiesListContainer } from "./__components__";
import { PropertyListDto, PaginatedResponseDto } from "@/lib/types";
import { fetchProperties } from "./hooks/useProperties";

interface PropertiesPageProps {
  searchParams: {
    page?: string;
    pageSize?: string;
    name?: string;
    address?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const searchParamsResolved = await searchParams;

  // Set defaults if not provided
  const fetchParams = {
    ...searchParamsResolved,
    page: searchParamsResolved.page || "1",
    pageSize: searchParamsResolved.pageSize || "12",
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
    <PropertiesListContainer
      initialData={initialData}
      initialParams={fetchParams}
    />
  );
}
