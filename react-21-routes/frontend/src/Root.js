import { Outlet } from 'react-router-dom';
import MainNavigation from './components/MainNavigation';

function RootLayout() {
  return (
    <>
       <MainNavigation/>
      <Outlet /> 
    </>
  )
}

export default RootLayout;
// outlet is where the children components (the ones root
  // has wrapped in app), will be rendered 