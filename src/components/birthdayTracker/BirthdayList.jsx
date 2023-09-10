import React, { useState } from 'react';
import { MdOutlineDeleteForever, MdOutlineEdit } from 'react-icons/md';
import { BiLoaderCircle } from 'react-icons/bi';
import styles from '../../css/birthdayTracker/birthdayList.module.css';
import Modal from '../Modal';
import EditBirthdayForm from './EditBirthdayForm';

function BirthdayList(props) {
  const { arrBirthday, setArrBirthday, sortedBirthdays, setBirthdays } = props;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBirthday, setEditBirthday] = useState(null);

  const handleDelete = (id) => {
    const updatedBirthdays = arrBirthday.filter((item) => item.id !== id);
    setArrBirthday(updatedBirthdays);
  };

  const openEditModal = (birthday) => {
    setEditBirthday(birthday);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditBirthday(null);
  };

  const handleSaveEdit = (id, editedName) => {
    // Збереження змін у списку днів народження
    const updatedBirthdays = arrBirthday.map((item) =>
      item.id === id ? { ...item, name: editedName } : item
    );
    setArrBirthday(updatedBirthdays);
    closeEditModal();
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
            <Modal form={<EditBirthdayForm
          birthday={editBirthday}
          onSave={handleSaveEdit}
          onCancel={closeEditModal}
        />}>
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
