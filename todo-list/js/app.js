'use strict';

const themes = {
  default: {
    "--body-bg": "#d4d8db",
    "--task-bg": "#bfd9ec",
    '--base-text-color': '#212529',
    '--header-bg': '#007bff',
    '--header-text-color': '#fff',
    '--default-btn-bg': '#007bff',
    '--default-btn-text-color': '#fff',
    '--default-btn-hover-bg': '#0069d9',
    '--default-btn-border-color': '#0069d9',
    '--danger-btn-bg': '#dc3545',
    '--danger-btn-text-color': '#fff',
    '--danger-btn-hover-bg': '#bd2130',
    '--danger-btn-border-color': '#dc3545',
    '--input-border-color': '#ced4da',
    '--input-bg-color': '#fff',
    '--input-text-color': '#495057',
    '--input-focus-bg-color': '#fff',
    '--input-focus-text-color': '#495057',
    '--input-focus-border-color': '#80bdff',
    '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
  },
  dark: {
    "--body-bg": "#d4d8db",
    "--task-bg": "#e4c4c4",
    '--base-text-color': '#212529',
    '--header-bg': '#343a40',
    '--header-text-color': '#fff',
    '--default-btn-bg': '#58616b',
    '--default-btn-text-color': '#fff',
    '--default-btn-hover-bg': '#292d31',
    '--default-btn-border-color': '#343a40',
    '--default-btn-focus-box-shadow':
      '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    '--danger-btn-bg': '#b52d3a',
    '--danger-btn-text-color': '#fff',
    '--danger-btn-hover-bg': '#88222c',
    '--danger-btn-border-color': '#88222c',
    '--input-border-color': '#ced4da',
    '--input-bg-color': '#fff',
    '--input-text-color': '#495057',
    '--input-focus-bg-color': '#fff',
    '--input-focus-text-color': '#495057',
    '--input-focus-border-color': '#78818a',
    '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
  },
  light: {
    "--body-bg": "#d6dce0",
    "--task-bg": "#d8e4c4",
    '--base-text-color': '#212529',
    '--header-bg': '#fff',
    '--header-text-color': '#212529',
    '--default-btn-bg': '#fff',
    '--default-btn-text-color': '#212529',
    '--default-btn-hover-bg': '#e8e7e7',
    '--default-btn-border-color': '#343a40',
    '--default-btn-focus-box-shadow':
      '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    '--danger-btn-bg': '#f1b5bb',
    '--danger-btn-text-color': '#212529',
    '--danger-btn-hover-bg': '#ef808a',
    '--danger-btn-border-color': '#e2818a',
    '--input-border-color': '#ced4da',
    '--input-bg-color': '#fff',
    '--input-text-color': '#495057',
    '--input-focus-bg-color': '#fff',
    '--input-focus-text-color': '#495057',
    '--input-focus-border-color': '#78818a',
    '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
  },
};

let lastSelectedTheme = localStorage.getItem('app_theme') || 'default';
let objOfTasks = {};

//Elements UI
const listContainer = document.querySelector('.list-group');
const form = document.forms['addTask'];
const inputTitle = form.elements['title'];
const inputBody = form.elements['body'];
const themeSelect = document.getElementById('themeSelect');

//Events
start();
setTheme(lastSelectedTheme);
form.addEventListener('submit', onFormSubmit);
listContainer.addEventListener('click', deleteHandler);
themeSelect.addEventListener('change', themeHandler);

function start() {
  objOfTasks = JSON.parse(localStorage.getItem("tasks"));
  console.log(objOfTasks);
  if (!objOfTasks) {
    objOfTasks = {};
    return;
  }
  renderAllTasks(objOfTasks);
}

//Functions
function renderAllTasks(tasksList) {
  const fragment = document.createDocumentFragment();
  Object.values(tasksList).forEach(task => {
    const li = listItemTemplate(task);
    fragment.append(li);
  });
  listContainer.append(fragment);
}

function listItemTemplate({ _id, title, body } = {}) {
  const li = document.createElement('li');
  li.classList.add(
    "list-group-item"
  );
  li.setAttribute('data-task-id', _id);
  const span = document.createElement('span');
  span.textContent = title;
  span.style.fontWeight = 'bold';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Удалить';
  deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

  const article = document.createElement('p');
  article.textContent = body;
  article.classList.add('mt-2', 'w-100');

  li.append(span);
  li.append(article);
  li.append(deleteBtn);

  return li;
}

function onFormSubmit(e) {
  e.preventDefault();
  const titleValue = inputTitle.value;
  const bodyValue = inputBody.value;

  if (!titleValue || !bodyValue) {
    alert('Заполните все поля');
    return;
  }
  const task = createNewTask(titleValue, bodyValue);
  const listItem = listItemTemplate(task);
  listContainer.insertAdjacentElement('afterend', listItem);
  form.reset();
}

function createNewTask(title, body) {
  const newTask = {
    title,
    body,
    completed: false,
    _id: `task-${Math.random()}`
  };

  objOfTasks[newTask._id] = newTask;
  localStorage.setItem('tasks', JSON.stringify(objOfTasks));
  return { ...newTask };
}

function deleteTask(id) {
  console.log(objOfTasks[id]);
  const { title } = objOfTasks[id];
  const isConfirm = confirm(`Вы точно хотите удалить задачу: ${title}?`);
  if (!isConfirm) return isConfirm;
  delete objOfTasks[id];
  localStorage.setItem('tasks', JSON.stringify(objOfTasks));
  return isConfirm;
}

function deleteTaskFromHTML(confirmed, el) {
  if (!confirmed) return;
  el.remove();
}

function deleteHandler({ target }) {
  if (target.classList.contains('delete-btn')) {
    const parent = target.closest('[data-task-id]');
    const id = parent.dataset.taskId;
    const confirmed = deleteTask(id);
    deleteTaskFromHTML(confirmed, parent);
  }
}

function themeHandler() {
  const selectedTheme = themeSelect.value;

  setTheme(selectedTheme);
  lastSelectedTheme = selectedTheme;
  localStorage.setItem('app_theme', selectedTheme);
}

function setTheme(name) {
  const selectedThemeObj = themes[name];
  Object.entries(selectedThemeObj).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}
