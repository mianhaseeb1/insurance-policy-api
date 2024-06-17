export interface ResponseFormat {
    status: boolean;
    statusCode: number | string;
    message?: string;
    data?: {} | [];
}
