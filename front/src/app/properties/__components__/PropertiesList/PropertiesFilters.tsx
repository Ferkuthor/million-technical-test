"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw } from "lucide-react";
import { useFiltersStore } from "../../stores/useFiltersStore";

export function PropertiesFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filters, updateFilter, resetFilters } = useFiltersStore();

  useEffect(() => {
    // Initialize filters from URL
    const initialFilters = {
      name: searchParams.get("name") || "",
      address: searchParams.get("address") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    };
    // Update store to match URL
    Object.entries(initialFilters).forEach(([key, value]) => {
      updateFilter(key as keyof typeof filters, value);
    });
  }, [searchParams, updateFilter]);

  const handleInputChange = (key: keyof typeof filters, value: string) => {
    updateFilter(key, value);
  };

  const handleSearch = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    // Update filters in URL
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    // Reset page to 1 when searching
    newParams.set("page", "1");
    const newUrl = newParams.toString() ? `?${newParams.toString()}` : "";
    router.push(`/properties${newUrl}`);
  };

  const handleReset = () => {
    resetFilters();
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("name");
    newParams.delete("address");
    newParams.delete("minPrice");
    newParams.delete("maxPrice");
    newParams.set("page", "1");
    const newUrl = newParams.toString() ? `?${newParams.toString()}` : "";
    router.push(`/properties${newUrl}`);
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
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
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
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
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
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
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
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button variant="secondary" size="sm" onClick={handleSearch}>
          <Search /> Search
        </Button>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw /> Reset
        </Button>
      </div>
    </div>
  );
}
