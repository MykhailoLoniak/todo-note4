import React, { useState } from 'react';
import styles from '../css/calendar.module.css';
import arrData from './arrData';

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
const monthNames = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
];

function Calendar() {
  const currentDate = new Date();
  const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear());
  const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth());
  const [date, setDate] = useState(new Date());
  const currentDay = currentDate.getDate();
  const daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();

  // Визначення першого дня місяця
  const firstDayOfMonth = new Date(displayedYear, displayedMonth, 1).getDay();
  const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const renderDays = () => {
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === currentDay &&
        displayedMonth === currentDate.getMonth() &&
        displayedYear === currentDate.getFullYear();
      const isYesterday =
        day < currentDay &&
        displayedMonth === currentDate.getMonth() &&
        displayedYear === currentDate.getFullYear();
      const isNote = arrData.some(
        (item) =>
          item.date.getDate() === day && item.date.getMonth() === displayedMonth
      );

      days.push(
        <div
          key={day}
          className={`${
            isToday
              ? `${styles.day} ${styles.today}`
              : isYesterday
              ? `${styles.day} ${styles.yesterday}`
              : styles.day
          } ${isNote ? `${styles.day} ${styles.hasNote}` : styles.day}  `}
          onClick={() =>
            handleDayClick(new Date(displayedYear, displayedMonth, day))
          }
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const handleNextMonth = () => {
    // Increment the displayed month and update the year if necessary
    let newMonth = displayedMonth + 1;
    let newYear = displayedYear;
    if (newMonth > 11) {
      newMonth = 0; // January
      newYear++;
    }

    setDisplayedMonth(newMonth);
    setDisplayedYear(newYear);
  };

  const handlePreviousMonth = () => {
    // Decrement the displayed month and update the year if necessary
    let newMonth = displayedMonth - 1;
    let newYear = displayedYear;
    if (newMonth < 0) {
      newMonth = 11; // December
      newYear--;
    }

    setDisplayedMonth(newMonth);
    setDisplayedYear(newYear);
  };

  const handleDayClick = (clickedDay) => {
    setDate(clickedDay);
    console.log('Ви натиснули на дату:', clickedDay);
  };
  return (
    <div className={styles.calendar}>
      <div className={styles.containerMain}>
        <div className={styles.header}>
          <span className={styles.button} onClick={handlePreviousMonth}>
            back
          </span>
          Календар {monthNames[displayedMonth]} {displayedYear}
          <span className={styles.button} onClick={handleNextMonth}>
            next
          </span>
        </div>
        <div className={styles.days}>
          {daysOfWeek.map((day) => (
            <div key={day} className={styles.dayOfWeek}>
              {day}
            </div>
          ))}
          {Array.from({ length: startingDay }, (_, i) => (
            <div key={i} className={styles.emptyDay}></div>
          ))}
          {renderDays()}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
