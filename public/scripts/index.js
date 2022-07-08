import { init } from './init.js';
import { Display } from '../constants/enums.js';
import { processItem } from '../services/process-item.js';
import { displayParts } from './displayParts.js';
import {
  form, selectorDisplayBottom, selectorDisplayTop, submitButton, ul,
} from '../constants/elements.js';
import { getDaysDueDate } from './getDaysDueDate.js';
import {
  completed, description, dueDate, importance, title,
} from '../constants/form.js';
import { getCompleted } from './filter.js';
import { showImportance } from './layout.js';
// import { todoServices } from '../../backend/services/todo-services.js';

// const data = async function renderData() {
//   await todoServices.all();
// };
//
// data().then();
// const data = fetchData('GET');

export const fetchData = async (method, body) => fetch('/notes/', {
  method,
  mode: 'cors',
  cache: 'no-cache', //
  headers: {
    'Content-Type': 'application/json',
  },
  body: body ? JSON.stringify(body) : undefined,
}).then((res) => res.json()).then((result) => result).catch((err) => {
  console.error('GET err', err);
});

export const titleFocus = () => title.focus();

export const displayData = (currentData = []) => {
  ul.innerHTML = currentData
    .map(
      (
        todo,
        index,
      ) => `<li class='wrapper alignCenter ' data-id='${index}' >
<div class='item-container'>
          <div ><button class='editButton' data-id='${index}'>Bearbeiten</button></div> 
          <div ><strong>${todo.title}</strong></div> 
          <div >${todo.completed ? getCompleted('y') : getCompleted('n')}</div> 
       </div>   
<div class='item-container'>
  <div class='item-box '>${getDaysDueDate(todo)}</div>
  <div class='item-box '>${todo.description}</div>
  <div class='item-box '>${showImportance(todo.importance)}</div>
    </div>
  
  </li>`,
    )
    .join('');
};

init().then();