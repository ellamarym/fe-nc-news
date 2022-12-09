import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { TopicListProvider } from './contexts/TopicListContext';
import { UserProvider } from './contexts/UserContext';
import { TopicProvider } from './contexts/TopicContext';
import { QueriesProvider } from './contexts/QueriesContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <TopicProvider>
    <UserProvider>
    <TopicListProvider>
      <QueriesProvider>
      <App />
    </QueriesProvider>
    </TopicListProvider>
    </UserProvider>
    </TopicProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
