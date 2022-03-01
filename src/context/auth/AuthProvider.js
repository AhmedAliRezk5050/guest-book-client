import { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext();

const initialState = { userData: null };

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { userData: action.payload };
    case 'REMOVE_USER':
      return { userData: null };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
