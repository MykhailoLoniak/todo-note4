import React, { useState } from 'react';

function EditSkillForm({
  arrSkill,
  setArrSkill,
  editData,
  setEditData,
  isModalOpen,
  setIsModalOpen,
}) {
  const saveEditData = () => {
    // Знайдіть індекс елемента, який ви редагуєте
    const index = arrSkill.findIndex((e) => e.id === editData.id);
    if (index !== -1) {
      // Оновіть дані в arrSkill
      setArrSkill((prevArr) => {
        const newArr = [...prevArr];
        newArr[index] = { ...editData };
        localStorage.setItem('arrSkill', JSON.stringify(newArr));
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
            type='number'
            placeholder='Кількість днів'
            value={editData.numberOfDays} // Зміни тут
            onChange={(e) =>
                setEditData({ ...editData, numberOfDays: e.target.value })
            }
            />
            <input
            type='text'
            placeholder='Назва'
            value={editData.name} // Зміни тут
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            />

          <button onClick={saveEditData}>Зберегти</button>
        </div>
      )}
    </div>
  );
}

export default EditSkillForm;
