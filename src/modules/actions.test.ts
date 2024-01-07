import { Task } from './types';
import { initTasks, addTask, deleteTask, toggleTask } from './actions';

describe('actions', () => {
  test('initTasks should create INIT_TASKS action', () => {
    const tasks: Task[] = [{ id: 1, text: 'Test Task', isDone: false }];
    const expectedAction = { type: 'INIT_TASKS', payload: tasks };
    expect(initTasks(tasks)).toEqual(expectedAction);
  });

  test('addTask should create ADD_TASK action', () => {
    const task: Task = { id: 1, text: 'Test Task', isDone: false };
    const expectedAction = { type: 'ADD_TASK', payload: task };
    expect(addTask(task)).toEqual(expectedAction);
  });

  test('deleteTask should create DELETE_TASK action', () => {
    const taskId = 1;
    const expectedAction = { type: 'DELETE_TASK', payload: taskId };
    expect(deleteTask(taskId)).toEqual(expectedAction);
  });

  test('toggleTask should create TOGGLE_TASK action', () => {
    const taskId = 1;
    const expectedAction = { type: 'TOGGLE_TASK', payload: taskId };
    expect(toggleTask(taskId)).toEqual(expectedAction);
  });
});
