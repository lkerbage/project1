import {displayParts} from './displayParts.js';
import {selectorDisplayBottom, selectorDisplayTop} from '../constants/elements.js';
import {Display} from '../constants/enums.js';

export const overview = () => {
    displayParts(selectorDisplayTop, Display.NONE);
    displayParts(selectorDisplayBottom, Display.BLOCK);
};