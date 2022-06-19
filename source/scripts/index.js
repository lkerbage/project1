import { ErrorMessages } from '../constants/enums.js';
import todoData from '../model/model.js';

const data = todoData;
const create = document.querySelector('#create');
const form = document.querySelector('#form');
const ul = document.querySelector('ul');
const todoTitle = document.querySelector('.todo-title');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.filter');
const showByStatus = document.querySelector('.show-by-status');
const displayTop = document.querySelector('.display-top');
const displayBottom = document.querySelector('.display-bottom');

const dataLength = data.length;

const showImportance = (importance) => {
  const flashes = [];
  for (let i = 0; i < importance; i++) {
    flashes.push("<ion-icon name='flash'></ion-icon>");
  }
  return `<span className="displayInline">${flashes.join('')}</span>`;
};

const getDaysDueDate = (dateNow, dueDate) => Math.round((dateNow / 1000 - dueDate) / 3600 / 24);

const displayData = (currentData = data) => {
  const dateNow = Date.now();
  ul.innerHTML = currentData
    .map(
      (
        todo,
        index,
      ) => `<li class="container wrapper alignCenter" data-id="${index}">
<div class="itemContainerTop">
          <div className="box"><button class="editButton" data-id="${index}">Bearbeiten</button></div> 
          <div className="box"><strong>${todo.title}</strong></div> 
          <div className="box"><input data-id="${index}" class="toggle" data-status="status" type="checkbox" ${
  todo.completed ? 'checked' : ''
}/></div> 
       </div>   
<div class="itemContainerBottom">
  <div class="box ">In ${getDaysDueDate(dateNow, todo.dueDate)} Tagen</div>
  <div class="box ">${todo.description}</div>
  <div class="box ">${showImportance(todo.importance)}</div>
    </div>
  
  </li>`,
    )
    .join('');
};

const updateItem = (id) => {
  displayBottom.style.display = 'none';
  const updateData = data[id];
  const formIds = Object.keys(updateData);
  formIds.forEach((name) => {
    form.elements[name].value = updateData[name];
    if (name === 'completed' && form.elements[name].value == 1) { form.elements[name].setAttribute('checked', 'checked'); }
  });
};

const processItem = (ev) => {
  const { id } = ev.target.dataset;
  const { status } = ev.target.dataset;
  if (ev.target.className === 'showByStatus') {
    const updatedData = data.map(
      (item) => data.indexOf(item) === Number(id) && (data[id].completed = 1),
    );
    displayData(updatedData);
  }
  if (ev.target.className === 'editButton') {
    const { id } = ev.target.dataset;
    updateItem(id);
  }
  if (status) {
    console.log('status item no. ', ev.target.dataset.id, status);
  }
};

const filterItems = (ev) => {
  const filterCriteria = ev.target.value;

  const filterData = data.sort((a, b) => {
    if (a[filterCriteria] < b[filterCriteria]) {
      return -1;
    }
    if (a[filterCriteria] > b[filterCriteria]) {
      return 1;
    }
    return 0;
  });
  displayData(
    filterCriteria === 'importance' ? filterData.reverse() : filterData,
  );
};

const completedItems = (ev) => {
  const filterCriteria = ev.target.value;
  const filterData = data.filter((todo) => (filterCriteria !== 'a' ? todo.completed === Number(filterCriteria) : todo));
  displayData(filterData);
};

const { title } = form.elements;
const { importance } = form.elements;
const { dueDate } = form.elements;
const { completed } = form.elements;
const { description } = form.elements;

const displayOpenAndCompletedTodos = (_dataLength) => {
  const completedTodos = data.filter((todo) => todo.completed === 1);
  const numberOfIncompleted = _dataLength - completedTodos.length;
  todoTitle.innerHTML = `<h2> ${
    _dataLength === 1 ? `${_dataLength} Aufgabe` : `${_dataLength}  Aufgaben,`
  } davon ${numberOfIncompleted} offene Aufgaben</h2>`;
};

function init() {
  if (dataLength > 0) {
    displayData();
    displayOpenAndCompletedTodos(dataLength);
  } else ul.innerHTML = '<h2>Du bist frei 😀 Es gibt heute nichts zu machen!</h2>';
}

const submitTodo = () => {
  const newTodo = {
    title: title.value,
    importance: importance.value,
    dueDate: dueDate.value,
    completed: completed.value,
    description: description.value,
    timestamp: Date.now(),
  };
  data.push(newTodo);
  alert(JSON.stringify(newTodo));
  // todo POST todo
};

const submitCreate = (ev) => {
  submitTodo(ev);
};

const validationText = () => {
  if (title.validity.valueMissing) {
    title.setCustomValidity(ErrorMessages.ERROR_TITLE);
  }
  if (importance.validity.rangeUnderflow) {
    importance.setCustomValidity(ErrorMessages.IMPORTANCE);
  }
  if (dueDate.validity.valueMissing) {
    dueDate.setCustomValidity(ErrorMessages.DUE_DATE);
  }
};

form.addEventListener('submit', (ev) => {
  submitCreate(ev);
});
title.addEventListener('input', validationText);
todoList.addEventListener('click', (ev) => {
  processItem(ev);
});
todoFilter.addEventListener('change', (ev) => filterItems(ev));
showByStatus.addEventListener('change', (ev) => completedItems(ev));

init();