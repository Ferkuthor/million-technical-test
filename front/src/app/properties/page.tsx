import { PropertiesClient } from "./__components__/PropertiesList/PropertiesList";
import { PropertyListDto, PaginatedResponseDto } from "./types";
import { fetchProperties } from "./hooks/useProperties";

interface PropertiesPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  let initialData: PaginatedResponseDto<PropertyListDto> | undefined =
    undefined;

  try {
    initialData = await fetchProperties({ page, pageSize: 12 });
  } catch (err) {
    // If server fetch fails, let client handle it
    console.error("Server-side fetch failed:", err);
  }

  return <PropertiesClient initialData={initialData} currentPage={page} />;
}
