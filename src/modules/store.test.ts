import { rootReducer, RootState, createStore, combineReducers } from './store';
import { initTasks, addTask, deleteTask, toggleTask } from './actions';
import { Task, TaskActionTypes, ADD_TASK } from './types';

describe('Store Tests', () => {
  let initialState: RootState;

  beforeEach(() => {
    initialState = { tasks: [] };
  });

  it('should handle INIT_TASKS action', () => {
    const tasks = [{ id: 1, text: 'Test Task', isDone: false }];
    const action = initTasks(tasks);
    const newState = rootReducer(initialState, action);
    expect(newState.tasks).toEqual(tasks);
  });

  it('should handle ADD_TASK action', () => {
    const task = { id: 1, text: 'Test Task', isDone: false };
    const action = addTask(task);
    const newState = rootReducer(initialState, action);
    expect(newState.tasks).toEqual([task]);
  });

  it('should handle DELETE_TASK action', () => {
    const initialStateWithTask: RootState = {
      tasks: [{ id: 1, text: 'Test Task', isDone: false }],
    };
    const action = deleteTask(1);
    const newState = rootReducer(initialStateWithTask, action);
    expect(newState.tasks).toEqual([]);
  });

  it('should handle TOGGLE_TASK action', () => {
    const initialStateWithTask: RootState = {
      tasks: [{ id: 1, text: 'Test Task', isDone: false }],
    };
    const action = toggleTask(1);
    const newState = rootReducer(initialStateWithTask, action);
    expect(newState.tasks[0].isDone).toEqual(true);
  });
});

describe('Individual functions in store', () => {
  const mockTask: Task = { id: 1, text: 'Test Task', isDone: false };

  describe('getState', () => {
    it('should return the current state of the store', () => {
      const initialState: RootState = { tasks: [] };
      const store = createStore<RootState, TaskActionTypes>(
        (state) => state,
        initialState,
      );
      expect(store.getState()).toBe(initialState);
    });
  });

  describe('subscribe', () => {
    it('should call subscribers when state changes', () => {
      const initialState: RootState = { tasks: [] };
      const store = createStore<RootState, TaskActionTypes>(
        (state, action) =>
          action.type === ADD_TASK
            ? { tasks: [...state.tasks, action.payload] }
            : state,
        initialState,
      );

      const listener = jest.fn();
      store.subscribe(listener);

      store.dispatch({ type: ADD_TASK, payload: mockTask });
      expect(listener).toHaveBeenCalled();
    });

    it('should no longer call unsubscribed listeners', () => {
      const initialState: RootState = { tasks: [] };
      const store = createStore<RootState, TaskActionTypes>(
        (state) => state,
        initialState,
      );

      const listener = jest.fn();
      const unsubscribe = store.subscribe(listener);

      unsubscribe();

      store.dispatch({ type: ADD_TASK, payload: mockTask });
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('combineReducers', () => {
    it('should combine reducers and return a single reducer function', () => {
      const reducerA = (state = 0, action: unknown) =>
        typeof action === 'object' &&
        action !== null &&
        'type' in action &&
        (action as TaskActionTypes).type === ADD_TASK
          ? state + 1
          : state;

      const reducerB = (state = '', action: unknown) => {
        if (typeof action === 'object' && action !== null && 'type' in action) {
          const typedAction = action as TaskActionTypes;
          if (typedAction.type === ADD_TASK && 'text' in typedAction.payload) {
            return (typedAction.payload as Task).text;
          }
        }
        return state;
      };

      const combinedReducer = combineReducers({
        count: reducerA,
        text: reducerB,
      });

      const initialState = { count: 0, text: '' };
      const newState = combinedReducer(initialState, {
        type: ADD_TASK,
        payload: mockTask,
      });

      expect(newState).toEqual({ count: 1, text: mockTask.text });
    });
  });
});
