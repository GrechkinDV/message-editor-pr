import { Token } from '../formatted-string';
import ParserState from './state';
import { ParserOptions } from './types';
import emoji from './emoji';
import textEmoji from './text-emoji';
import userSticker from './user-sticker';

const defaultOptions: ParserOptions = {
    formatting: false,
    textEmoji: false,
    hashtag: false,
    mention: false,
    command: false,
    userSticker: false,
}

export default function parse(text: string, opt?: Partial<ParserOptions>): Token[] {
    const options: ParserOptions = { ...defaultOptions, ...opt };
    const state = new ParserState(text);

    while (state.hasNext()) {
        emoji(state) || textEmoji(state, options) || userSticker(state, options)
        || state.consumeText();
    }

    state.flushText();
    return state.tokens;
}
