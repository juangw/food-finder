import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Request } from "express";
import LRU from "lru-cache";

import configManager from "../config/configManager";

const options = {
    max: 500,
    length: function (n: any, key: any) { return n * 2 + key.length; },
    dispose: function (_: any, n: any) { n.close(); },
    maxAge: 1000 * 60 * 60,
};
const cache = new LRU(options);

interface RequestParams {
    [key: string]: any;
}

class SpoontacularRequest {
    private req: Request;
    private url: string | undefined;
    private urlBase: string;
    private urlPath: string;
    private config: AxiosRequestConfig | undefined;

    constructor(
        req: Request,
        urlBase: string,
        urlPath: string,
        config: AxiosRequestConfig | undefined = undefined,
    ) {
        this.req = req;
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
        let cacheResult = cache.get(`${this.urlBase}_${this.urlPath}_${requestParams}`);
        if (cacheResult) { return cacheResult; }
        this.req.log.info(
            {
                SpoonacularEndpoint: `${this.url}/${this.urlBase}/${this.urlPath}`,
                SpoonacularParams: `${JSON.stringify(requestParams)}`,
            },
            "Calling Spoonacular"
        );
        let requestResult = axios.get(
            `${this.url}/${this.urlBase}/${this.urlPath}`, {
                ...this.config, params: { ...this.config?.params, ...requestParams }
            }
        );
        cache.set(`${this.urlBase}_${this.urlPath}_${requestParams}`, requestResult);
        return requestResult;
    }
}

export default SpoontacularRequest;