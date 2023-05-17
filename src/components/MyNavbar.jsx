import {useState, useEffect, useCallback, useContext} from 'react'
import {Link, useNavigate, Outlet, useLocation} from "react-router-dom";
import {Navbar, Dropdown, Avatar, DarkThemeToggle} from 'flowbite-react'
import {FaSignOutAlt} from 'react-icons/fa'
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";

import options from './particles.json'
import logo from '../assets/logo.svg'
import { MySession } from '../main.jsx';

export default function MyNavbar(){

    const navigate = useNavigate();
    const location = useLocation();

    const [active, setActive] = useState(undefined)
    const { session, setSession } = useContext(MySession);

    useEffect(() => {
        let user_session = document.cookie.split('; ').find(row => row.startsWith('MEPMLsession=')) || null
        user_session = user_session ? JSON.parse(user_session.split('=')[1]) : null
        if(user_session !== null){
            document.cookie = `MEPMLsession=${JSON.stringify(user_session)};max-age=604800;path=/;samesite=strict`
        }

        const path = location.pathname.split('/')
        if(session.type !== path[1]){
            navigate("/auth/signin")
        }
        setActive(path[path.length - 1])
    }, [location])


    const handleLogout = () => {               
        setSession({
            user : { name : "null" , email : null, id : null },
            type : null,
            token : null
        })
        document.cookie = "MEPMLsession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;samesite=strict"
        navigate("/");
    }

    const nameInitials = () => {
        const name = session.user.name.split(" ")
        return name[0][0] + name[ name.length - 1 ][0]
    }

    const handleNav = (nav) => {
        setActive(nav)
        navigate(`/${session.type}/${nav}`)
    }

    const profLinks = () => {
        return (
            <>
                <Navbar.Link className='text-base cursor-pointer' 
                    active={active === 'classes'}
                    onClick={() => handleNav('classes')}
                >
                    Classes
                </Navbar.Link>
                <Navbar.Link className='text-base cursor-pointer' 
                    active={active === 'publicExercises'}
                    onClick={() => handleNav('publicExercises')}
                >
                    Public Exercises
                </Navbar.Link>
                <Navbar.Link className='text-base cursor-pointer' 
                    active={active === 'exercises'}
                    onClick={() => handleNav('exercises')}
                >
                    Exercises
                </Navbar.Link>
            </>
        )
    }

    const studentLinks = () => {
        return(
            <>
                <Navbar.Link className='text-base cursor-pointer'
                    active={active === 'home'}
                    onClick={() => handleNav('home')}
                >
                    Home
                </Navbar.Link>
                <Navbar.Link className='text-base cursor-pointer' 
                    active={active === 'publicExercises'}
                    onClick={() => handleNav('publicExercises')}
                >
                    Public Exercises
                </Navbar.Link>
                <Navbar.Link className='text-base cursor-pointer' 
                    active={active === 'assignments'}
                    onClick={() => handleNav('assignments')}
                >
                    Assignments
                </Navbar.Link>
            </>
        )
    }

    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    return (
        <>
            <div className='h-screen flex flex-col'>

                <Navbar fluid={true} className='drop-shadow-md z-50'>
                    <div>
                    <Navbar.Brand as={Link} to={`/${session.type}/`}>
                        <img
                            src= {logo}
                            className="mr-3 h-9 md:h-12 sm:h-9"
                            alt="MepML Logo"
                            />
                            <span className="self-center whitespace-nowrap text-3xl font-extrabold logo-font">
                                MepML
                            </span>
                    </Navbar.Brand>
                    </div>
                    <div className="flex md:order-2">
                        <div className='pl-10'/>
                        <DarkThemeToggle />
                        <div className="ml-4" />
                        <Dropdown
                        arrowIcon={false}
                        inline={true}
                        label={<Avatar
                            placeholderInitials = {nameInitials()}
                            rounded={true}
                            status="online"
                            statusPosition="bottom-right"
                            />}
                        >
                        <Dropdown.Header>
                            <span className="block text-sm">
                            {session.user.name}
                            </span>
                            <span className="block truncate text-sm font-medium">
                            {session.user.email}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item className="w-full" onClick={handleLogout}>
                            <FaSignOutAlt className="mr-2 mt-1" />
                            Sign out
                        </Dropdown.Item>
                        </Dropdown>
                        <Navbar.Toggle />
                    </div>
                    <Navbar.Collapse>
                        {session.type === 'professor' ? profLinks() : studentLinks()}
                    </Navbar.Collapse>
                </Navbar>
                
                <div className='flex-1 overflow-y-auto'>
                    <Outlet />
                </div>

                <Particles id="tsparticles" options={options} init={particlesInit} />
            </div>
        </>
    )
}
