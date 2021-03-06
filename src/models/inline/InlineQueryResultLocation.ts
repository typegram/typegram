import InlineKeyboardMarkup from '../core/InlineKeyboardMarkup';
import InputMessageContent from './InputMessageContent';

/**
 * Represents a location on a map. By default, the location will be sent by the user. Alternatively, you can use input
 * message_content to send a message with the specified content instead of the location.
 */
export default interface InlineQueryResultLocation {
    /**
     * Type of the result, must be location
     */
    type: string;

    /**
     * Unique identifier for this result, 1-64 Bytes
     */
    id: string;

    /**
     * Location latitude in degrees
     */
    latitude: number;

    /**
     * Location longitude in degrees
     */
    longitude: number;

    /**
     * Location title
     */
    title: string;

    /**
     * Optional. Period in seconds for which the location can be updated, should be between 60 and 86400.
     */
    live_period?: number;

    /**
     * Optional. Inline keyboard attached to the message
     */
    reply_markup?: InlineKeyboardMarkup;

    /**
     * Optional. Content of the message to be sent instead of the location
     */
    input_message_content?: InputMessageContent;

    /**
     * Optional. Url of the thumbnail for the result
     */
    thumb_url?: string;

    /**
     * Optional. Thumbnail width
     */
    thumb_width?: number;

    /**
     * Optional. Thumbnail height
     */
    thumb_height?: number;
}
