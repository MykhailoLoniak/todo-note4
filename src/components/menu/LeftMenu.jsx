import { NavLink } from 'react-router-dom';
import styles from '../../css/menu/leftMenu.module.css';

function LeftMenu() {
  return (
    <div className='left-menu'>
      <nav>
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
      </nav>
    </div>
  );
}

export default LeftMenu;
