import styles from '../../css/birthdayTracker/birthdayTracker.module.css';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import arrData from '../arrData';
import BirthdayList from './BirthdayList';

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

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <h3>Дні народження</h3>
      </div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGrup}>
            <input
              className={styles.input}
              type='date'
              id='date'
              name='date'
              value={formData.date}
              onChange={handleInputChange}
              required
            />
            <label htmlFor='date' className={styles.hide_label}>
              Введіть дату
            </label>
          </div>
          <div className={styles.inputGrup}>
            <input
              className={styles.input}
              placeholder=''
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <label htmlFor='name' className={styles.hide_label}>
              Введіть ім’я
            </label>
          </div>
          <button className={styles.button} type='submit'>
            Додати
          </button>
        </form>
      </div>

      <div className={styles.birthday__List}>
        <BirthdayList
          arrBirthday={arrBirthday}
          setArrBirthday={setArrBirthday}
        />
      </div>
    </div>
  );
}

export default BirthdayTracker;
