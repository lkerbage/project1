import { completed, description, dueDate, importance, title } from '../constants/form.js';
import { selectorDisplayBottom, selectorDisplayTop, submitButton } from '../constants/elements.js';
import { processItem } from './process-item.js';
import { displayParts } from './displayParts.js';
import { Display } from '../constants/enums.js';
import { displayData } from './index.js';
import { fetchData } from '../services/fetch.js';
import { currentData, store } from './store.js';

const submitTodo = async () => {
  const note = {
    title: title.value,
    importance: importance.value,
    dueDate: dueDate.value,
    completed: Number(completed.checked),
    description: description.value,
    timestamp: Date.now(),
  };

  if (submitButton.className === 'create-button js-create-new-todo') {
    const res = await fetchData('POST', note);
    store([...currentData, res]);
    displayData(currentData);

  }

  if (submitButton.className === 'create-button js-edit-todo') {
    const res = await fetchData('PUT', { ...note, _id: _id.value });
    store(currentData.map(d => d._id === _id.value ? res : d));
    displayData(currentData);
  }
};

export const submit = async (ev) => {
  ev.preventDefault();
  await submitTodo(currentData);
  processItem(ev);
  displayParts(selectorDisplayTop, Display.NONE);
  displayParts(selectorDisplayBottom, Display.BLOCK);
};