import { Outlet } from 'react-router-dom';
import LeftMenu from '../components/menu/LeftMenu';
import RightMenu from '../components/menu/RightMenu';

function MainLayout() {
  return (
    <>
      <LeftMenu />
      <Outlet className='content' />
      <RightMenu />
    </>
  );
}

export default MainLayout;
