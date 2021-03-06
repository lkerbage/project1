import { init } from './init.js';
import { ul } from '../constants/elements.js';
import { getDaysDueDate } from './getDaysDueDate.js';
import { title } from '../constants/form.js';
import { showCompleted, showImportance } from './layout.js';

export const titleFocus = () => title.focus();

export const displayData = (currentData = []) => {
  ul.innerHTML = currentData
    .map((todo, index) =>
      `<li class='wrapper alignCenter ' data-id='${index}' >
        <div class='item-container'>
          <div ><button class='editButton' data-id='${todo._id}'><ion-icon name='create-outline'></ion-icon> Bearbeiten</button></div> 
          <div ><strong>${todo.title}</strong></div> 
          <div >${todo.completed ? showCompleted('y') : showCompleted('n')}</div> 
       </div>   
        <div class='item-container'>
           <div class='item-box'>${getDaysDueDate(todo)}</div>
           <div class='item-box'>${todo.description}</div>
           <div class='item-box'>${showImportance(todo.importance)}</div>
        </div>
        </li>`,
    )
    .join('');
};

init().then();