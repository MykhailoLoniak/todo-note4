import React, { useState } from 'react';
import arrData from '../arrData';


function EditBirthdayForm({arrBirthday, setArrBirthday,editData, setEditData }) {
 
  const saveEditData = () => {
    // Знайдіть індекс елемента, який ви редагуєте
    const index = arrData.findIndex((e) => e.id === editData.id);
    if (index !== -1) {
      // Оновіть дані в arrBirthday
      arrData[index] = { ...editData };
      // Закрийте модальне вікно
      setEditData({
        date: new Date(),
        name: '',
        id: null,
      });
    }
  console.log(arrData);
  }
  return (
    <div className='modul'>
        {editData.id && (
          <div className='editModal'>
            <div className='hr'></div>
            <h3>Редагувати запис {editData.name}</h3>
            <input
              type='text'
              placeholder='ID'
              value={editData.id}
              onChange={(e) =>
                setEditData({ ...editData, id: e.target.value })
              }
            />
            <input
            type='date'
            placeholder='Дата'
            value={editData.date.toISOString().split('T')[0]} // Використовуємо toISOString() для формату дати
            onChange={(e) => setEditData({ ...editData, date: new Date(e.target.value) })}
          />
            <input
              type='text'
              placeholder='Ім’я'
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
           
            <button onClick={saveEditData}>Зберегти</button>
          </div>
        )}
      
    </div>
    
  );
}

export default EditBirthdayForm;
