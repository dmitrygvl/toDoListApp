// import { Task } from './types';
// import crossIcon from "../assets/img/cross.svg";
// import tickIcon from "../assets/img/tick.svg";

// // export const tasksList = document.getElementById("tasksList") as HTMLElement;

// export function renderTask(task: Task) {
//   const cssClass = task.isDone ? 'task-title task-title--done' : 'task-title';
//   const taskHTML = `
//       <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
//         <span class="${cssClass}">${task.text}</span>
//         <div class="task-item__buttons">
//           <button type="button" data-action="done" class="btn-action">
//             <img src="${tickIcon}" alt="Done" width="18" height="18">
//           </button>
//           <button type="button" data-action="delete" class="btn-action">
//             <img src="${crossIcon}" alt="Delete" width="18" height="18">
//           </button>
//         </div>
//       </li>`;
//   // tasksList.insertAdjacentHTML('beforeend', taskHTML);
// }

// // Функция для обновления UI
// export function updateUI(tasks: Task[]) {
//   tasksList.innerHTML = '';
//   tasks.forEach(renderTask);
// }
