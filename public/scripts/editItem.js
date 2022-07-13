import { showUpdateItem } from './showUpdateItem.js';
import { displayParts } from './displayParts.js';
import { selectorDisplayBottom, selectorDisplayTop } from '../constants/elements.js';
import { Display } from '../constants/enums.js';
import { displayData } from './index.js';
import { changeButton } from './changeButton.js';


export const editItem = (data, id) => {
  const item = data.filter((item) => item._id === id);
  showUpdateItem(item);
  displayParts(selectorDisplayTop, Display.BLOCK);
  displayParts(selectorDisplayBottom, Display.NONE);
  changeButton('Bearbeiten', 'js-create-button js-edit-todo');
  displayData(data);
};