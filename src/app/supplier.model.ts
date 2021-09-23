export interface ResponseSupplier {
    items: Supplier[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
  }
  
  export interface Supplier {
    code: string;
    id: string;
    logo: string;
    name: string;
  }
