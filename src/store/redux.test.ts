import { combineReducers, createStore } from './store';
import { tasksReducer } from './reducer';
import { addTask, deleteTask, toggleTask } from './actions';
import { Task } from '../types/types';

describe('createStore', () => {
  it('creates a store with initial state', () => {
    const initialState: Task[] = [];
    const store = createStore(tasksReducer, initialState);
    expect(store.getState()).toEqual(initialState);
  });
});

describe('dispatch', () => {
  it('updates state when dispatching an action', () => {
    const initialState: Task[] = [];
    const store = createStore(tasksReducer, initialState);
    const task = { id: 1, text: 'Test Task', isDone: false };
    store.dispatch(addTask(task));
    expect(store.getState()).toContainEqual(task);
  });
});

describe('subscribe and unsubscribe', () => {
  it('should call listener when state changes', () => {
    const initialState: Task[] = [];
    const store = createStore(tasksReducer, initialState);
    const listener = jest.fn();
    store.subscribe(listener);

    store.dispatch({
      type: 'ADD_TASK',
      payload: { id: 1, text: 'Test Task', isDone: false },
    });
    expect(listener).toHaveBeenCalled();
  });

  it('should not call unsubscribed listener', () => {
    const initialState: Task[] = [];
    const store = createStore(tasksReducer, initialState);
    const listener = jest.fn();

    const unsubscribe = store.subscribe(listener);
    unsubscribe();

    store.dispatch({
      type: 'ADD_TASK',
      payload: { id: 1, text: 'Test Task', isDone: false },
    });
    expect(listener).not.toHaveBeenCalled();
  });
});

describe('combineReducers', () => {
  it('should combine reducers', () => {
    const rootReducer = combineReducers({ tasks: tasksReducer });
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toHaveProperty('tasks');
  });
});

describe('tasksReducer', () => {
  it('handles ADD_TASK action', () => {
    const initialState: Task[] = [];
    const task = { id: 1, text: 'Test Task', isDone: false };
    const newState = tasksReducer(initialState, addTask(task));
    expect(newState).toContainEqual(task);
  });

  it('handles DELETE_TASK action', () => {
    const initialState: Task[] = [{ id: 1, text: 'Test Task', isDone: false }];
    const newState = tasksReducer(initialState, deleteTask(1));
    expect(newState).toEqual([]);
  });

  it('handles TOGGLE_TASK action', () => {
    const initialState: Task[] = [{ id: 1, text: 'Test Task', isDone: false }];
    const newState = tasksReducer(initialState, toggleTask(1));
    expect(newState[0].isDone).toBe(true);
  });
});

describe('multiple actions in store', () => {
  it('updates state correctly after multiple actions', () => {
    const store = createStore(tasksReducer, []);
    store.dispatch(addTask({ id: 1, text: 'Task 1', isDone: false }));
    store.dispatch(addTask({ id: 2, text: 'Task 2', isDone: false }));
    store.dispatch(toggleTask(1));

    const currentState = store.getState();
    expect(currentState).toHaveLength(2);
    expect(currentState[0].isDone).toBe(true);
    expect(currentState[1].isDone).toBe(false);
  });
});

describe('store subscribe behavior', () => {
  it('notifies subscribers on state change', () => {
    const store = createStore(tasksReducer, []);
    const listener = jest.fn();

    store.subscribe(listener);
    store.dispatch(addTask({ id: 1, text: 'Task 1', isDone: false }));

    expect(listener).toHaveBeenCalledTimes(1);
  });
});
