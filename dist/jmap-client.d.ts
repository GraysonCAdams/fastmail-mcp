import { FastmailAuth } from './auth.js';
export interface JmapSession {
    apiUrl: string;
    accountId: string;
    capabilities: Record<string, any>;
    downloadUrl?: string;
    uploadUrl?: string;
}
export interface JmapRequest {
    using: string[];
    methodCalls: [string, any, string][];
}
export interface JmapResponse {
    methodResponses: Array<[string, any, string]>;
    sessionState: string;
}
export declare class JmapClient {
    private auth;
    private session;
    constructor(auth: FastmailAuth);
    /**
     * Extract the result from a JMAP method response, throwing on method-level errors.
     */
    protected getMethodResult(response: JmapResponse, index: number): any;
    /**
     * Extract the .list array from a JMAP method response, with null safety.
     */
    protected getListResult(response: JmapResponse, index: number): any[];
    getSession(): Promise<JmapSession>;
    getUserEmail(): Promise<string>;
    makeRequest(request: JmapRequest): Promise<JmapResponse>;
    getMailboxes(): Promise<any[]>;
    getEmails(mailboxId?: string, limit?: number): Promise<any[]>;
    getEmailById(id: string): Promise<any>;
    getIdentities(): Promise<any[]>;
    getDefaultIdentity(): Promise<any>;
    sendEmail(email: {
        to: string[];
        cc?: string[];
        bcc?: string[];
        subject: string;
        textBody?: string;
        htmlBody?: string;
        from?: string;
        mailboxId?: string;
        inReplyTo?: string[];
        references?: string[];
    }): Promise<string>;
    createDraft(email: {
        to?: string[];
        cc?: string[];
        bcc?: string[];
        subject?: string;
        textBody?: string;
        htmlBody?: string;
        from?: string;
        mailboxId?: string;
    }): Promise<string>;
    saveDraft(email: {
        to: string[];
        cc?: string[];
        bcc?: string[];
        subject: string;
        textBody?: string;
        htmlBody?: string;
        from?: string;
        inReplyTo?: string[];
        references?: string[];
    }): Promise<string>;
    getRecentEmails(limit?: number, mailboxName?: string): Promise<any[]>;
    markEmailRead(emailId: string, read?: boolean): Promise<void>;
    deleteEmail(emailId: string): Promise<void>;
    moveEmail(emailId: string, targetMailboxId: string): Promise<void>;
    addLabels(emailId: string, mailboxIds: string[]): Promise<void>;
    removeLabels(emailId: string, mailboxIds: string[]): Promise<void>;
    bulkAddLabels(emailIds: string[], mailboxIds: string[]): Promise<void>;
    bulkRemoveLabels(emailIds: string[], mailboxIds: string[]): Promise<void>;
    getEmailAttachments(emailId: string): Promise<any[]>;
    downloadAttachment(emailId: string, attachmentId: string): Promise<string>;
    downloadAttachmentToFile(emailId: string, attachmentId: string, savePath: string): Promise<{
        url: string;
        bytesWritten: number;
    }>;
    advancedSearch(filters: {
        query?: string;
        from?: string;
        to?: string;
        subject?: string;
        hasAttachment?: boolean;
        isUnread?: boolean;
        mailboxId?: string;
        after?: string;
        before?: string;
        limit?: number;
    }): Promise<any[]>;
    getThread(threadId: string): Promise<any[]>;
    getMailboxStats(mailboxId?: string): Promise<any>;
    getAccountSummary(): Promise<any>;
    bulkMarkRead(emailIds: string[], read?: boolean): Promise<void>;
    bulkMove(emailIds: string[], targetMailboxId: string): Promise<void>;
    bulkDelete(emailIds: string[]): Promise<void>;
}
