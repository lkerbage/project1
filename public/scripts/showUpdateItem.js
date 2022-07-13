import { displayParts } from './displayParts.js';
import { form, selectorDisplayBottom, selectorDisplayTop } from '../constants/elements.js';
import { Display } from '../constants/enums.js';

export const showUpdateItem = (item) => {
  displayParts(selectorDisplayBottom, Display.NONE);
  displayParts(selectorDisplayTop, Display.BLOCK);

  const itemToChange = item[0];
  const formKeys = Object.keys(itemToChange);
  formKeys.forEach((name) => {
    const formElementsName = form.elements[name];
    if (formElementsName) form.elements[name].value = itemToChange[name];
    if (formElementsName.id === 'completed' && formElementsName.value == 1) {
      formElementsName.setAttribute('checked', 'checked');
    } else {
      formElementsName.removeAttribute('checked');
    }
  });
};