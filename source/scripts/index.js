import { ErrorMessages } from '../constants/enums.js';
import { todoData } from '../model/model.js';

const data = todoData;
const form = document.querySelector('#form');
const ul = document.querySelector('ul');
const todoTitle = document.querySelector('.todo-title');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.filter');
const showByStatus = document.querySelector('.show-by-status');
const _displayTop = document.querySelector('.display-top');
const _displayBottom = document.querySelector('.display-bottom');
const createButton = document.querySelector('.create-new-item');
const overview = document.querySelector(('#overview'));
const submitButton = document.querySelector(('.create-button'));

const dataLength = data.length;

const { title } = form.elements;
const { importance } = form.elements;
const { dueDate } = form.elements;
const { completed } = form.elements;
const { description } = form.elements;

const hideBottom = () => (_displayBottom.style.display = 'none');
const hideTop = () => (_displayTop.style.display = 'none');
const displayTop = () => (_displayTop.style.display = 'block');
const displayBottom = () => (_displayBottom.style.display = 'block');

const showImportance = (_importance) => {
  const flashes = [];
  for (let i = 0; i < _importance; i++) {
    flashes.push("<ion-icon name='flash'></ion-icon>");
  }
  return `<span className="displayInline">${flashes.join('')}</span>`;
};

const getDaysDueDate = (dateNow, todo) => {
  const today = dateNow;
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const date = new Date(todo.dueDate).toLocaleDateString('de');
  if (date === new Date().toLocaleDateString('de')) {
    console.log(new Date().toLocaleDateString('de'));
    return 'Heute fällig';
  }
  if (date === new Date(tomorrow).toLocaleDateString('de')) {
    return 'Morgen fällig';
  }
  return `Fällig am ${date}`;
};
const displayData = (currentData = data) => {
  const dateNow = Date.now();
  ul.innerHTML = currentData
    .map(
      (
        todo,
        index,
      ) => `<li class="container wrapper alignCenter" data-id="${index}">
<div class="itemContainerTop">
          <div ><button class="editButton" data-id="${index}">Bearbeiten</button></div> 
          <div ><strong>${todo.title}</strong></div> 
          <div ><input data-id="${index}" class="toggle" data-status="status" type="checkbox" ${
  todo.completed ? 'checked' : ''
}/></div> 
       </div>   
<div class="itemContainerBottom">
  <div class="box ">${getDaysDueDate(dateNow, todo)}</div>
  <div class="box ">${todo.description}</div>
  <div class="box ">${showImportance(todo.importance)}</div>
    </div>
  
  </li>`,
    )
    .join('');
};

const changeButtonText = () => {
  submitButton.innerHTML = 'editieren';
};

const updateItem = (id) => {
  hideBottom();
  const updateData = data[id];
  const formIds = Object.keys(updateData);
  formIds.forEach((name) => {
    form.elements[name].value = updateData[name];
    if (name === 'completed' && form.elements[name].value == 1) {
      form.elements[name].setAttribute('checked', 'checked');
    }
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
    displayTop();
    hideBottom();
    changeButtonText();
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

const displayOpenAndCompletedTodos = (_dataLength) => {
  const completedTodos = data.filter((todo) => todo.completed == 1);
  const numberOfIncompleted = _dataLength - completedTodos.length;
  todoTitle.innerHTML = `<h2> ${
    _dataLength === 1 ? `${_dataLength} Aufgabe` : `${_dataLength}  Aufgaben,`
  } davon ${numberOfIncompleted} offene Aufgaben</h2>`;
};

function init() {
  if (dataLength > 0) {
    displayData();
    displayOpenAndCompletedTodos(dataLength);
  } else {
    ul.innerHTML = '<h2 class="alignCenter">Du bist frei 😀 Es gibt heute nichts zu machen!</h2>';
  }
}

const submitTodo = () => {
  const newTodo = {
    title: title.value,
    importance: importance.value,
    dueDate: dueDate.value,
    completed: Number(completed.checked),
    description: description.value,
    timestamp: Date.now(),
  };
  data.push(newTodo);
  alert(JSON.stringify(newTodo));
  // todo POST todo
};

const submit = (ev) => {
  const { id } = ev.target;
  if (id === 'create') {
    submitTodo(ev);
    processItem(ev);
    hideTop(); displayBottom();
  }
};

const validationText = () => {
  if (title.validity.valueMissing) {
    title.setCustomValidity(ErrorMessages.ERROR_TITLE);
  } else {
    title.setCustomValidity('');
  }
  if (importance.validity.rangeUnderflow || importance.validity.valueMissing) {
    importance.setCustomValidity(ErrorMessages.IMPORTANCE);
  } else {
    importance.setCustomValidity('');
  }
  if (dueDate.validity.valueMissing) {
    dueDate.setCustomValidity(ErrorMessages.DUE_DATE);
  } else {
    dueDate.setCustomValidity('');
  }
};

init();

form.addEventListener('submit', (ev) => {
  submit(ev);
});
form.addEventListener('click', validationText);
todoList.addEventListener('click', (ev) => {
  processItem(ev);
});
todoFilter.addEventListener('change', (ev) => filterItems(ev));
showByStatus.addEventListener('change', (ev) => completedItems(ev));
createButton.addEventListener('click', () => {
  hideBottom();
  displayTop();
});
overview.addEventListener('click', () => {
  hideTop(); displayBottom();
});