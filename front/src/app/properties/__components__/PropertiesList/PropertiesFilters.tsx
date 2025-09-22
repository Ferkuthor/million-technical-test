"use client";

import { Button } from "@/components/ui/button";
import { Search, RotateCcw } from "lucide-react";

interface PropertiesFiltersProps {
  filters: {
    name: string;
    address: string;
    minPrice: string;
    maxPrice: string;
  };
  onFiltersChange: (filters: PropertiesFiltersProps["filters"]) => void;
  onSearch: () => void;
  onReset: () => void;
}

export function PropertiesFilters({
  filters,
  onFiltersChange,
  onSearch,
  onReset,
}: PropertiesFiltersProps) {
  const handleInputChange = (
    key: keyof PropertiesFiltersProps["filters"],
    value: string
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="mb-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Property name"
            value={filters.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Property address"
            value={filters.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="minPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Min Price
          </label>
          <input
            id="minPrice"
            type="number"
            placeholder="Minimum price"
            value={filters.minPrice}
            onChange={(e) => handleInputChange("minPrice", e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="maxPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Max Price
          </label>
          <input
            id="maxPrice"
            type="number"
            placeholder="Maximum price"
            value={filters.maxPrice}
            onChange={(e) => handleInputChange("maxPrice", e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button variant="secondary" size="sm" onClick={onSearch}>
          <Search /> Search
        </Button>
        <Button variant="outline" size="sm" onClick={onReset}>
          <RotateCcw /> Reset
        </Button>
      </div>
    </div>
  );
}
