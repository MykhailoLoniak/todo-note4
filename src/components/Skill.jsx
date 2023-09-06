import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import arraySkill from './arrSkill';
import styles from '../css/skill.module.css';
import {
  MdOutlineDeleteForever,
  MdOutlineEdit,
  MdCheck,
  MdClose,
} from 'react-icons/md';
import { keyboardImplementationWrapper } from '@testing-library/user-event/dist/keyboard';

function Skill() {
  const [formSkill, setFormSkill] = useState({
    number: '',
    name: '',
  });
  const [skillProgres, setSkillProgres] = useState(0);
  const [arrSkill, setArrSkill] = useState(arraySkill);
  const [editData, setEditData] = useState({
    id: null,
    name: '',
    number: 0,
    state: 0,
    regres: 0,
    date: [new Date(2023, 8, 3)],
  });

  const checkTodo = () => {
    const newDate = new Date(); // Створюємо нову дату
    setEditData((prevData) => ({
      ...prevData,
      date: [...prevData.date, newDate], // Додаємо нову дату до масиву date
    }));
  };

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

  const openEditModal = (e) => {
    setEditData({
      id: e.id,
      name: e.name,
      number: e.number,
      state: e.state,
      regres: e.regres,
    });
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

  const handleDelete = (i) => {
    const newArrSkill = arrSkill.filter((e) => i !== e.id);
    setArrSkill(newArrSkill);
  };
  const handleSkillIncement = (e) => {
    arrSkill[e].state = arrSkill[e].state + 1;
    setSkillProgres(skillProgres + 1);
  };
  const handleSkillDecrement = (e) => {
    arrSkill[e].regres = arrSkill[e].regres + 1;
    setSkillProgres(skillProgres - 1);
  };
  function compareDates(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  const renderDays = () => {
    const arrDays = [];
    const today = new Date();
    let date;
    for (let i = 0; i < 7; i++) {
      date = new Date(today);
      arrDays.push(date);
      date.setDate(today.getDate() - i);
    }
    return arrDays;
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
            <label htmlFor='number' className={styles.hide_label}>
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
      <div className={styles.content}>
        <ul>
          {arrSkill.map((e, index) => (
            <div key={e.id}>
              <li>
                <div className={styles.liConteiner}>
                  {e.name}
                  {e.state}/{e.number}{' '}
                </div>
                <div className={styles.progress_inl}>{}</div>

                {/* <div className={styles.progress_inl}>
                  <div className={styles.progress_container}>
                    <div
                      className={styles.incr}
                      style={{ width: `${(e.state / e.number) * 100}%` }}
                    ></div>{' '}
                    <div
                      className={styles.regres}
                      style={{
                        width: `${
                          (e.state / e.number) * 100 +
                          (e.regres / e.number) * 100
                        }%`,
                      }}
                      ></div>
                      </div>
                    </div> */}
                <div className={styles.mainRow}>
                  <div className={styles.row}>
                    {renderDays()
                      .reverse()
                      .map((date, i) => {
                        const isDay = editData.date.some((dateInArray) =>
                          compareDates(dateInArray, date)
                        );
                        return (
                          <div key={i}>
                            <span className={styles.th1}>{date.getDate()}</span>
                            <span className={styles.th2}>
                              {isDay ? (
                                <MdCheck key={`check-${i}`} />
                              ) : (
                                <MdClose key={`close-${i}`} />
                              )}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (
                      arrSkill[index].state + arrSkill[index].regres <
                      arrSkill[index].number
                    ) {
                      handleSkillDecrement(index);
                    }
                  }}
                >
                  -
                </button>
                <button
                  onClick={() => {
                    if (
                      arrSkill[index].state + arrSkill[index].regres <
                      arrSkill[index].number
                    ) {
                      handleSkillIncement(index);
                    }
                  }}
                >
                  +
                </button>
                <div className={styles.control}>
                  <button onClick={() => checkTodo(index, e.id)}>sdfghj</button>
                  <MdOutlineEdit onClick={() => openEditModal(e)} />
                  <MdOutlineDeleteForever onClick={() => handleDelete(e.id)} />
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
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

export default Skill;
