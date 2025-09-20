export interface PropertyListDto {
  id: string;
  name: string;
  address: string;
  price: number;
  year: number;
  mainImage?: string;
}

export interface PaginatedResponseDto<T> {
  data: T[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}