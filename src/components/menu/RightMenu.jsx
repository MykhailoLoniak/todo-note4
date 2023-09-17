import styles from '../../css/menu/rightMenu.module.css';
import BirthdayRightMenu from '../birthdayTracker/BirthdayRightMenu';
import SkillRightMenu from '../skills/SkillRightMenu';

function RightMenu({ sortedBirthdays,arrSkill,setArrSkill,moveTodayToBack }) {
  return (
    <div className='right-menu'>
      <div className={styles.conteiner}>
        <SkillRightMenu arrSkill={arrSkill} setArrSkill={setArrSkill} moveTodayToBack={moveTodayToBack}/>
        <BirthdayRightMenu sortedBirthdays={sortedBirthdays} />
      </div>
    </div>
  );
}

export default RightMenu;
