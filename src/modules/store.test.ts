import { rootReducer, RootState } from './store';
import { initTasks, addTask, deleteTask, toggleTask } from './actions';

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
