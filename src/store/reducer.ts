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
  state: TasksState | undefined,
  action: TaskActionTypes,
): TasksState => {
  const currentState = state === undefined ? initialState : state;
  switch (action.type) {
    case ADD_TASK:
      return [...currentState, action.payload];
    case DELETE_TASK:
      return currentState.filter((task) => task.id !== action.payload);
    case TOGGLE_TASK:
      return currentState.map((task) =>
        task.id === action.payload ? { ...task, isDone: !task.isDone } : task,
      );
    case INIT_TASKS:
      return action.payload;
    default:
      return currentState;
  }
};

export default tasksReducer;
