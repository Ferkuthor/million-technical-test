import { PropertyBasicCard } from "@/app/properties/__components__/PropertyBasicCard/PropertyBasicCard";
import { PropertyDetail } from "@/app/properties/[id]/__components__/PropertyDetail/PropertyDetail";
import { Button } from "@/components/ui/button";

export default function Moodboard() {
  return (
    <div className="container mx-auto p-4">
      <section className="mb-10">
        <h1 className="mb-4">Heading 1</h1>
        <h2 className="mb-2">Heading 2</h2>
        <h3 className="mb-2">Heading 3</h3>
        <p className="mb-4">
          This is a paragraph example with some sample text to demonstrate the
          typography styling.
        </p>
      </section>

      <section className="mb-10">
        <h1 className="text-xl font-semibold mb-4">Buttons</h1>
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section className="mb-10">
        <h1 className="text-xl font-semibold mb-4">Property Basic Cards</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <PropertyBasicCard
              key={index}
              id={index.toString()}
              imageSrc="https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/407228689_1.jpg&width=1170"
              name="Luxury Villa"
              address="123 Ocean Drive, Miami, FL"
              price="$2,500,000"
              codeInternal={`PROP-${index + 1}`}
              year={2020 + index}
            />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h1 className="text-xl font-semibold mb-4">Property Detail</h1>
        <PropertyDetail
          property={{
            name: "Luxury Villa",
            address: "123 Ocean Drive, Miami, FL",
            price: 2500000,
            codeInternal: "PROP-1",
            year: 2020,
            images: [
              {
                file: "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/407228689_1.jpg&width=1170",
                enabled: true,
              },
              {
                file: "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/407228689_1.jpg&width=1170",
                enabled: true,
              },
              {
                file: "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/407228689_1.jpg&width=1170",
                enabled: true,
              },
              {
                file: "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/407228689_1.jpg&width=1170",
                enabled: true,
              },
              {
                file: "https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/407228689_1.jpg&width=1170",
                enabled: true,
              },
            ],
            trace: [
              {
                dateSale: new Date("2023-01-15T00:00:00Z"),
                name: "Initial Purchase",
                value: 2400000,
                tax: 100000,
              },
            ],
            owner: {
              name: "John Doe",
              address: "456 Palm Street, Miami, FL",
              photo:
                "https://t4.ftcdn.net/jpg/05/30/01/09/360_F_530010960_WkmW6q8FIZ42LkEQoSRCLTNTw0WgJqKY.jpg",
              birthday: new Date("1980-05-10T00:00:00Z"),
            },
          }}
        />
      </section>
    </div>
  );
}
