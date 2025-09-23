"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw } from "lucide-react";
import { FetchPropertiesParams } from "../../hooks/useProperties";

interface PropertiesFiltersProps {
  currentParams: FetchPropertiesParams;
  onSearch: (params: Partial<FetchPropertiesParams>) => void;
  onReset: () => void;
}

export function PropertiesFilters({
  currentParams,
  onSearch,
  onReset,
}: PropertiesFiltersProps) {
  const [filters, setFilters] = useState({
    name: "",
    address: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    setFilters({
      name: currentParams.name || "",
      address: currentParams.address || "",
      minPrice: currentParams.minPrice || "",
      maxPrice: currentParams.maxPrice || "",
    });
  }, [currentParams]);

  const handleSearch = () => {
    const searchParams: Partial<FetchPropertiesParams> = {
      page: "1", // Reset to first page when searching
      pageSize: currentParams.pageSize || "12",
    };

    if (filters.name.trim()) searchParams.name = filters.name.trim();
    if (filters.address.trim()) searchParams.address = filters.address.trim();
    if (filters.minPrice.trim()) {
      searchParams.minPrice = filters.minPrice.trim();
    }
    if (filters.maxPrice.trim()) {
      searchParams.maxPrice = filters.maxPrice.trim();
    }

    onSearch(searchParams);
  };

  const handleReset = () => {
    setFilters({
      name: "",
      address: "",
      minPrice: "",
      maxPrice: "",
    });
    onReset();
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
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, name: e.target.value }))
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
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
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, address: e.target.value }))
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
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
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, minPrice: e.target.value }))
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
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
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
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
