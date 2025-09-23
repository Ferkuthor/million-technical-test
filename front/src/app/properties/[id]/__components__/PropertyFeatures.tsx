interface PropertyFeaturesProps {
  year: number;
}

export function PropertyFeatures({ year }: PropertyFeaturesProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Features</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🏠</span>
          <span>Built in {year}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🛏️</span>
          <span>3 Bedrooms</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🚿</span>
          <span>2 Bathrooms</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">📏</span>
          <span>2000 sq ft</span>
        </div>
      </div>
    </div>
  );
}