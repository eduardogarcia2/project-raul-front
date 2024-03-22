import { Outlet } from 'react-router-dom';
import SideMenu from './SideMenu';

const Layout = () => {
    return (
        <SideMenu>
            <Outlet />
        </SideMenu>
    );
};

export default Layout;
