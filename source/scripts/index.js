import { ErrorMessages } from '../constants/enums.js';
import todoData from '../model/model.js';

const data = todoData;
const create = document.querySelector('#create');
const form = document.querySelector('#form');
const ul = document.querySelector('ul');
const todoTitle = document.querySelector('.todo-title');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.filter');
const isComplete = document.querySelector('.isComplete');

const dataLength = data.length;

const showImportance = (importance) => {
  const flashes = [];
  for (let i = 0; i < importance; i++) {
    flashes.push("<ion-icon name='flash'></ion-icon>");
  }
  return `<span className="displayInline">${flashes.join('')}</span>`;
};

const displayData = (currentData = data) => {
  ul.innerHTML = currentData
    .map(
      (
        todo,
        index,
      ) => `<li class="container wrapper alignCenter" data-id="${index}"><strong>${
        todo.title
      } ${showImportance(todo.importance)}</strong>   ${todo.description}
<div class="itemContainer">
  <div class="box"><button class="completedButton" data-id="${index}">Erledigt</button></div><div class="box"><button class="editButton" data-id="${index}">Bearbeiten</button></div></div></li>`,
    )
    .join('');
};

const processItem = (ev) => {
  const { id } = ev.target.dataset;
  if (ev.target.className === 'completedButton') {
    const updatedData = data.filter(
      (item) => data.indexOf(item) === Number(id)
        && console.log((data[id].completed = 'yes')),
    );
  }
  if (ev.target.className === 'editButton') {
    console.log('open item no. ', ev.target.dataset.id);
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
  displayData(filterData);
};

const completedItems = (ev) => {
  const filterCriteria = ev.target.value;
  console.log(filterCriteria);
  const filterData = data.filter((todo) => todo.completed === Number(filterCriteria));
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
  } davon ${numberOfIncompleted} unerledigte Aufgaben</h2>`;
};

function init() {
  if (dataLength > 0) {
    displayData();
    displayOpenAndCompletedTodos(dataLength);
  } else ul.innerHTML = '<h2>Du bist frei 😀 Es gibt heute nichts zu machen!</h2>';
}

const submitTodo = () => {
  const strDate = dueDate.value.replace(/\./g, '/');
  const toTimestamp = function () { Date.parse(strDate); };
  alert(toTimestamp());

  const newTodo = {
    title: title.value,
    importance: importance.value,
    dueDate: toTimestamp(strDate),
    completed: completed.value,
    description: description.value,
    timestamp: Date.now(),
  };
  data.push(newTodo);
  console.log(newTodo, data);
  // todo POSTd todo
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
todoList.addEventListener('click', (ev) => processItem(ev));
todoFilter.addEventListener('change', (ev) => filterItems(ev));
isComplete.addEventListener('change', (ev) => completedItems(ev));

init();