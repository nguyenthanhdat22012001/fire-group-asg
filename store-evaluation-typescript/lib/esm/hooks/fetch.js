var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import qs from 'qs';
export const fetchAppAPI = ({ url = '', method = 'GET', data = null, params = {}, headers, token = '' }) => __awaiter(void 0, void 0, void 0, function* () {
    let urlApi = 'https://eval-api.fireapps.io';
    // if (typeApp === "embed") {
    //     urlApi = import.meta.env.VITE_ROOT_API;
    // } else {
    //     urlApi = process.env.ROOT_API;
    // }
    let mergedHeaders = Object.assign({ 'Content-Type': 'application/json' });
    if (headers) {
        mergedHeaders = Object.assign(Object.assign({}, mergedHeaders), headers);
    }
    if (token) {
        mergedHeaders['Authorization'] = `Bearer ${token}`;
    }
    let queryString = qs.stringify(params);
    let requestUrl = `${urlApi}/api/${url}${queryString ? `?${queryString}` : ''}`;
    if (url.includes('https://')) {
        requestUrl = `${url}${queryString ? `?${queryString}` : ''}`;
    }
    let options = {
        method,
        headers: mergedHeaders
    };
    if (data) {
        options['body'] = JSON.stringify(data);
    }
    try {
        const res = yield fetch(requestUrl, options);
        const json = yield res.json();
        return json;
    }
    catch (error) {
        console.error(error);
    }
});
//# sourceMappingURL=fetch.js.map