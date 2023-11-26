import React, { createContext, useReducer, useContext } from "react";

// Define your initial state
const initialState = {
  selectedItems: [],
};

// Define your reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.payload],
      };
    default:
      return state;
  }
};

// Create a context with initial state and reducer
const AppContext = createContext();

// Create a provider component to wrap your app
export default function AppProvider ({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to access the context
export default function useAppContext () {
  return useContext(AppContext);
};
