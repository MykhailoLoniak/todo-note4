import { NavLink } from 'react-router-dom';
import styles from '../../css/leftMenu.module.css';

function LeftMenu() {
  return (
    <nav className='left-menu'>
      <span>
        <NavLink to='/' end>
          Calendar
        </NavLink>
      </span>
      <span>
        <NavLink to='skill'>Skill</NavLink>
      </span>
      <span>
        {' '}
        <NavLink to='birthdayTracker'>BirthdayTracker</NavLink>
      </span>
    </nav>
  );
}

export default LeftMenu;
