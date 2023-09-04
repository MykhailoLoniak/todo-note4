import styles from '../css/birthdayTracker.module.css';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import arrData from './arrData';
import axios from 'axios';

function BirthdayTracker() {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
  });
  const [arrBirthday, setArrBirthday] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/birthdays');
        setArrBirthday(response.data);
      } catch (error) {
        console.error('Помилка при завантаженні днів народження:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.date && formData.name) {
      try {
        const response = await axios.post('/birthdays', formData);
        const newItem = response.data;
        setArrBirthday([...arrBirthday, newItem]);
        setFormData({ date: '', name: '' });
      } catch (error) {
        console.error('Помилка при додаванні дня народження:', error);
      }
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
    <>
      <h3>Дні народження</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='date'>Введіть дату</label>
        <input
          type='date'
          id='date'
          name='date'
          value={formData.date}
          onChange={handleInputChange}
        />
        <label htmlFor='name'>Введіть ім’я</label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleInputChange}
        />
        <button type='submit'>Відправити</button>
      </form>

      <div className={styles.birthday__List}>
        <ul>
          {arrBirthday
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((item) => (
              <li key={uuidv4()}>
                {new Date(item.date).getDate()}.
                {new Date(item.date).getMonth() + 1}.
                {new Date(item.date).getFullYear()} - {item.name}
                <div className={styles.hr}></div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default BirthdayTracker;
