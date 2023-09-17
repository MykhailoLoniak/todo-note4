import React, { useState } from 'react';
import { MdOutlineDeleteForever, MdOutlineEdit } from 'react-icons/md';
import styles from '../../css/birthdayTracker/birthdayList.module.css';
import Modal from '../Modal';
import EditBirthdayForm from './EditBirthdayForm';

function BirthdayList(props) {
  const { arrBirthday, setArrBirthday, sortedBirthdays, setBirthdays } = props;
  const [editData, setEditData] = useState({
    date: new Date(),
    name: '',
    id: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  function yearsUser(user) {
    const diffInMilliseconds = new Date().getTime() - new Date(user.date).getTime();
    const years = Math.floor(diffInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));

if (years == 1) {
  return 'рік.';
} else if (years < 5) {
  return 'роки.';
} else {
  return 'років.';
}
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const updatedBirthdays = arrBirthday.filter((item) => item.id !== id);
    setArrBirthday(updatedBirthdays);
    localStorage.setItem('arrBirthday', JSON.stringify(updatedBirthdays))
  };

  const openEditModal = (e) => {
    console.log(e);
    setEditData({
      date: e.date,
      name: e.name,
      id: e.id,
    });
  };
  return (
    <ul>
      {sortedBirthdays.map((item) => (
        <li key={item.id}>
          <div
            className={styles.date}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {new Date(item.date).getDate()}.{new Date(item.date).getMonth() + 1}.
            {new Date(item.date).getFullYear()}
          </div>
          <div className={styles.text}>
            {item.name} {Math.floor(Math.floor(new Date().getTime() - new Date(item.date).getTime()) / (365.25 * 24 * 60 * 60 * 1000))} 
            <span>
              {` ${yearsUser(item)}`}
            </span>
          </div>
          <div className={styles.control}>
            <Modal
              form={
                <EditBirthdayForm
                  arrBirthday={arrBirthday}
                  setArrBirthday={setArrBirthday}
                  editData={editData}
                  setEditData={setEditData}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              }
              openModal={openModal}
              closeModal={closeModal}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            >
              <MdOutlineEdit onClick={() => openEditModal(item)} />
            </Modal>
            <MdOutlineDeleteForever onClick={() => handleDelete(item.id)} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default BirthdayList;
