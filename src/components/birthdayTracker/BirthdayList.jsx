import React, { useEffect } from 'react';
import { MdOutlineDeleteForever, MdOutlineEdit } from 'react-icons/md';
import { BiLoaderCircle } from 'react-icons/bi';
import styles from '../../css/birthdayTracker/birthdayList.module.css';
import Modal from '../Modal';

function BirthdayList(props) {
  const { arrBirthday, sortedBirthdays, setBirthdays, setArrBirthday } = props;

  const handleDelete = (id) => {
    const updatedBirthdays = arrBirthday.filter((item) => item.id !== id);
    setArrBirthday(updatedBirthdays);
  };

  return (
    <ul>
      {sortedBirthdays.map((item) => (
        <li key={item.id}>
          <div
            className={styles.date}
            style={{
              inlineBlock: 'true',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {item.date.getDate()}.{item.date.getMonth() + 1}.
            {item.date.getFullYear()}
          </div>
          <div className={styles.text}>
            {item.name} {new Date().getFullYear() - item.date.getFullYear()}
          </div>
          <div className={styles.control}>
            <Modal>
              <MdOutlineEdit />
            </Modal>

            <MdOutlineDeleteForever onClick={() => handleDelete(item.id)} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default BirthdayList;
