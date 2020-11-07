import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import configManager from "../config/configManager";

interface RequestParams {
    [key: string]: any;
}

class SpoontacularRequest {
    private url: string | undefined;
    private urlBase: string;
    private urlPath: string;
    private config: AxiosRequestConfig | undefined;

    constructor(urlBase: string, urlPath: string, config: AxiosRequestConfig | undefined = undefined) {
        this.url = configManager.get("SPOONACULAR_API_URL", "http://localhost.com");
        this.urlBase = urlBase;
        this.urlPath = urlPath;
        this.config = {
            ...config,
            params: {
                ...this.config?.params,
                ...{ apiKey: configManager.get("API_KEY", "key") }
            }
        };
    }

    get(requestParams: RequestParams): Promise<AxiosResponse<any>> {
        return axios.get(
            `${this.url}/${this.urlBase}/${this.urlPath}`, {
                ...this.config, params: { ...this.config?.params, ...requestParams }
            }
        );
    }
}

export default SpoontacularRequest;