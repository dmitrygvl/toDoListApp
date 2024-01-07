import { tasksReducer, initialState } from './reducer';
import {
  TaskActionTypes,
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  INIT_TASKS,
} from './types';

describe('tasksReducer', () => {
  it('should handle ADD_TASK action', () => {
    const action: TaskActionTypes = {
      type: ADD_TASK,
      payload: { id: 1, text: 'Test Task', isDone: false },
    };

    const newState = tasksReducer(undefined, action);

    expect(newState).toEqual([{ id: 1, text: 'Test Task', isDone: false }]);
  });

  it('should handle DELETE_TASK action', () => {
    const prevState = [{ id: 1, text: 'Test Task', isDone: false }];
    const action: TaskActionTypes = { type: DELETE_TASK, payload: 1 };

    const newState = tasksReducer(prevState, action);

    expect(newState).toEqual([]);
  });

  it('should handle TOGGLE_TASK action', () => {
    const prevState = [{ id: 1, text: 'Test Task', isDone: false }];
    const action: TaskActionTypes = { type: TOGGLE_TASK, payload: 1 };

    const newState = tasksReducer(prevState, action);

    expect(newState).toEqual([{ id: 1, text: 'Test Task', isDone: true }]);
  });

  it('should handle INIT_TASKS action', () => {
    const action: TaskActionTypes = {
      type: INIT_TASKS,
      payload: [{ id: 1, text: 'Test Task', isDone: false }],
    };

    const newState = tasksReducer(undefined, action);

    expect(newState).toEqual([{ id: 1, text: 'Test Task', isDone: false }]);
  });
});
