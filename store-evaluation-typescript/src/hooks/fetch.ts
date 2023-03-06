import qs from 'qs';

export const fetchAppAPI = async ({
    url = '',
    method = 'GET',
    data = null,
    params = {},
    headers,
    token = ''
}: // typeApp
FetchAppAPI) => {
    let urlApi = 'https://eval-api.fireapps.io';
    // if (typeApp === "embed") {
    //     urlApi = import.meta.env.VITE_ROOT_API;
    // } else {
    //     urlApi = process.env.ROOT_API;
    // }
    let mergedHeaders: { [key: string]: any } = {
        ...{ 'Content-Type': 'application/json' }
    };

    if (headers) {
        mergedHeaders = {
            ...mergedHeaders,
            ...headers
        };
    }

    if (token) {
        mergedHeaders['Authorization'] = `Bearer ${token}`;
    }
    let queryString = qs.stringify(params);

    let requestUrl = `${urlApi}/api/${url}${queryString ? `?${queryString}` : ''}`;
    if (url.includes('https://')) {
        requestUrl = `${url}${queryString ? `?${queryString}` : ''}`;
    }

    let options: RequestInit = {
        method,
        headers: mergedHeaders
    };
    if (data) {
        options['body'] = JSON.stringify(data);
    }

    try {
        const res = await fetch(requestUrl, options);
        const json = await res.json();

        return json;
    } catch (error) {
        console.error(error);
    }
};

interface FetchAppAPI {
    url: string;
    method?: string;
    data?: FormData | {} | null;
    params?: {};
    headers?: HeadersInit;
    token?: string;
}
