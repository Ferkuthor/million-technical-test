import { PropertiesClient } from "./__components__/PropertiesClient";
import { PropertyListDto, PaginatedResponseDto } from "./types";
import { fetchProperties } from "./hooks/useProperties";

export default async function PropertiesPage() {
  let initialData: PaginatedResponseDto<PropertyListDto> | undefined =
    undefined;

  try {
    initialData = await fetchProperties();
  } catch (err) {
    // If server fetch fails, let client handle it
    console.error("Server-side fetch failed:", err);
  }

  return <PropertiesClient initialData={initialData} />;
}
