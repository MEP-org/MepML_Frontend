import { Outlet, Link } from "react-router-dom";
import logo from '../../assets/logo.svg'
import ParticlesBg from '../Home/ParticlesBg.jsx'

export default function AuthPage(){

    return (
        <>
            <ParticlesBg />

            <Link to="/" className="z-20">
                <div className='z-10 absolute top-2 left-2 p-2 flex center '>
                    <img
                        src= {logo}
                        className="mr-3 h-9 md:h-12 sm:h-9"
                        alt="MepML Logo"
                    />
                    <span className="self-center whitespace-nowrap text-3xl font-extrabold logo-font text-white">
                        MepML
                    </span>
                </div>
            </Link>

            <Outlet />
        </>
    )
}