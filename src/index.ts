import './styles/styles.css';
import { runApp } from './modules/runApp';
import { initTasks, addTask, deleteTask, toggleTask } from './modules/actions';
import store from './modules/store';
import crossIcon from './assets/img/cross.svg';
import tickIcon from './assets/img/tick.svg';
import { updateUI } from './modules/renderTask';

const app = document.getElementById('app') as HTMLElement;

runApp(app);

export const form = document.getElementById('form') as HTMLFormElement;
export const taskInput = document.getElementById(
  'taskInput',
) as HTMLInputElement;
export const tasksList = document.getElementById('tasksList') as HTMLElement;

// Инициализация состояния из localStorage
const savedTasks = localStorage.getItem('tasks');
const initialState = savedTasks ? JSON.parse(savedTasks) : [];

store.dispatch(initTasks(initialState));

// Обработчики событий
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText) {
    const newTask = { id: Date.now(), text: taskText, isDone: false };
    store.dispatch(addTask(newTask));
    taskInput.value = '';
  }
});

tasksList.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const taskElement = target.closest('li');
  const taskId = taskElement ? parseInt(taskElement.id, 10) : null;

  if (taskId !== null) {
    if (target.closest('[data-action="delete"]')) {
      store.dispatch(deleteTask(taskId));
    } else if (target.closest('[data-action="done"]')) {
      store.dispatch(toggleTask(taskId));
    }
  }
});

// Подписка на изменения в store и сохранение задач в localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('tasks', JSON.stringify(state.tasks));
  updateUI(state.tasks);
});

// Инициализация UI
updateUI(initialState);
