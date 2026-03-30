function normalizeBaseUrl(input) {
    const DEFAULT = 'https://api.fastmail.com';
    if (!input)
        return DEFAULT;
    let url = input.trim();
    if (!url)
        return DEFAULT;
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(url)) {
        url = 'https://' + url;
    }
    url = url.replace(/\/+$/, '');
    return url;
}
export class FastmailAuth {
    constructor(config) {
        this.apiToken = config.apiToken;
        this.baseUrl = normalizeBaseUrl(config.baseUrl);
    }
    getAuthHeaders() {
        return {
            'Authorization': `Bearer ${this.apiToken}`,
            'Content-Type': 'application/json'
        };
    }
    getSessionUrl() {
        return `${this.baseUrl}/jmap/session`;
    }
    getApiUrl() {
        return `${this.baseUrl}/jmap/api/`;
    }
}
//# sourceMappingURL=auth.js.map