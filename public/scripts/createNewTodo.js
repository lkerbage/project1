import { displayParts } from './displayParts.js';
import {
    form, selectorDisplayBottom, selectorDisplayTop, submitButton,
} from '../constants/elements.js';
import { Display } from '../constants/enums.js';
import { titleFocus } from './index.js';

export const createNewTodo = () => {
    displayParts(selectorDisplayBottom, Display.NONE);
    displayParts(selectorDisplayTop, Display.BLOCK);
    titleFocus();
    form.reset();
    submitButton.innerHTML = 'Erstellen';
    submitButton.classList.add('js-create-new-todo');
};