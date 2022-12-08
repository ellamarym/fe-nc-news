import { createContext, useState } from "react";

export const TopicListContext = createContext();

export const TopicListProvider = (props) => {
  const [topicList, setTopicList] = useState([]);

  return (
    <TopicListContext.Provider value={{ topicList, setTopicList }}>
      {props.children}
    </TopicListContext.Provider>
  );
};