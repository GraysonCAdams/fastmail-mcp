import { JmapClient } from './jmap-client.js';
export declare class ContactsCalendarClient extends JmapClient {
    private checkContactsPermission;
    private checkCalendarsPermission;
    getContacts(limit?: number): Promise<any[]>;
    getContactById(id: string): Promise<any>;
    searchContacts(query: string, limit?: number): Promise<any[]>;
    getCalendars(): Promise<any[]>;
    getCalendarEvents(calendarId?: string, limit?: number): Promise<any[]>;
    getCalendarEventById(id: string): Promise<any>;
    createCalendarEvent(event: {
        calendarId: string;
        title: string;
        description?: string;
        start: string;
        end: string;
        location?: string;
        participants?: Array<{
            email: string;
            name?: string;
        }>;
    }): Promise<string>;
}
