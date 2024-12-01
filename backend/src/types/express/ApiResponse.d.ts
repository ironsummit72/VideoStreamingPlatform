export default interface ApiResponse {
    success: boolean;
    message: string;
    data?: object;
    errors?: object;
    statusCode?: number;
}