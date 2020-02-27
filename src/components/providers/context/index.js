import React, { useReducer, createContext } from 'react';

import defaultContext from './defaultContext';

const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return defaultContext;
    case 'setLang':
      return { ...state, siteLang: action.siteLang };
  }
};

const AppContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, defaultContext);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
