import { LocalStorage, ErrorMessages } from '../constants/enums.js';

const data = JSON.parse(localStorage.getItem('todos')) || [];
const create = document.querySelector('#create');
const form = document.querySelector('#form');
const ul = document.querySelector('ul');
const dataLength = data.length;
const displayData = () => {
  ul.innerHTML = data
    .map(
      (todo, index) => `<li class="container wrapper" data-id="${index}">${todo.title} und ${todo.description}<button class="deleteButton" data-id="${index}">Löschen</button><button class="editButton"  data-id="${index}">Bearbeiten</button></li>`,
    )
    .join('');
};
window.addEventListener('load', () => {
  const deleteButtons = document.querySelectorAll('.deleteButton');
  const editButton = document.querySelectorAll('.editButton');

  const deleteItem = (id) => {
    const updatedData = data.filter((item) => data.indexOf(item) !== Number(id));
    localStorage.setItem(LocalStorage.TODOS, JSON.stringify(updatedData));
    displayData();
  };

  deleteButtons.forEach((button) => {
    button.addEventListener('click', (ev) => {
      const { id } = ev.target.dataset;
      deleteItem(id);
    });
  });

  editButton.forEach((button) => {
    button.addEventListener('click', (ev) => {
      const { id } = ev.target.dataset;
      console.log(id);
    });
  });
});

const { title } = form.elements;
const { importance } = form.elements;
const { dueDate } = form.elements;
const { finished } = form.elements;
const { description } = form.elements;

const getNumberOfTodos = () => {
  // completed / incompleted
};

function init() {
  if (dataLength > 0) {
    displayData();
    getNumberOfTodos();
  } else ul.innerHTML = '<h2>Du bist frei 😀 Es gibt heute nichts zu machen!</h2>';
}

const submitTodo = () => {
  const newTodo = {
    title: title.value,
    importance: importance.value,
    dueDate: dueDate.value,
    finished: finished.value,
    description: description.value,
    timestamp: Date.now(),
  };
  data.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(data));
};

const submitCreate = (ev) => {
  submitTodo(ev);
};

const validationText = () => {
  if (title.validity.valueMissing) {
    title.setCustomValidity(ErrorMessages.ERROR_TITLE);
  } if (importance.validity.rangeUnderflow) {
    importance.setCustomValidity(ErrorMessages.IMPORTANCE);
  } if (dueDate.validity.valueMissing) {
    dueDate.setCustomValidity(ErrorMessages.DUE_DATE);
  }
};

create.addEventListener('click', () => console.log('clicked create button'));
form.addEventListener('submit', (e) => {
  submitCreate(e);
});
title.addEventListener('input', validationText);
init();