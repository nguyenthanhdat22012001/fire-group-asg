export declare const fetchAppAPI: ({ url, method, data, params, headers, token }: FetchAppAPI) => Promise<any>;
interface FetchAppAPI {
    url: string;
    method?: string;
    data?: FormData | {} | null;
    params?: {};
    headers?: HeadersInit;
    token?: string;
}
export {};
