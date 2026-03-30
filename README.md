# fastmail-mcp

An MCP (Model Context Protocol) server for [Fastmail](https://www.fastmail.com/) that provides access to email, contacts, and calendars via the [JMAP protocol](https://jmap.io/).

## Tools

### Email

| Tool | Description |
|------|-------------|
| `list_mailboxes` | List all mailboxes in the account |
| `list_emails` | List emails from a mailbox |
| `get_email` | Get a specific email by ID |
| `get_recent_emails` | Get the most recent emails from inbox |
| `search_emails` | Search emails by subject or content |
| `advanced_search` | Advanced email search with multiple criteria (sender, recipient, date range, attachments, etc.) |
| `send_email` | Send an email |
| `reply_email` | Reply to an email with proper threading headers |
| `save_draft` | Save an email as a draft with optional threading support |
| `create_draft` | Create an email draft without sending |
| `mark_email_read` | Mark an email as read or unread |
| `delete_email` | Delete an email (move to trash) |
| `move_email` | Move an email to a different mailbox |
| `add_labels` | Add labels (mailboxes) to an email |
| `remove_labels` | Remove labels (mailboxes) from an email |
| `get_email_attachments` | List attachments for an email |
| `download_attachment` | Download an email attachment (save to disk or get URL) |
| `get_thread` | Get all emails in a conversation thread |
| `get_mailbox_stats` | Get mailbox statistics (unread count, total, etc.) |
| `get_account_summary` | Get overall account summary with statistics |

### Bulk Operations

| Tool | Description |
|------|-------------|
| `bulk_mark_read` | Mark multiple emails as read/unread |
| `bulk_move` | Move multiple emails to a mailbox |
| `bulk_delete` | Delete multiple emails (move to trash) |
| `bulk_add_labels` | Add labels to multiple emails |
| `bulk_remove_labels` | Remove labels from multiple emails |

### Contacts

| Tool | Description |
|------|-------------|
| `list_contacts` | List contacts from the address book |
| `get_contact` | Get a specific contact by ID |
| `search_contacts` | Search contacts by name or email |

### Calendars

| Tool | Description |
|------|-------------|
| `list_calendars` | List all calendars |
| `list_calendar_events` | List events from a calendar |
| `get_calendar_event` | Get a specific calendar event by ID |
| `create_calendar_event` | Create a new calendar event |

### Utility

| Tool | Description |
|------|-------------|
| `list_identities` | List sending identities (email addresses) |
| `check_function_availability` | Check which functions are available based on account permissions |
| `test_bulk_operations` | Test bulk operations with a dry-run mode |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `FASTMAIL_API_TOKEN` | Yes | Fastmail API token ([create one here](https://www.fastmail.com/settings/security/tokens)) |

## Setup

```bash
npm ci
```

## Usage

### Stdio mode (for Claude Desktop, Claude Code, etc.)

```bash
node dist/index.js
```

### HTTP mode (with mcp-proxy)

```bash
npx mcp-proxy --port 8003 -- node dist/index.js
```

### Claude Desktop configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "fastmail": {
      "command": "node",
      "args": ["/path/to/fastmail-mcp/dist/index.js"],
      "env": {
        "FASTMAIL_API_TOKEN": "your-api-token"
      }
    }
  }
}
```

## License

MIT
