import './App.css';
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Articles } from './components/ArticleList';

function App() {
  return (
    <div className="App">
      <h1>NC-NEWS</h1>
      <Routes>
        <Route path="/articles" element={<Articles/>}/>
      </Routes>
    </div>
  );
}

export default App;
