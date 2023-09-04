import styles from '../css/birthdayTracker.module.css';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import arrData from './arrData';
import { MdOutlineDeleteForever, MdOutlineEdit } from 'react-icons/md';

function BirthdayTracker() {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
  });
  const [arrBirthday, setArrBirthday] = useState(arrData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.date && formData.name) {
      // Додаємо новий об'єкт до списку днів народження
      const newItem = {
        date: new Date(formData.date),
        name: formData.name,
        id: uuidv4(),
      };
      setArrBirthday([...arrBirthday, newItem]);

      // Очищаємо дані форми
      setFormData({ date: '', name: '' });
    } else {
      // Вивести повідомлення про помилку, якщо не всі поля заповнені
      alert('Будь ласка, заповніть обидва поля перед відправкою.');
    }
  };

  // Обробник події для полів введення для оновлення стану formData
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = (i) => {
    const newArrBirthday = arrBirthday.filter((e) => i !== e.id);
    // const newArrBirthday = arrBirthday.slice(i, 1);
    setArrBirthday(newArrBirthday);
  };
  return (
    <>
      <h3>Дні народження</h3>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <label htmlFor='date' className={styles.hide_label}>
            Введіть дату
          </label>
          <input
            className={styles.input}
            type='date'
            id='date'
            name='date'
            value={formData.date}
            onChange={handleInputChange}
          />
          <label htmlFor='name' className={styles.hide_label}>
            Введіть ім’я
          </label>
          <input
            className={styles.input}
            placeholder=''
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
          />
          <button className={styles.button} type='submit'>
            Додати
          </button>
        </form>
      </div>

      <div className={styles.birthday__List}>
        <ul>
          {[...arrBirthday]
            .sort((a, b) => {
              const monthA = a.date.getMonth();
              const monthB = b.date.getMonth();

              // Отримуємо числа для порівняння
              const dayA = a.date.getDate();
              const dayB = b.date.getDate();

              // Спочатку порівнюємо місяці, потім числа
              if (monthA !== monthB) {
                return monthA - monthB;
              }
              return dayA - dayB;
            })
            .map((item) => (
              <li key={item.id}>
                {new Date(item.date).getDate()}.
                {new Date(item.date).getMonth() + 1}.
                {new Date(item.date).getFullYear()} - {item.name}
                <div className={styles.control}>
                  <MdOutlineEdit />
                  <MdOutlineDeleteForever
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
                <div className={styles.hr}></div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default BirthdayTracker;
