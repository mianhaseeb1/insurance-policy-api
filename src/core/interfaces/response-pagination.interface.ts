export interface ResponsePaginationFormat {
    status: boolean;
    statusCode: number | string;
    message?: string;
    data?: {} | [];
    totalRecords?: {};
    page?: number;
    limit?: number;
}
