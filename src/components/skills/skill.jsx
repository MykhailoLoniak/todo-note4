import { useState } from "react";
import arraySkill from "../arrSkill";
import {
  MdOutlineDeleteForever,
  MdOutlineEdit,
  MdCheck,
  MdClose,
} from "react-icons/md";
import {
  BiLoaderCircle
} from "react-icons/bi";
import styles from "../../css/skills/skill.module.css";

function Skill(props) {
  const {
    editData,
    setEditData,
    arrSkill,
    setArrSkill,
    skillProgres,
    setSkillProgres,
  } = props;

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

  function compareDates(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }
  const handleSkillIncement = (e) => {
    arrSkill[e].state = arrSkill[e].state + 1;
    setSkillProgres(skillProgres + 1);
  };
  const handleSkillDecrement = (e) => {
    arrSkill[e].regres = arrSkill[e].regres + 1;
    setSkillProgres(skillProgres - 1);
  };
  const checkTodo = () => {
    const newDate = new Date(); // Створюємо нову дату
    setEditData((prevData) => ({
      ...prevData,
      date: [...prevData.date, newDate], // Додаємо нову дату до масиву date
    }));
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
  const handleDelete = (i) => {
    const newArrSkill = arrSkill.filter((e) => i !== e.id);
    setArrSkill(newArrSkill);
  };

  return (
    <>
      <div className={styles.content}>
      
        <ul>
          {arrSkill.map((e, index) => (
            <div key={e.id}>
              <li>
                <div className={styles.liConteiner}>
                  {e.name}
                  {e.state}/{e.number}{" "}
                </div>
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
                      {/* відображення прогресу  */}
                    <div className={styles.progress_inl}>
                      <div className={styles.progress_container}>
                        <div
                          className={styles.incr}
                          style={{ width: `${(e.state / e.number) * 100}%` }}
                        ></div>{" "}
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
                    </div>
                </div>
                {/*  кнопки додавання віднімання 
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
                </button> */}
                {/* кнопки видалити редагувати */}
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
    </>
  );
}

export default Skill;
