import styles from '../../css/menu/rightMenu.module.css';
import BirthdayRightMenu from '../birthdayTracker/BirthdayRightMenu';

function RightMenu({ sortedBirthdays }) {
  return (
    <div className='right-menu'>
      <div className={styles.conteiner}>
        <BirthdayRightMenu sortedBirthdays={sortedBirthdays} />
      </div>
    </div>
  );
}

export default RightMenu;
