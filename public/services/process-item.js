import { displayData } from '../scripts/index.js';
import { displayParts } from '../scripts/displayParts.js';
import { Display } from '../constants/enums.js';
import { selectorDisplayBottom, selectorDisplayTop, submitButton } from '../constants/elements.js';
import { showUpdateItem } from '../scripts/showUpdateItem.js';

const changeButton = () => {
  submitButton.innerHTML = 'Bearbeiten';
  submitButton.classList.add('js-edit-todo');
};

export const processItem = (ev, data) => {
  const { id } = ev.target.dataset;
  if (ev.target.className === 'showByStatus') {
    const updatedData = data.find((item, i) => i === Number(id));
    if (updatedData) {
      updatedData.completed = 1;
    }
    displayData(data);
  }
  if (ev.target.className === 'editButton') {
    showUpdateItem(data[id]);
    displayParts(selectorDisplayTop, Display.BLOCK);
    displayParts(selectorDisplayBottom, Display.NONE);
    changeButton();
    displayData(data);
  }
};