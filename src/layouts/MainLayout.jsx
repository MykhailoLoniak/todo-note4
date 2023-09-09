import { Outlet } from 'react-router-dom';
import LeftMenu from '../components/menu/LeftMenu';
import RightMenu from '../components/menu/RightMenu';

function MainLayout({ sortedBirthdays }) {
  return (
    <>
      <LeftMenu />
      <Outlet className='content' />
      <RightMenu sortedBirthdays={sortedBirthdays} />
    </>
  );
}

export default MainLayout;
