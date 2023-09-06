import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import arraySkill from '../arrSkill';
import styles from '../../css/skills/skills.module.css';
import { keyboardImplementationWrapper } from '@testing-library/user-event/dist/keyboard';
import Skill from './skill';

function Skills() {
  const [editData, setEditData] = useState({
    id: null,
    name: '',
    number: 0,
    state: 0,
    regres: 0,
    date: [new Date(2023, 8, 3)],
  });
  const [arrSkill, setArrSkill] = useState(arraySkill);
  const [skillProgres, setSkillProgres] = useState(0);
  const [formSkill, setFormSkill] = useState({
    number: '',
    name: '',
  });
 
  const saveEditData = () => {
    // Знайдіть індекс елемента, який ви редагуєте
    const index = arrSkill.findIndex((e) => e.id === editData.id);
    if (index !== -1) {
      // Оновіть дані в arrSkill
      arrSkill[index] = { ...editData };
      // Закрийте модальне вікно
      setEditData({
        id: null,
        name: '',
        number: 0,
        state: 0,
        regres: 0,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formSkill.number && formSkill.name) {
      // Додаємо новий об'єкт до списку skill
      const newItem = {
        number: Number(formSkill.number),
        state: 0,
        regres: 0,
        name: formSkill.name,
        id: uuidv4(),
      };
      setArrSkill([...arrSkill, newItem]);
      // Очищаємо дані форми
      setFormSkill({ number: '', name: '' });
    } else {
      // Вивести повідомлення про помилку, якщо не всі поля заповнені
      alert('Будь ласка, заповніть обидва поля перед відправкою.');
    }
  };
  // Обробник події для полів введення для оновлення стану formSkill
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormSkill({ ...formSkill, [name]: value });
  };
  return (
    <div className={styles.MainContent}>
      <div className={styles.header}>
        <h3>Створити нову привичку</h3>
      </div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGrup}>
            <input
              className={styles.input}
              type='number'
              id='number'
              name='number'
              value={formSkill.number}
              onChange={handleInputChange}
              required
            />
            <label  htmlFor='number' className={styles.hide_label}>
              Кількісь днів
            </label>
          </div>
          <div className={styles.inputGrup}>
            <input
              className={styles.input}
              placeholder=''
              type='text'
              id='name'
              name='name'
              value={formSkill.name}
              onChange={handleInputChange}
              required
            />
            <label htmlFor='name' className={styles.hide_label}>
              назва
            </label>
          </div>
          <button className={styles.button} type='submit'>
            Додати
          </button>
        </form>
      </div>
      <br />
     <Skill editData={editData} setEditData={setEditData} arrSkill={arrSkill} setArrSkill={setArrSkill} skillProgres={skillProgres} setSkillProgres={setSkillProgres}/>
      <div className={styles.modul}>
        {editData.id && (
          <div className={styles.editModal}>
            <div className={styles.hr}></div>
            <h3>Редагувати запис {editData.name}</h3>
            <input
              type='text'
              placeholder='Назва'
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
            <input
              type='number'
              placeholder='Кількість днів'
              value={editData.number}
              onChange={(e) =>
                setEditData({ ...editData, number: e.target.value })
              }
            />
            <input
              type='number'
              placeholder='Кількість вдалих днів'
              value={editData.state}
              onChange={(e) =>
                setEditData({ ...editData, state: e.target.value })
              }
            />
            <input
              type='number'
              placeholder='Кількість провальних днів'
              value={editData.regres}
              onChange={(e) =>
                setEditData({ ...editData, regres: e.target.value })
              }
            />
            <button onClick={saveEditData}>Зберегти</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Skills;
