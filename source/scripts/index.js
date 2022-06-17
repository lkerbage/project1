window.addEventListener('load', () => {
  const deleteButtons = document.querySelectorAll('.deleteButton');
  const editButton = document.querySelectorAll('.editButton');

  const deleteItem = (id) => {
    getData();
    alert(id);
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

const create = document.querySelector('#create');
const form = document.querySelector('#form');
const ul = document.querySelector('ul');
const data = JSON.parse(localStorage.getItem('todos')) || [];
const dataLength = data.length;

const { title } = form.elements;
const { importance } = form.elements;
const { dueDate } = form.elements;
const { finished } = form.elements;
const { description } = form.elements;

const getData = () => {
  ul.innerHTML = data
    .map(
      (todo, index) => `<li class="container wrapper" data-id="${index}">${todo.title} und ${todo.description}<button class="deleteButton" data-id="${index}">Löschen</button><button class="editButton"  data-id="${index}">Bearbeiten</button></li>`,
    )
    .join('');
};
const getNumberOfTodos = () => {
  // completed / incompleted
};

function init() {
  if (dataLength > 0) {
    getData();
    getNumberOfTodos();
  } else ul.innerHTML = '<h2>Du bist frei 😀 Es gibt heute nichts zu machen!</h2>';
}
init();

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

  getData();
};

const submitCreate = (ev) => {
  submitTodo(ev);
};

const validationText = () => {
  if (title.validity.valueMissing) {
    title.setCustomValidity('Bitte füge einen Titel ein');
  } else if (importance.validity.rangeUnderflow) {
    importance.setCustomValidity('Der Wert muss zwischen 0 und 3 betragen');
  } else if (dueDate.validity.valueMissing) {
    dueDate.setCustomValidity('Bitte ein Datum eingeben');
  } else {
    title.setCustomValidity('');
  }
};

create.addEventListener('click', () => console.log('clicked create button'));
form.addEventListener('submit', (e) => {
  submitCreate(e);
});
title.addEventListener('input', validationText);
// deleteButtons.addEventListener('click', (ev) => deleteItem(ev));