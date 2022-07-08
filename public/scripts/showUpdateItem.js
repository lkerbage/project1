import { displayParts } from './displayParts.js';
import { form, selectorDisplayBottom, selectorDisplayTop } from '../constants/elements.js';
import { Display } from '../constants/enums.js';

export const showUpdateItem = (item) => {
  displayParts(selectorDisplayBottom, Display.NONE);
  displayParts(selectorDisplayTop, Display.BLOCK);

  const formIds = Object.keys(item);
  formIds.forEach((name) => {
    if (form.elements[name]) form.elements[name].value = item[name];
    if (name === 'completed' && form.elements[name].value === 1) {
      form.elements[name].setAttribute('checked', 'checked');
    }
  });
};