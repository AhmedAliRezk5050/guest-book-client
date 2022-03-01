import { createContext, useReducer, useContext } from 'react';

const MessagesContext = createContext();

const initialState = { messages: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return { messages: action.payload };
    default:
      return state;
  }
};

const MessagesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MessagesContext.Provider value={{ state, dispatch }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessagesContext = () => {
  return useContext(MessagesContext);
};

export default MessagesProvider;
