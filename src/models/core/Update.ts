import * as JT from '@mojotech/json-type-validation';

import ChosenInlineResult from '../inline/ChosenInlineResult';
import InlineQuery from '../inline/InlineQuery';
import PreCheckoutQuery from '../payments/PreCheckoutQuery';
import ShippingQuery from '../payments/ShippingQuery';
import CallbackQuery from './CallbackQuery';
import Message, { MessageDecoder } from './Message';
import Poll, { PollDecoder } from './Poll';

interface Update {
    /**
     * The update‘s unique identifier. Update identifiers start from a certain positive number and increase sequentially.
     * This ID becomes especially handy if you’re using Webhooks, since it allows you to ignore repeated updates or to
     * restore the correct update sequence, should they get out of order. If there are no new updates for at least a week,
     * then identifier of the next update is chosen randomly instead of sequentially.
     */
    readonly update_id: number;
}

const BaseMessageUpdateDecoder: JT.Decoder<Update> = JT.object({
    update_id: JT.number(),
});

interface MessageUpdate extends Update {
    /**
     * New incoming message of any kind — text, photo, sticker, etc.
     */
    readonly message: Message;
}

const MessageUpdateDecoder: JT.Decoder<MessageUpdate> = JT.intersection(
    BaseMessageUpdateDecoder,
    JT.object({
        message: MessageDecoder,
    })
);

interface EditedMessageUpdate extends Update {
    /**
     * New version of a message that is known to the bot and was edited
     */
    readonly edited_message: Message;
}

const EditedMessageUpdateDecoder: JT.Decoder<
    EditedMessageUpdate
> = JT.intersection(
    BaseMessageUpdateDecoder,
    JT.object({
        edited_message: MessageDecoder,
    })
);

interface ChannelPostUpdate extends Update {
    /**
     * New incoming channel post of any kind — text, photo, sticker, etc.
     */
    readonly channel_post: Message;
}

const ChannelPostUpdateDecoder: JT.Decoder<ChannelPostUpdate> = JT.intersection(
    BaseMessageUpdateDecoder,
    JT.object({
        channel_post: MessageDecoder,
    })
);

interface EditedChannelPostUpdate extends Update {
    /**
     * New version of a channel post that is known to the bot and was edited
     */
    readonly edited_channel_post: Message;
}

const EditedChannelPostUpdateDecoder: JT.Decoder<
    EditedChannelPostUpdate
> = JT.intersection(
    BaseMessageUpdateDecoder,
    JT.object({
        edited_channel_post: MessageDecoder,
    })
);

interface InlineQueryUpdate extends Update {
    /**
     * New incoming inline query
     */
    readonly inline_query: InlineQuery;
}

interface ChosenInlineResultUpdate extends Update {
    /**
     * The result of an inline query that was chosen by a user and sent to their chat partner. Please see our
     * documentation on the feedback collecting for details on how to enable these updates for your bot.
     */
    readonly chosen_inline_result: ChosenInlineResult;
}

interface CallbackQueryUpdate extends Update {
    /**
     * New incoming callback query
     */
    readonly callback_query: CallbackQuery;
}

interface ShippingQueryUpdate extends Update {
    /**
     * New incoming shipping query. Only for invoices with flexible price
     */
    readonly shipping_query: ShippingQuery;
}

interface PreCheckoutQueryUpdate extends Update {
    /**
     * New incoming pre-checkout query. Contains full information about checkout
     */
    readonly pre_checkout_query: PreCheckoutQuery;
}

interface PollUpdate extends Update {
    /**
     * New poll state. Bots receive only updates about polls, which are sent or stopped by the bot
     */
    readonly poll: Poll;
}

const PollUpdateDecoder: JT.Decoder<PollUpdate> = JT.intersection(
    BaseMessageUpdateDecoder,
    JT.object({
        poll: PollDecoder,
    })
);

/**
 * This object represents an incoming update.
 */
type TelegramUpdate =
    | MessageUpdate
    | EditedMessageUpdate
    | ChannelPostUpdate
    | EditedChannelPostUpdate
    | InlineQueryUpdate
    | ChosenInlineResultUpdate
    | CallbackQueryUpdate
    | ShippingQueryUpdate
    | PreCheckoutQueryUpdate
    | PollUpdate;

export default TelegramUpdate;

export const UpdateDecoder = JT.union(
    MessageUpdateDecoder,
    EditedMessageUpdateDecoder,
    ChannelPostUpdateDecoder,
    EditedChannelPostUpdateDecoder,
    // InlineQueryUpdateDecoder,
    // ChosenInlineResultUpdateDecoder,
    // CallbackQueryUpdateDecoder,
    // ShippingQueryUpdateDecoder,
    // PreCheckoutQueryUpdateDecoder,
    PollUpdateDecoder
);
