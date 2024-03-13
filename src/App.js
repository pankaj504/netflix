import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/home/Home';
import Header from './Components/header/Header';
function App() {
  return (
    <Router>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/'/>
        <Route path='/'/>
        <Route path='/'/>
      </Routes>
    </Router>
  );
}

export default App;
