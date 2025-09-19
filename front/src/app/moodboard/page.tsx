import { PropertyBasicCard } from "@/components/PropertyBasicCard";
import { Button } from "@/components/ui/button";

export default function Moodboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-10">Moodboard</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Property Basic Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <PropertyBasicCard
              key={index}
              imageSrc="https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/407228689_1.jpg&width=1170"
              title="Happy Mood"
              description="A bright and cheerful mood"
              content="This card represents a happy mood with vibrant colors and positive vibes."
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Buttons</h2>
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
      
    </div>
  );
}