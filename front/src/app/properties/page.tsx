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
  const params: Record<string, string> = {};
  Object.entries(searchParamsResolved).forEach(([key, value]) => {
    if (value) {
      params[key] = Array.isArray(value) ? value[0] : value;
    }
  });
  if (!params.page) params.page = "1";
  if (!params.pageSize) params.pageSize = "12";

  let initialData: PaginatedResponseDto<PropertyListDto> | undefined =
    undefined;

  try {
    initialData = await fetchProperties(params);
  } catch (err) {
    // If server fetch fails, let client handle it
    console.error("Server-side fetch failed:", err);
  }

  const currentPage = parseInt(params.page);
  return (
    <PropertiesClient initialData={initialData} currentPage={currentPage} />
  );
}
