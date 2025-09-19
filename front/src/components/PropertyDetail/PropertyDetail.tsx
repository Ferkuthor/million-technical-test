import { PropertyImageGallery } from "./PropertyImageGallery";
import { PropertyInfo } from "./PropertyInfo";
import { PropertyActions } from "./PropertyActions";
import { PropertyTrace } from "./PropertyTrace";
import { PropertyOwner } from "./PropertyOwner";

interface PropertyDetailProps {
  property: {
    name: string;
    address: string;
    price: number;
    codeInternal: string;
    year: number;
    images: { file: string; enabled: boolean }[];
    trace: { dateSale: Date; name: string; value: number; tax: number }[];
    owner?: {
      name: string;
      address: string;
      photo: string;
      birthday: Date;
    };
  };
}

export function PropertyDetail({ property }: PropertyDetailProps) {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <PropertyImageGallery images={property.images} />
        </div>
        <div className="space-y-6">
          <PropertyInfo
            name={property.name}
            address={property.address}
            price={property.price}
            codeInternal={property.codeInternal}
            year={property.year}
          />
          <PropertyActions />
        </div>
      </div>
      {property.trace.length > 0 && (
        <div className="mt-8">
          <PropertyTrace trace={property.trace} />
        </div>
      )}
      {property.owner && (
        <div className="mt-8">
          <PropertyOwner owner={property.owner} />
        </div>
      )}
    </div>
  );
}
