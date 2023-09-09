import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFount from './components/NotFount';
import MainLayout from './layouts/MainLayout';
import BirthdayTracker from './components/birthdayTracker/BirthdayTracker';
import Calendar from './components/Calendar';
import Skills from './components/skills/Skills';
import './App.css';
import { useState } from 'react';
import arrData from './components/arrData';

function App() {
  const [arrBirthday, setArrBirthday] = useState(arrData);
  const currentDate = new Date();

  // Divide the birthdays into two arrays: past and future
  const pastBirthdays = [];
  const futureBirthdays = [];

  arrBirthday.forEach((item) => {
    if (item.date.getMonth() === currentDate.getMonth()) {
      if (item.date.getDate() < currentDate.getDate()) {
        pastBirthdays.push(item);
      } else {
        futureBirthdays.push(item);
      }
    } else if (item.date.getMonth() < currentDate.getMonth()) {
      pastBirthdays.push(item);
    } else {
      futureBirthdays.push(item);
    }
  }, []);

  // Sort both arrays by month and day
  pastBirthdays.sort((a, b) => {
    const monthDayA = (a.date.getMonth() + 1) * 100 + a.date.getDate();
    const monthDayB = (b.date.getMonth() + 1) * 100 + b.date.getDate();
    return monthDayA - monthDayB;
  });

  futureBirthdays.sort((a, b) => {
    const monthDayA = (a.date.getMonth() + 1) * 100 + a.date.getDate();
    const monthDayB = (b.date.getMonth() + 1) * 100 + b.date.getDate();
    return monthDayA - monthDayB;
  });

  // Combine the sorted arrays with past birthdays first
  const sortedBirthdays = [...futureBirthdays, ...pastBirthdays];
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<MainLayout sortedBirthdays={sortedBirthdays} />}
          >
            <Route path='/' index element={<Calendar />} />
            <Route path='skills' element={<Skills />} />
            <Route
              path='birthdayTracker'
              element={
                <BirthdayTracker
                  sortedBirthdays={sortedBirthdays}
                  arrBirthday={arrBirthday}
                  setArrBirthday={setArrBirthday}
                />
              }
            />
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
