import { JmapClient } from './jmap-client.js';
export class ContactsCalendarClient extends JmapClient {
    async checkContactsPermission() {
        const session = await this.getSession();
        return !!session.capabilities['urn:ietf:params:jmap:contacts'];
    }
    async checkCalendarsPermission() {
        const session = await this.getSession();
        return !!session.capabilities['urn:ietf:params:jmap:calendars'];
    }
    async getContacts(limit = 50) {
        // Check permissions first
        const hasPermission = await this.checkContactsPermission();
        if (!hasPermission) {
            throw new Error('Contacts access not available. This account may not have JMAP contacts permissions enabled. Please check your Fastmail account settings or contact support to enable contacts API access.');
        }
        const session = await this.getSession();
        // Try CardDAV namespace first, then Fastmail specific
        const request = {
            using: ['urn:ietf:params:jmap:core', 'urn:ietf:params:jmap:contacts'],
            methodCalls: [
                ['Contact/query', {
                        accountId: session.accountId,
                        limit
                    }, 'query'],
                ['Contact/get', {
                        accountId: session.accountId,
                        '#ids': { resultOf: 'query', name: 'Contact/query', path: '/ids' },
                        properties: ['id', 'name', 'emails', 'phones', 'addresses', 'notes']
                    }, 'contacts']
            ]
        };
        try {
            const response = await this.makeRequest(request);
            return this.getListResult(response, 1);
        }
        catch (error) {
            // Fallback: try to get contacts using AddressBook methods
            const fallbackRequest = {
                using: ['urn:ietf:params:jmap:core', 'urn:ietf:params:jmap:contacts'],
                methodCalls: [
                    ['AddressBook/get', {
                            accountId: session.accountId
                        }, 'addressbooks']
                ]
            };
            try {
                const fallbackResponse = await this.makeRequest(fallbackRequest);
                return this.getListResult(fallbackResponse, 0);
            }
            catch (fallbackError) {
                throw new Error(`Contacts not supported or accessible: ${error instanceof Error ? error.message : String(error)}. Try checking account permissions or enabling contacts API access in Fastmail settings.`);
            }
        }
    }
    async getContactById(id) {
        // Check permissions first
        const hasPermission = await this.checkContactsPermission();
        if (!hasPermission) {
            throw new Error('Contacts access not available. This account may not have JMAP contacts permissions enabled. Please check your Fastmail account settings or contact support to enable contacts API access.');
        }
        const session = await this.getSession();
        const request = {
            using: ['urn:ietf:params:jmap:core', 'urn:ietf:params:jmap:contacts'],
            methodCalls: [
                ['Contact/get', {
                        accountId: session.accountId,
                        ids: [id]
                    }, 'contact']
            ]
        };
        try {
            const response = await this.makeRequest(request);
            return this.getListResult(response, 0)[0];
        }
        catch (error) {
            throw new Error(`Contact access not supported: ${error instanceof Error ? error.message : String(error)}. Try checking account permissions or enabling contacts API access in Fastmail settings.`);
        }
    }
    async searchContacts(query, limit = 20) {
        // Check permissions first
        const hasPermission = await this.checkContactsPermission();
        if (!hasPermission) {
            throw new Error('Contacts access not available. This account may not have JMAP contacts permissions enabled. Please check your Fastmail account settings or contact support to enable contacts API access.');
        }
        const session = await this.getSession();
        const request = {
            using: ['urn:ietf:params:jmap:core', 'urn:ietf:params:jmap:contacts'],
            methodCalls: [
                ['Contact/query', {
                        accountId: session.accountId,
                        filter: { text: query },
                        limit
                    }, 'query'],
                ['Contact/get', {
                        accountId: session.accountId,
                        '#ids': { resultOf: 'query', name: 'Contact/query', path: '/ids' },
                        properties: ['id', 'name', 'emails', 'phones', 'addresses', 'notes']
                    }, 'contacts']
            ]
        };
        try {
            const response = await this.makeRequest(request);
            return this.getListResult(response, 1);
        }
        catch (error) {
            throw new Error(`Contact search not supported: ${error instanceof Error ? error.message : String(error)}. Try checking account permissions or enabling contacts API access in Fastmail settings.`);
        }
    }
    async getCalendars() {
        // Check permissions first
        const hasPermission = await this.checkCalendarsPermission();
        if (!hasPermission) {
            throw new Error('Calendar access not available. This account may not have JMAP calendar permissions enabled. Please check your Fastmail account settings or contact support to enable calendar API access.');
        }
        const session = await this.getSession();
        const request = {
            using: ['urn:ietf:params:jmap:core', 'urn:ietf:params:jmap:calendars'],
            methodCalls: [
                ['Calendar/get', {
                        accountId: session.accountId
                    }, 'calendars']
            ]
        };
        try {
            const response = await this.makeRequest(request);
            return this.getListResult(response, 0);
        }
        catch (error) {
            // Calendar access might require special permissions
            throw new Error(`Calendar access not supported or requires additional permissions. This may be due to account settings or JMAP scope limitations: ${error instanceof Error ? error.message : String(error)}. Try checking account permissions or enabling calendar API access in Fastmail settings.`);
        }
    }
    async getCalendarEvents(calendarId, limit = 50) {
        // Check permissions first
        const hasPermission = await this.checkCalendarsPermission();
        if (!hasPermission) {
            throw new Error('Calendar access not available. This account may not have JMAP calendar permissions enabled. Please check your Fastmail account settings or contact support to enable calendar API access.');
        }
        const session = await this.getSession();
        const filter = calendarId ? { inCalendar: calendarId } : {};
        const request = {
            using: ['urn:ietf:params:jmap:core', 'urn:ietf:params:jmap:calendars'],
            methodCalls: [
                ['CalendarEvent/query', {
                        accountId: session.accountId,
                        filter,
                        sort: [{ property: 'start', isAscending: true }],
                        limit
                    }, 'query'],
                ['CalendarEvent/get', {
                        accountId: session.accountId,
                        '#ids': { resultOf: 'query', name: 'CalendarEvent/query', path: '/ids' },
                        properties: ['id', 'title', 'description', 'start', 'end', 'location', 'participants']
                    }, 'events']
            ]
        };
        try {
            const response = await this.makeRequest(request);
            return this.getListResult(response, 1);
        }
        catch (error) {
            throw new Error(`Calendar events access not supported: ${error instanceof Error ? error.message : String(error)}. Try checking account permissions or enabling calendar API access in Fastmail settings.`);
        }
    }
    async getCalendarEventById(id) {
        // Check permissions first
        const hasPermission = await this.checkCalendarsPermission();
        if (!hasPermission) {
            throw new Error('Calendar access not available. This account may not have JMAP calendar permissions enabled. Please check your Fastmail account settings or contact support to enable calendar API access.');
        }
        const session = await this.getSession();
        const request = {
            using: ['urn:ietf:params:jmap:core', 'urn:ietf:params:jmap:calendars'],
            methodCalls: [
                ['CalendarEvent/get', {
                        accountId: session.accountId,
                        ids: [id]
                    }, 'event']
            ]
        };
        try {
            const response = await this.makeRequest(request);
            return this.getListResult(response, 0)[0];
        }
        catch (error) {
            throw new Error(`Calendar event access not supported: ${error instanceof Error ? error.message : String(error)}. Try checking account permissions or enabling calendar API access in Fastmail settings.`);
        }
    }
    async createCalendarEvent(event) {
        // Check permissions first
        const hasPermission = await this.checkCalendarsPermission();
        if (!hasPermission) {
            throw new Error('Calendar access not available. This account may not have JMAP calendar permissions enabled. Please check your Fastmail account settings or contact support to enable calendar API access.');
        }
        const session = await this.getSession();
        const eventObject = {
            calendarId: event.calendarId,
            title: event.title,
            description: event.description || '',
            start: event.start,
            end: event.end,
            location: event.location || '',
            participants: event.participants || []
        };
        const request = {
            using: ['urn:ietf:params:jmap:core', 'urn:ietf:params:jmap:calendars'],
            methodCalls: [
                ['CalendarEvent/set', {
                        accountId: session.accountId,
                        create: { newEvent: eventObject }
                    }, 'createEvent']
            ]
        };
        try {
            const response = await this.makeRequest(request);
            const result = this.getMethodResult(response, 0);
            const eventId = result.created?.newEvent?.id;
            if (!eventId) {
                throw new Error('Calendar event creation returned no event ID');
            }
            return eventId;
        }
        catch (error) {
            throw new Error(`Calendar event creation not supported: ${error instanceof Error ? error.message : String(error)}. Try checking account permissions or enabling calendar API access in Fastmail settings.`);
        }
    }
}
//# sourceMappingURL=contacts-calendar.js.map