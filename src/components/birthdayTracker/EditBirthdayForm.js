import React, { useState } from 'react';

function EditBirthdayForm(props) {
  const { birthday, onSave, onCancel } = props;
  const [editedName, setEditedName] = useState(birthday ? birthday.name : ''); // Перевірка birthday на null
  const [editedDate, setEditedDate] = useState(birthday ? birthday.date : ''); // Перевірка birthday на null

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleDateChange = (e) => {
    setEditedDate(e.target.value);
  };

  const handleSave = () => {
    onSave(birthday.id, editedName, new Date(editedDate));
  };

  return (
    <div>
      <h2>Редагування імені та дати</h2>
      <label>
        Нове ім'я:
        <input
          type="text"
          value={editedName}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Нова дата:
        <input
          type="date"
          value={editedDate}
          onChange={handleDateChange}
        />
      </label>
      <button onClick={handleSave}>Зберегти</button>
      <button onClick={onCancel}>Скасувати</button>
    </div>
  );
}

export default EditBirthdayForm;
