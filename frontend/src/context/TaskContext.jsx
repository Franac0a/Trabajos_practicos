import { createContext, useReducer } from "react";

export const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload, loading: false };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const initialState = {
    tasks: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
