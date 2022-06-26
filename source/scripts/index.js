import { ErrorMessages } from '../constants/enums.js';

let data = await fetch('/notes/', {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache', //
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
}).then((res) => res.json()).then((result) => result).catch((err) => {
  console.error('GET err', err);
});

if (!data) {
  data = [];
}

const form = document.querySelector('#form');
const ul = document.querySelector('ul');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.filter');
const showByStatus = document.querySelector('.show-by-status');
const _displayTop = document.querySelector('.display-top');
const _displayBottom = document.querySelector('.display-bottom');
const createButton = document.querySelector('.create-new-item');
const overview = document.querySelector('#overview');
const submitButton = document.querySelector('.create-button');
const todoFilters = document.querySelector('.todo-filter');
const div = document.querySelector('div');
const box = document.querySelector('.box');
const wrapper = document.querySelector('.wrapper');
const themeSwitcher = document.querySelector('#theme-switcher');
const theme = localStorage.getItem('theme');

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
const titleFocus = () => title.focus();
const changeButtonText = () => {
  submitButton.innerHTML = 'Bearbeiten';
};
const localStorageTheme = () => {
  if (theme === 'black') {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
    div.style.backgroundColor = 'black';
    box.style.backgroundColor = 'black';
    wrapper.style.backgroundColor = 'black';
  } else if (theme === 'white') {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
  } else {
    localStorage.setItem('theme', 'white');
  }
};

const setTheme = () => {
  if (theme === 'white') {
    localStorage.setItem('theme', 'black');
  } else { localStorage.setItem('theme', 'white'); }
  location.reload();
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

const showImportance = (_importance) => {
  const flashes = [];
  for (let i = 0; i < _importance; i++) {
    flashes.push("<ion-icon name='flash'></ion-icon>");
  }
  return `<span className="displayInline">${flashes.join('')}</span>`;
};

const getCompleted = (s) => {
  if (s === 'y') {
    return '<ion-icon style="font-size:25px;color:forestgreen" name="checkmark-circle-outline"></ion-icon>';
  }
  return '<ion-icon style="font-size: 25px; color:red" name="alert-outline"></ion-icon>';
};

const getDaysDueDate = (todo) => {
  const today = Date.now();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = new Date(todo.dueDate).toLocaleDateString('de');

  if (date === new Date().toLocaleDateString('de')) {
    return 'Heute fällig';
  }
  if (date === new Date(tomorrow).toLocaleDateString('de')) {
    return 'Morgen fällig';
  }
  return `Fällig am ${date}`;
};
const displayData = (currentData = data) => {
  ul.innerHTML = currentData
    .map(
      (
        todo,
        index,
      ) => `<li class="container wrapper alignCenter ${theme}" data-id="${index}" >
<div class="itemContainerTop ">
          <div ><button class="editButton" data-id="${index}">Bearbeiten</button></div> 
          <div ><strong>${todo.title}</strong></div> 
          <div >${todo.completed ? getCompleted('y') : getCompleted('n')}</div> 
       </div>   
<div class="itemContainerBottom">
  <div class="box ${theme}">${getDaysDueDate(todo)}</div>
  <div class="box ${theme}">${todo.description}</div>
  <div class="box ${theme}">${showImportance(todo.importance)}</div>
    </div>
  
  </li>`,
    )
    .join('');
};

const updateItem = (id) => {
  hideBottom();
  displayTop();
  const updateData = data[id];
  const formIds = Object.keys(updateData);
  formIds.forEach((name) => {
    if (form.elements[name]) form.elements[name].value = updateData[name];
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

function init() {
  if (dataLength > 0) {
    displayData();
  } else {
    todoFilters.style.display = 'none';
    ul.innerHTML = '<h2 class="alignCenter">Du bist frei 😀 Es gibt heute nichts zu machen!</h2>';
  }
  localStorageTheme();
}

const submitTodo = async () => {
  const newTodo = {
    title: title.value,
    importance: importance.value,
    dueDate: dueDate.value,
    completed: Number(completed.checked),
    description: description.value,
    timestamp: Date.now(),
  };
  if (submitButton.innerHTML === 'Erstellen') {
    await fetch('/notes/', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(newTodo),
    }).then((res) => {
      res.json();
    })
      .then(() => {
        location.reload();
      }).catch((err) => {
        console.error(err);
      });
  }
  if (submitButton.innerHTML === 'Bearbeiten') {
    await fetch('/notes/', {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(newTodo),
    }).then((res) => {
      res.json();
      console.log(res.json(), 'resJson');
    })
      .then(() => {
      }).catch((err) => {
        console.error(err);
      });
  }
};

const submit = async (ev) => {
  ev.preventDefault();
  await submitTodo(ev);
  processItem(ev);
  hideTop();
  displayBottom();
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
  titleFocus();
  form.reset();
  submitButton.innerHTML = 'Erstellen';
});
overview.addEventListener('click', () => {
  hideTop(); displayBottom();
});
themeSwitcher.addEventListener('click', () => setTheme());