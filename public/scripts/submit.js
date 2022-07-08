import {
  completed, description, dueDate, importance, title,
} from '../constants/form.js';
import { selectorDisplayBottom, selectorDisplayTop, submitButton } from '../constants/elements.js';
import { processItem } from '../services/process-item.js';
import { displayParts } from './displayParts.js';
import { Display } from '../constants/enums.js';
import { displayData, fetchData } from './index.js';

const submitTodo = async (data) => {
  const note = {
    title: title.value,
    importance: importance.value,
    dueDate: dueDate.value,
    completed: Number(completed.checked),
    description: description.value,
    timestamp: Date.now(),
  };
  if (submitButton.className === 'js-create-new-todo') {
    await fetchData('POST', note).then((res) => {
      displayData([res, ...data]);
    });

    // await todoServices.add(note);
  }
  if (submitButton.className === 'js-edit-todo') {
    // erstens
    // davor Data manipulieren

    // dies in displayData
    await fetchData('PUT', note).then((res) => {
      data.map((item) => {
        if (item._id === res._id) {
          return res;
        }
        return item;
      });

      displayData(data);
    });
  }
};

export const submit = async (ev, data) => {
  ev.preventDefault();
  await submitTodo(ev, data);
  processItem(ev, data);
  displayParts(selectorDisplayTop, Display.NONE);
  displayParts(selectorDisplayBottom, Display.BLOCK);
};