export interface FastmailConfig {
    apiToken: string;
    baseUrl?: string;
}
export declare class FastmailAuth {
    private apiToken;
    private baseUrl;
    constructor(config: FastmailConfig);
    getAuthHeaders(): Record<string, string>;
    getSessionUrl(): string;
    getApiUrl(): string;
}
