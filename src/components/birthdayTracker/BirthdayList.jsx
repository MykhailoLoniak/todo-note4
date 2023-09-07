import React from 'react';
import { MdOutlineDeleteForever, MdOutlineEdit } from 'react-icons/md';
import styles from '../../css/birthdayTracker/birthdayList.module.css';

function BirthdayList(props) {
  const { arrBirthday, setArrBirthday } = props;

  const handleDelete = (id) => {
    const newArrBirthday = arrBirthday.filter((item) => item.id !== id);
    setArrBirthday(newArrBirthday);
  };

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
  });

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
    <ul>
      {sortedBirthdays.map((item) => (
        <li key={item.id}>
          <div className={styles.date}>
            {item.date.getDate()}.{item.date.getMonth() + 1}.
            {item.date.getFullYear()}
          </div>
          <div className={styles.text}>{item.name}</div>
          <div className={styles.control}>
            <MdOutlineEdit />
            <MdOutlineDeleteForever onClick={() => handleDelete(item.id)} />
          </div>
          <div className='hr'></div>
        </li>
      ))}
    </ul>
  );
}

export default BirthdayList;
