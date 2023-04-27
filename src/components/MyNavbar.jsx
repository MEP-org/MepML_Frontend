import {useState, useEffect, useCallback} from 'react'
import {Link, useNavigate, Outlet, useLocation} from "react-router-dom";
import {Navbar, Dropdown, Avatar, DarkThemeToggle} from 'flowbite-react'
import {FaSignOutAlt} from 'react-icons/fa'
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";

import options from './particles.json'
import logo from '../assets/logo.svg'

export default function MyNavbar(props){

    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    const { type } = props
    const [active, setActive] = useState(undefined)
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.split('/')
        setActive(path[path.length - 1])
    }, [location])

    const session = type === 'student' ? {
        user : { name : 'Jack Connor', email: 'jackconnor@example.com' },
        type : 'student',
    } :
    {
        user : { name : 'Robert Smith' , email : 'robertsmith@example.com' },
        type : 'professor',
    }

    const handleLogout = () => {
        navigate('/');
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
