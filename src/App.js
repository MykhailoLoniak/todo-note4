import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFount from './components/NotFount';
import MainLayout from './layouts/MainLayout';
import BirthdayTracker from './components/birthdayTracker/BirthdayTracker';
import Calendar from './components/Calendar';
import Skills from './components/skills/Skills';
import './App.css';
import { useState } from 'react';
import arrData from './components/arrData';
import arraySkill from './components/skills/arrSkill';

function App() {
  const currentDate = new Date();
  
  const rawSkill = localStorage.getItem('arrSkill')
  const newArr = rawSkill?JSON.parse(rawSkill):arraySkill

  const [arrSkill, setArrSkill] = useState(moveTodayToBack(newArr));

  function moveTodayToBack(arr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Очищуємо час для порівняння дат

    // Перебираємо кожен елемент масиву
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];

      // Перевіряємо, чи є сьогоднішня дата в масиві arrDate
      const isTodayInArray = element.arrDate.some(date => {
        const dateInArray = new Date(date);
        dateInArray.setHours(0, 0, 0, 0); // Очищуємо час для порівняння дат
        return dateInArray.getTime() === today.getTime();
      });

      // Якщо сьогоднішня дата є, то переміщаємо елемент в кінець масиву
      if (isTodayInArray) {
       
        arr.splice(i, 1); // Видаляємо поточний елемент
        arr.push(element); // Додаємо його в кінець масиву
      }
    }

    return arr;
  }
  






  const rawBirthday = localStorage.getItem('arrBirthday')
  const parseBirthday = JSON.parse(rawBirthday)
  const [arrBirthday, setArrBirthday] = useState(rawBirthday?parseBirthday:arrData);
  localStorage.setItem('arrSkill', JSON.stringify(arrSkill));



  // Divide the birthdays into two arrays: past and future
  const pastBirthdays = [];
  const futureBirthdays = [];



  arrBirthday.forEach((item) => {
    if (new Date(item.date).getMonth() === currentDate.getMonth()) {
      if (new Date(item.date).getDate() < currentDate.getDate()) {
        pastBirthdays.push(item);
      } else {
        futureBirthdays.push(item);
      }
    } else if (new Date(item.date).getMonth()< currentDate.getMonth()) {
      pastBirthdays.push(item);
    } else {
      futureBirthdays.push(item);
    }
  }, []);

  // Sort both arrays by month and day
  pastBirthdays.sort((a, b) => {
    const monthDayA = (new Date(a.date).getMonth() + 1) * 100 + new Date(a.date).getDate();
    const monthDayB = (new Date(b.date).getMonth() + 1) * 100 + new Date(b.date).getDate();
    return monthDayA - monthDayB;
  });

  futureBirthdays.sort((a, b) => {
    const monthDayA = (new Date(a.date).getMonth() + 1) * 100 + new Date(a.date).getDate();
    const monthDayB = (new Date(b.date).getMonth() + 1) * 100 + new Date(b.date).getDate();
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
            element={<MainLayout sortedBirthdays={sortedBirthdays} arrSkill={arrSkill} setArrSkill={setArrSkill} moveTodayToBack={moveTodayToBack}/>}
          >
            <Route path='/' index element={<Calendar />} />
            <Route path='skills' element={<Skills arrSkill={arrSkill} setArrSkill={setArrSkill} moveTodayToBack={moveTodayToBack}/>} />
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
