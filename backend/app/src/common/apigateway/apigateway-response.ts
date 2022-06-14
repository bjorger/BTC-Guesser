import { headers } from "../headers";

export interface ApiGatewayResponse {
    statusCode: number;
    headers?: typeof headers;
    body?: string;
}
