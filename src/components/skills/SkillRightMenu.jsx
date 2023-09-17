import { useEffect, useState } from 'react';
import styles from '../../css/menu/skillMenu.module.css';
import {AiOutlineCloseCircle, AiOutlineCheckCircle} from "react-icons/ai";

function SkillRightMenu({ arrSkill ,setArrSkill,moveTodayToBack}) {
  const [renderProgres ,setRenderProgres] = useState()
  function isLastDateToday(arrDate) {
    if (arrDate.length === 0) {
      return false; // Масив порожній, дата не може бути сьогодні
    }
    const lastDate = new Date(arrDate[arrDate.length - 1]);
    const today = new Date();
    return (
      lastDate.getFullYear() === today.getFullYear() &&
      lastDate.getMonth() === today.getMonth() &&
      lastDate.getDate() === today.getDate()
    );
  }
  function decrements(e) {
    e.arrDate = [...e.arrDate, new Date()];
    e.listOfDaysPassed = [...e.listOfDaysPassed, new Date()];
    setArrSkill(moveTodayToBack([...arrSkill]))
    localStorage.setItem('arrSkill', JSON.stringify(arrSkill));
    setRenderProgres(e.dayMissed++)
  }
  function increments(e) {
    e.arrDate = [...e.arrDate, new Date()];
    e.listOfMissedDays = [...e.listOfMissedDays, new Date()];
    setArrSkill(moveTodayToBack([...arrSkill]))
    localStorage.setItem('arrSkill', JSON.stringify(arrSkill));
    setRenderProgres(e.state++)
  }
  return (
    <div className={styles.container}>
      <h5 className={styles.h5}>Список привичок</h5>
      <ul>
        {arrSkill.map((e, index) => (
          <li key={index} style={{ height:'25px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
            {e.name} 

            {!isLastDateToday(e.arrDate) ?  (
            <div className={styles.progressControl}>
              <AiOutlineCloseCircle className={styles.button} onClick={() => decrements(e)} />
              <AiOutlineCheckCircle className={styles.button} onClick={() => increments(e)} />
            </div>
          ) : (
            <div className={styles.progress_inl}>
            <div className={styles.progress_container}>
              <div
                className={styles.incr}
                style={{ width: `${(e.state / e.numberOfDays) * 100}%` }}
              ></div>{" "}
              <div
                className={styles.regres}
                style={{
                  width: `${
                    (e.state / e.numberOfDays) * 100 +
                    (e.dayMissed / e.numberOfDays) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
          )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkillRightMenu;
