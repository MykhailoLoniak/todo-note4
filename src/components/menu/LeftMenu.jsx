import { NavLink } from 'react-router-dom';
import styles from '../../css/menu/leftMenu.module.css';
import { useState } from 'react';

function LeftMenu() {
  const [tach, setTach] = useState(true)
  return (
    <div className='left-menu'>
      <nav>
      <div
          className={`${styles.burgerButton} ${!tach ? styles.active : ''}`}
          onClick={() => setTach(!tach)}
        >
          {' '}
          <div
            className={ styles.burgerBar}
          ></div>
          <div
            className={styles.burgerBar}
          ></div>
          <div
            className={ styles.burgerBar}
          ></div>
      </div>
      <div className={tach? styles.container:styles.containerBurger}>
        <span>
          <NavLink to='/' end>
            Calendar
          </NavLink>
        </span>
        <span>
          <NavLink to='skills'>Skills</NavLink>
        </span>
        <span>
          {' '}
          <NavLink to='birthdayTracker'>BirthdayTracker</NavLink>
        </span>
      </div>
      </nav>
      {!tach && (
        <div className={styles.overlay} onClick={() => setTach(true)}></div>
      )}
    </div>
  );
}

export default LeftMenu;
