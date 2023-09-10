import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import '../css/modal.css';

function Modal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  return (
    <div className='modalContainer'>
      <div onClick={openModal}>{props.children}</div>
      {isModalOpen && (
        <div className='modal-overlay' onClick={handleOverlayClick}>
          <div className='modal'>
            {props.form} {/* Вставляємо форму через props.form */}
            <AiOutlineCloseCircle
              onClick={closeModal}
              style={{ color: '#2060af', fontSize: '25px' }}
              />
            {/* <button onClick={closeModal}>Закрити</button> */}
          </div>
        </div>
      )}
    </div>
  );
}
  
  export default Modal;
