import './App.scss';
import { Header } from './components/header/Header';
import {  Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import Fullvacancy from './pages/Fullvacancy/Fullvacancy';
import Favorite from './pages/favorite/Favorite';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="conteiner">

        <Routes>
          <Route path="/"  element={<Main />} />
          <Route path="/fullVacancy/:id" element={<Fullvacancy />} />
          <Route path="/favorite" element={<Favorite />} />


        </Routes>
      </div>
    </div>
  );
}

export default App;
