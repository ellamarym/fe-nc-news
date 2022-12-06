import './App.css';
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Articles } from './components/ArticleList';
import { LandingPage } from './components/LandingPage';
import { Header } from './components/Header';
import { FullArticle } from './components/FullArticle';

function App() {
  return (
    <div className="App">
      
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<Articles/>}/>
        <Route path="/articles/:articleID" element={<FullArticle/>}/>
      </Routes>
    </div>
  );
}

export default App;
