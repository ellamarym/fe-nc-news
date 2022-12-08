import './App.css';
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Articles } from './components/ArticleList';
import { LandingPage } from './components/LandingPage';
import { Header } from './components/Header';
import { FullArticle } from './components/FullArticle';
import { TopicList } from './components/TopicList';
import { UserList } from './components/UserList';

function App() {
  return (
    <div className="App">
      
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<Articles/>}/>
        <Route path="/articles/:articleID" element={<FullArticle/>}/>
        <Route path="/topics" element={<TopicList/>}/>
        <Route path="/users" element={<UserList/>}/>
        <Route path="/articles?queries" element={<Articles/>}/>
      </Routes>
    </div>
  );
}

export default App;
