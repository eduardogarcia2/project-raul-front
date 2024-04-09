import { useEffect, useState } from "react"
import { useAuthStore } from "../store/authStore";
import { useLocation, useNavigate } from "react-router-dom";
import ColorPaletteMenu from "../components/ColorPaletteMenu"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Icon } from "@mui/material";
import useColorStore from "../store/colorStore";
import LogoutIcon from '@mui/icons-material/Logout';

function SideMenu({ children }: { children: any }) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isColorPaletteOpen, setColorPaletteOpen] = useState(false);
    const [color, setColor] = useState("white");
    const [showEditIcon, setShowEditIcon] = useState({}) as any;
    const [updateTrigger, setUpdateTrigger] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
    const toggleColorPalette = () => setColorPaletteOpen(!isColorPaletteOpen);

    const handleColorSelect = (color: any) => {
        const spaceId = location.pathname.split('/')[2];
        //@ts-ignore
        useColorStore.getState().setSpaceColor(spaceId, color);
        setUpdateTrigger(prev => !prev);
    };

    const logout = useAuthStore(state => state.logout);
    // const token = useAuthStore(state => state.token);
    const fetchSpaces = useAuthStore(state => state.fetchSpaces);
    const spaces = useAuthStore(state => state.spaces);

    const handleLogout = () => {
        logout();
    };

    useEffect(() => {
        fetchSpaces();
    }, [fetchSpaces]);

    const handleSpaceClick = (spaceId: any) => {
        navigate(`/spaces/${spaceId}/cards`);
    };

    useEffect(() => {
        const spaceId = location.pathname.split('/')[2];
        //@ts-ignore
        const spaceColor = useColorStore.getState().spaces[spaceId];
        setColor(spaceColor || 'white');
    }, [location.pathname, updateTrigger]);

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <a className="flex ms-2 md:me-24">
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Tableros</span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3 flex-col">
                                <div>
                                    <button type="button" onClick={toggleDropdown} className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        {/* <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" /> */}
                                        <Icon component={LogoutIcon} className="text-white"/>
                                    </button>
                                </div>
                                <div className={`z-50 ${isDropdownOpen ? 'flex absolute mt-10 mr-1' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`} id="dropdown-user">
                                    <ul className="py-1" role="none">
                                        <li>
                                            <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className="fixed top-0 left-0 p-3 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 h-auto max-h-[55vh]">
                    <ul className="space-y-2 font-medium">
                        {spaces.map((space: any) => (
                            <li key={space.id} onClick={() => handleSpaceClick(space.id)}>
                                <div
                                    className={`flex justify-between items-center p-2 text-white hover:bg-gray-700 rounded-lg ms-3 cursor-pointer ${location.pathname === `/spaces/${space.id}/cards` ? 'bg-gray-700' : ''}`}
                                    onMouseEnter={() => setShowEditIcon((prevState: any) => ({ ...prevState, [space.id]: true }))}
                                    onMouseLeave={() => setShowEditIcon((prevState: any) => ({ ...prevState, [space.id]: false }))}
                                >
                                    <p>{space.name}</p>
                                    {showEditIcon[space.id] && <Icon component={EditRoundedIcon} onClick={toggleColorPalette} />}
                                </div>
                            </li>
                        ))}
                    </ul>
                    {isColorPaletteOpen && <ColorPaletteMenu onColorSelect={handleColorSelect} onClose={toggleColorPalette} />}
                </div>
                <div className="flex justify-center mt-8">
                    <button className="text-white bg-blue-700 hover:bg-blue-500 p-2 rounded-md w-full" onClick={() => navigate("/add-spaces")}>Crear espacio</button>
                </div>
            </aside>

            <main className="mt-14 ml-64 h-screen pl-10 pt-5" style={{ background: color }}>
                {children}
            </main>
        </>
    )
}

export default SideMenu