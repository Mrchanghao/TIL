import React, { createContext } from 'react'

const allData = new Array(25).fill(0).map((_val, i) => i + 1);
const perPage = 10;
const types = {
  start: "START",
  loaded: "LOADED"
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.start:
      return { ...state, loading: true };
    case types.loaded:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.newData],
        more: action.newData.length === perPage, // type boolean
        after: state.after + action.newData.length
      };
    default:
      throw new Error("Don't understand action");
  }
};

export const MyContext = createContext();


export function MyProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    loading: false,
    more: true,
    data: [],
    after: 0
  });
  const { loading, data, after, more } = state;

  const load = () => {
    dispatch({ type: types.start });

    setTimeout(() => {
      const newData = allData.slice(after, after + perPage);
      dispatch({ type: types.loaded, newData });
    }, 500);
  };

  return (
    <MyContext.Provider value={{ loading, data, more, load }}>
      {children}
    </MyContext.Provider>
  );
}