import {
  createButton,
  form,
  overview,
  selectorDisplayBottom,
  selectorDisplayTop,
  showByStatus,
  submitButton,
  todoFilter,
  todoFilters,
  todoList,
  toggle,
  ul,
} from '../constants/elements.js';
import { Display } from '../constants/enums.js';
import { setTheme } from './theme.js';
import { validationText } from './validationText.js';
import { processItem } from '../services/process-item.js';
import { completedItems, filterItems } from './filter.js';
import { displayParts } from './displayParts.js';
import { displayData, fetchData, titleFocus } from './index.js';
import { submit } from './submit.js';

export async function init() {
  displayParts(selectorDisplayTop, Display.NONE);
  displayParts(selectorDisplayBottom, Display.BLOCK);
  setTheme();
  const data = await fetchData('GET');
  if (data.length > 0) {
    await displayData(data);
  } else {
    todoFilters.style.display = Display.NONE;
    ul.innerHTML = '<h2 class="alignCenter">Du bist frei 😀 Es gibt heute nichts zu machen!</h2>';
  }

  form.addEventListener('submit', (ev) => {
    submit(ev);
  });
  form.addEventListener('click', validationText);
  todoList.addEventListener('click', (ev) => {
    processItem(ev, data);
  });
  todoFilter.addEventListener('change', (ev) => filterItems(ev, data));
  showByStatus.addEventListener('change', (ev) => completedItems(ev, data));
  createButton.addEventListener('click', () => {
    displayParts(selectorDisplayBottom, Display.NONE);
    displayParts(selectorDisplayTop, Display.BLOCK);
    titleFocus();
    form.reset();
    submitButton.innerHTML = 'Erstellen';
    submitButton.classList.add('js-create-new-todo');
  });
  overview.addEventListener('click', () => {
    displayParts(selectorDisplayTop, Display.NONE);
    displayParts(selectorDisplayBottom, Display.BLOCK);
  });
  toggle.addEventListener('click', () => setTheme());
}