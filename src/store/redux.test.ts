import tasksReducer, { initialState } from './reducer';
import { addTask, deleteTask, toggleTask, initTasks } from './actions';
import store from './store';
import { TaskActionTypes } from '../types/types';

describe('tasksReducer', () => {
  it('should return the initial state', () => {
    const action = {} as TaskActionTypes;
    expect(tasksReducer(undefined, action)).toEqual(initialState);
  });

  it('should handle INIT_TASKS', () => {
    const tasks = [{ id: 1, text: 'Test Task', isDone: false }];
    expect(tasksReducer(undefined, initTasks(tasks))).toEqual(tasks);
  });

  it('should handle ADD_TASK', () => {
    const newTask = { id: 2, text: 'New Task', isDone: false };
    expect(tasksReducer(undefined, addTask(newTask))).toEqual([newTask]);
  });

  it('should handle DELETE_TASK', () => {
    const testState = [{ id: 1, text: 'Test Task', isDone: false }];
    expect(tasksReducer(testState, deleteTask(1))).toEqual([]);
  });

  it('should handle TOGGLE_TASK', () => {
    const testState = [{ id: 1, text: 'Test Task', isDone: false }];
    expect(tasksReducer(testState, toggleTask(1))).toEqual([
      { id: 1, text: 'Test Task', isDone: true },
    ]);
  });
});

describe('task actions', () => {
  it('should create an action to add a task', () => {
    const task = { id: 1, text: 'Test Task', isDone: false };
    const expectedAction = {
      type: 'ADD_TASK',
      payload: task,
    };
    expect(addTask(task)).toEqual(expectedAction);
  });

  it('should create an action to delete a task', () => {
    const taskId = 1;
    const expectedAction = {
      type: 'DELETE_TASK',
      payload: taskId,
    };
    expect(deleteTask(taskId)).toEqual(expectedAction);
  });

  it('should create an action to toggle a task', () => {
    const taskId = 1;
    const expectedAction = {
      type: 'TOGGLE_TASK',
      payload: taskId,
    };
    expect(toggleTask(taskId)).toEqual(expectedAction);
  });

  it('should create an action to initialize tasks', () => {
    const tasks = [{ id: 1, text: 'Test Task', isDone: false }];
    const expectedAction = {
      type: 'INIT_TASKS',
      payload: tasks,
    };
    expect(initTasks(tasks)).toEqual(expectedAction);
  });
});

describe('store', () => {
  it('should handle adding tasks', () => {
    const task = { id: 1, text: 'Test Task', isDone: false };
    store.dispatch(addTask(task));
    expect(store.getState().tasks).toEqual([task]);
  });

  it('should handle deleting tasks', () => {
    const task = { id: 1, text: 'Test Task', isDone: false };
    store.dispatch(addTask(task));
    store.dispatch(deleteTask(1));
    expect(store.getState().tasks).toEqual([]);
  });

  it('should handle toggling tasks', () => {
    const task = { id: 1, text: 'Test Task', isDone: false };
    store.dispatch(addTask(task));
    store.dispatch(toggleTask(1));
    expect(store.getState().tasks[0].isDone).toBe(true);
  });

  it('should handle initializing tasks', () => {
    const tasks = [{ id: 1, text: 'Test Task', isDone: false }];
    store.dispatch(initTasks(tasks));
    expect(store.getState().tasks).toEqual(tasks);
  });

  it('should return a unsubscribe function from subscribe', () => {
    const listener = jest.fn();
    const unsubscribe = store.subscribe(listener);
    expect(typeof unsubscribe).toBe('function');
    unsubscribe();
    store.dispatch(addTask({ id: 2, text: 'Another Task', isDone: false }));
    expect(listener).not.toHaveBeenCalledTimes(2);
  });
});
