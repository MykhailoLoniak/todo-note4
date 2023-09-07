import { MdOutlineDeleteForever, MdOutlineEdit } from 'react-icons/md';
import styles from '../../css/birthdayTracker/birthdayList.module.css';

function BirthdayList(props) {
  const { arrBirthday, setArrBirthday } = props;
  const handleDelete = (i) => {
    const newArrBirthday = arrBirthday.filter((e) => i !== e.id);
    // const newArrBirthday = arrBirthday.slice(i, 1);
    setArrBirthday(newArrBirthday);
  };
  return (
    <>
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
              <div className={styles.date}>
                {new Date(item.date).getDate()}.
                {new Date(item.date).getMonth() + 1}.
                {new Date(item.date).getFullYear()}{' '}
              </div>{' '}
              <div className={styles.text}> {item.name}</div>
              <div className={styles.control}>
                <MdOutlineEdit />
                <MdOutlineDeleteForever onClick={() => handleDelete(item.id)} />
              </div>
              <div className='hr'></div>
            </li>
          ))}
      </ul>
    </>
  );
}

export default BirthdayList;
