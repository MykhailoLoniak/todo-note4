import { useEffect, useState } from 'react';
import styles from '../../css/birthdayTracker/birthdayRightMenu.module.css';
import arrData from '../arrData';

function BirthdayRightMenu({ sortedBirthdays }) {
  const [daysUntilBirthday, setDaysUntilBirthday] = useState([]);

  useEffect(() => {
    const newDate = new Date();
    const daysUntilBirthdays = sortedBirthdays.map((e) => {
      const birthdayDate = new Date(e.date);
      birthdayDate.setFullYear(newDate.getFullYear());

      if (birthdayDate < newDate) {
        birthdayDate.setFullYear(newDate.getFullYear() + 1);
      }

      const timeDiff = birthdayDate - newDate;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      return {
        name: e.name,
        daysUntilBirthday: daysDiff,
      };
    });

    setDaysUntilBirthday(daysUntilBirthdays);
  }, [sortedBirthdays]);

  return (
    <div className={styles.container}>
      <ul>
        {daysUntilBirthday.map((e, index) => (
          <li key={index}>
            {e.name} - {e.daysUntilBirthday} днів до дня народження
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BirthdayRightMenu;
