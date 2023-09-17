import {
  MdOutlineDeleteForever,
  MdOutlineEdit,
  MdCheck,
  MdClose,
} from "react-icons/md";
import {AiOutlineCloseCircle, AiOutlineCheckCircle} from "react-icons/ai";
import styles from "../../css/skills/skill.module.css";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import Modal from "../Modal";
import EditSkillForm from "./EditSkillForm";
import arrData from "../arrData";


function Skill({ arrSkill, setArrSkill, moveTodayToBack }) {
    const [renderProgres ,setRenderProgres] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState({
    name: '',
    numberOfDays: 0,
    state:  0,
    dayMissed: 0,
    id: null,
    arrDate: [],
    listOfDaysPassed:[],
    listOfMissedDays:[],
    });
    function decrements(e) {
      e.arrDate = [...e.arrDate, new Date()];
      e.listOfDaysPassed = [...e.listOfDaysPassed, new Date()];
      setArrSkill(moveTodayToBack([...arrSkill]))
      localStorage.setItem('arrSkill', JSON.stringify(arrSkill));
      setRenderProgres(e.dayMissed++)
    }
    function increments(e) {
      e.arrDate = [...e.arrDate, new Date()];
      e.listOfMissedDays = [...e.listOfMissedDays, new Date()];
      setArrSkill(moveTodayToBack([...arrSkill]))
      localStorage.setItem('arrSkill', JSON.stringify(arrSkill));
      setRenderProgres(e.state++)
    }

    function isLastDateToday(arrDate) {
      if (arrDate.length === 0) {
        return false; // Масив порожній, дата не може бути сьогодні
      }
      const lastDate = new Date(arrDate[arrDate.length - 1]);
      const today = new Date();
      return (
        lastDate.getFullYear() === today.getFullYear() &&
        lastDate.getMonth() === today.getMonth() &&
        lastDate.getDate() === today.getDate()
      );
    }
    const handleDelete = (id) => {
      const updatedSkills = arrSkill.filter((item) => item.id !== id);
      setArrSkill(updatedSkills);
      localStorage.setItem('arrSkill', JSON.stringify(updatedSkills))
    };
    const openEditModal = (e) => {
      setEditData({
        numberOfDays: e.numberOfDays,
        name: e.name,
        id: e.id,

        state:  e.state,
        dayMissed: e.dayMissed,
        arrDate: e.arrDate,
        listOfDaysPassed: e.listOfDaysPassed,
        listOfMissedDays:e.listOfMissedDays,
      });
    };
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
   return (
    <ul>
      {arrSkill.map((e)=>
        <li key={e.id}>
          <div className={styles.state}>
            {e.state + e.dayMissed} / {e.numberOfDays}
          </div>
          <div className={styles.text}>
            {e.name}
          </div>
            <div className={styles.progress}>
          <div className={styles.progress_inl}>
            <div className={styles.progress_container}>
              <div
                className={styles.incr}
                style={{ width: `${(e.state / e.numberOfDays) * 100}%` }}
              ></div>{" "}
              <div
                className={styles.regres}
                style={{
                  width: `${
                    (e.state / e.numberOfDays) * 100 +
                    (e.dayMissed / e.numberOfDays) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
          {!isLastDateToday(e.arrDate) ?  (
            <div className={styles.progressControl}>
              <AiOutlineCloseCircle className={styles.button} onClick={() => decrements(e)} />
              <AiOutlineCheckCircle className={styles.button} onClick={() => increments(e)} />
            </div>
          ) : ''}
            
            </div>
          <div>
          <Modal
              form={
                <EditSkillForm
                  arrSkill={arrSkill}
                  setArrSkill={setArrSkill}
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
              <MdOutlineEdit onClick={() => openEditModal(e)} />
            </Modal>
            <MdOutlineDeleteForever onClick={()=>handleDelete(e.id)}/>
          </div>
        </li>
      )}
    </ul>
   )
}

export default Skill;
