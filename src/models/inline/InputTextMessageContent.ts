/**
 * Represents the content of a text message to be sent as the result of an inline query.
 */
export default interface InputTextMessageContent {
    /**
     * Text of the message to be sent, 1-4096 characters
     */
    message_text: string;

    /**
     * Optional. Send Markdown or HTML, if you want Telegram apps to show bold, italic, fixed-width text or inline URLs in
     * your bot&#x27;s message.
     */
    parse_mode?: string;

    /**
     * Optional. Disables link previews for links in the sent message
     */
    disable_web_page_preview?: boolean;
}
