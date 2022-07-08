import {init} from './init.js';
import {ul,} from '../constants/elements.js';
import {getDaysDueDate} from './getDaysDueDate.js';
import {title,} from '../constants/form.js';
import {getCompleted} from './filter.js';
import {showImportance} from './layout.js';

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