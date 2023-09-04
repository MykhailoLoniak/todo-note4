import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFount from './components/NotFount';
import MainLayout from './layouts/MainLayout';
import BirthdayTracker from './components/BirthdayTracker';
import Calendar from './components/Calendar';
import Skill from './components/Skill';
import './App.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path='/' index element={<Calendar />} />
            <Route path='skill' element={<Skill />} />
            <Route path='birthdayTracker' element={<BirthdayTracker />} />
            <Route path='*' element={<NotFount />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <BirthdayTracker /> 
      <Skill /> */}
    </div>
  );
}

export default App;
