import { Outlet } from 'react-router-dom';
import LeftMenu from '../components/menu/LeftMenu';
import RightMenu from '../components/menu/RightMenu';

function MainLayout({ sortedBirthdays,arrSkill,setArrSkill,moveTodayToBack }) {
  return (
    <>
      <LeftMenu />
      <Outlet className='content' />
      <RightMenu sortedBirthdays={sortedBirthdays} arrSkill={arrSkill} setArrSkill={setArrSkill} moveTodayToBack={moveTodayToBack} />
    </>
  );
}

export default MainLayout;
