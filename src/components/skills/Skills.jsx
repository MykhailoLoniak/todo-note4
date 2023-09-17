import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import arraySkill from './arrSkill';
import styles from '../../css/skills/skills.module.css';
import Skill from './skill';

function Skills({ arrSkill, setArrSkill, moveTodayToBack, }) {
  const [formData, setFormData] = useState({
    number: '', // Замість `date`, тут має бути `number`
    name: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.number && formData.name) {
      const newItem = {
        numberOfDays: formData.number,
        name: formData.name,
        id: uuidv4(),
        state: 0,
        dayMissed: 0,
        arrDate: [],
        listOfDaysPassed: [],
        listOfMissedDays: [],
      };
      const newArr = [newItem, ...arrSkill];
  
      // Сортування за потрібними критеріями
    
      setArrSkill(moveTodayToBack(newArr));
      localStorage.setItem('arrSkill', JSON.stringify(newArr));
  
      // Очищаємо дані форми
      setFormData({ number: '', name: '' });
    } else {
      // Вивести повідомлення про помилку, якщо не всі поля заповнені
      alert('Будь ласка, заповніть обидва поля перед відправкою.');
    }
    console.log(arrSkill);
  };
  

  // Обробник події для полів введення для оновлення стану formData
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Список привичок</h3>
      </div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGrup}>
            <input
              className={`${styles.input} ${styles.inputNamber}`}
              type='number' // Замість `numder`, тут має бути `number`
              id='number'
              name='number'
              value={formData.number} // Замість `arraySkill.numberOfDays`, тут має бути `formData.number`
              onChange={handleInputChange}
              required
            />
            <label htmlFor='number' className={styles.hide_label}>
              Введіть кількість днів
            </label>
          </div>
          <div className={styles.inputGrup}>
            <input
              className={`${styles.input} ${styles.inputName}`}
              placeholder=''
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <label htmlFor='name' className={styles.hide_label}>
              Введіть назву привички
            </label>
          </div>
          <button className={styles.button} type='submit'>
            Створити
          </button>
        </form>
      </div>
      <Skill arrSkill={arrSkill} setArrSkill={setArrSkill} moveTodayToBack={moveTodayToBack}/>
    </div>
  );
}

export default Skills;
