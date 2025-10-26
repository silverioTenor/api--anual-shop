import { OutputProductDTO } from "../product.dto";

export interface InputProductFiltersDTO {
   userId?: string;
   categoryId?: string;
}

export interface InputPaginationDTO {
   page: number;
   limit: number;
}

export interface OutputProductPaginationDTO {
   data: OutputProductDTO[];
   total: number;
   page: number;
   limit: number;
   totalPages: number;
}
