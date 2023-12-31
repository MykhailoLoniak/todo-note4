import React, { useState } from 'react';
import arrData from '../arrData';

function EditBirthdayForm({
  arrBirthday,
  setArrBirthday,
  editData,
  setEditData,
  isModalOpen,
  setIsModalOpen,
}) {
  const saveEditData = () => {
    // Знайдіть індекс елемента, який ви редагуєте
    const index = arrBirthday.findIndex((e) => e.id === editData.id);
    if (index !== -1) {
      // Оновіть дані в arrBirthday
      setArrBirthday((prevArr) => {
        const newArr = [...prevArr];
        newArr[index] = { ...editData };
        localStorage.setItem('arrBirthday', JSON.stringify(newArr))
        return newArr;
      });
      // Закрийте модальне вікно та скиньте дані
      setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
    }
  };

  return (
    <div className='modul'>
      {editData.id !== null && (
        <div className='editModal'>
          <h3>Редагувати запис {editData.name}</h3>

          <input
            type='date'
            placeholder='Дата'
            value={`${new Date(editData.date).getFullYear()}-${(new Date (editData.date + 1).getMonth())
              .toString()
              .padStart(2, '0')}-${new Date(editData.date).getDate().toString().padStart(2, '0')}`}
            onChange={(e) =>
              setEditData({ ...editData, date: new Date(e.target.value) })
            }
          />
          <input
            type='text'
            placeholder='Ім’я'
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />

          <button onClick={saveEditData}>Зберегти</button>
        </div>
      )}
    </div>
  );
};

export default EditBirthdayForm;