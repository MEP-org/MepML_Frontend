import { useEffect, useState, useContext } from "react"
import { MySession } from '../../../main.jsx';
import { StudentAPI } from '../../../api/StudentAPI';
import Classes from "./Classes";
import Dashboard from "./Dashboard";

export default function Home(){
    const { session } = useContext(MySession);
    let studentId = session.user.id;

    const [loadingStats, setLoadingStats] = useState(false);
    const [loadingClasses, setLoadingClasses] = useState(false);
    const [classes, setClasses] = useState([]);
    const [stats, setStats] = useState({});


    useEffect(() => {
        setLoadingStats(true);
        setLoadingClasses(true);

        StudentAPI.getHome(studentId)
        .then((data) => {
            setStats(data);
        })
        .finally(() => {
            setLoadingStats(false);
        })

        StudentAPI.getClasses(studentId)
        .then((data) => {
            setClasses(data);
        })
        .finally(() => {
            setLoadingClasses(false);
        })

    }, []);


    return (
        <>
            <div className='w-full container mt-8'>
                <Dashboard stats={stats} session={session} loading={loadingStats}/>
                <Classes classes={classes} loading={loadingClasses} />
            </div>
        </>
    )
}
