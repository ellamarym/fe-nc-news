import { createContext, useState } from "react";

export const TopicContext = createContext();

export const TopicProvider = (props) => {
  const [topic, setTopic] = useState([]);

  return (
    <TopicContext.Provider value={{ topic, setTopic }}>
      {props.children}
    </TopicContext.Provider>
  );
};