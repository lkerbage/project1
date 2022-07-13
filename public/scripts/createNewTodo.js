import { displayParts } from './displayParts.js';
import { form, selectorDisplayBottom, selectorDisplayTop } from '../constants/elements.js';
import { Display } from '../constants/enums.js';
import { titleFocus } from './index.js';
import { changeButton } from './changeButton.js';


export const createNewTodo = () => {
  displayParts(selectorDisplayBottom, Display.NONE);
  displayParts(selectorDisplayTop, Display.BLOCK);
  titleFocus();
  form.reset();
  changeButton('Erstellen', 'js-create-button js-create-new-todo');
};