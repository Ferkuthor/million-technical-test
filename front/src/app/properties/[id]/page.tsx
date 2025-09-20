import { PropertyDetail } from "./__components__/PropertyDetail/PropertyDetail";
import { fetchPropertyDetail } from "../hooks/useProperties";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = params;

  try {
    const property = await fetchPropertyDetail(id);

    // Transform the data to match component expectations
    const transformedProperty = {
      ...property,
      trace: property.trace.map((trace) => ({
        ...trace,
        dateSale: new Date(trace.dateSale),
      })),
      owner: property.owner
        ? {
            ...property.owner,
            birthday: new Date(property.owner.birthday),
          }
        : undefined,
    };

    return <PropertyDetail property={transformedProperty} />;
  } catch (error) {
    console.error("Error fetching property:", error);
    notFound();
  }
}
