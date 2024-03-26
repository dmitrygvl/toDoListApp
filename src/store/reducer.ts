import {
  TasksState,
  TaskActionTypes,
  INIT_TASKS,
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
} from '../types/types';

export const initialState: TasksState = [];

export const tasksReducer = (
  state: TasksState,
  action: TaskActionTypes,
): TasksState => {
  const currentState = state || initialState;
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case DELETE_TASK:
      return state.filter((task) => task.id !== action.payload);
    case TOGGLE_TASK:
      return state.map((task) =>
        task.id === action.payload ? { ...task, isDone: !task.isDone } : task,
      );
    case INIT_TASKS:
      return action.payload;
    default:
      return currentState;
  }
};

export default tasksReducer;
