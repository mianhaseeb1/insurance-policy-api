import { ResponseFormat, ResponsePaginationFormat } from 'core/interfaces';

export function wrapResponse(
    statusCode: number | string,
    message: string,
    status: boolean,
    data?: any,
): ResponseFormat {
    return {
        status,
        statusCode,
        message,
        data,
    };
}

export function wrapResponsePagination(
    statusCode: number | string,
    message: string,
    status: boolean,
    data?: any,
    totalRecords?: any,
    page?: number,
    limit?: number,
): ResponsePaginationFormat {
    return {
        status,
        statusCode,
        message,
        data,
        totalRecords,
        page,
        limit,
    };
}
