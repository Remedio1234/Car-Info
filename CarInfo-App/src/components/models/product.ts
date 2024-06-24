// Interface for defining table columns
export interface TableColumns {
    name: string;
    label: string;
    field: string ;
    align?: 'left' | 'center' | 'right';
    sortable?: boolean;
  }
// Interface for defining product properties
  export interface ProductProps {
    id: number;
    sku: string;
    title: string;
    description: string;
    category: string;
    price: number;
    totalRating: number;
  }
// Interface for defining products data structure
  export interface Products {
    products: ProductProps[];
    total: number;
    skip: number;
    limit: number;
  }