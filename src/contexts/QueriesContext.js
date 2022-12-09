import { createContext, useState } from "react";

export const QueriesContext = createContext();

export const QueriesProvider = (props) => {
  const [queries, setQueries] = useState([]);

  return (
    <QueriesContext.Provider value={{ queries, setQueries }}>
      {props.children}
    </QueriesContext.Provider>
  );
};