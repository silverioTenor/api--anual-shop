import { OutputProductDTO } from "../product.dto";

export class InputProductFiltersDTO {
   userId?: string;
   categoryId?: string;
}

export class InputPaginationDTO {
   page!: number;
   limit!: number;
}

export class OutputProductPaginationDTO {
   data!: OutputProductDTO[];
   total!: number;
   page!: number;
   limit!: number;
   totalPages!: number;
}
