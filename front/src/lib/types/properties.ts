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

export interface PropertyDetailDto {
  id?: string;
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
  owner: {
    id?: string;
    name: string;
    address: string;
    photo: string;
    birthday: string; // ISO date string
  };
  images: {
    file: string;
    enabled: boolean;
  }[];
  trace: {
    dateSale: string; // ISO date string
    name: string;
    value: number;
    tax: number;
  }[];
}