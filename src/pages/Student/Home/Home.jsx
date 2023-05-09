import { useEffect, useState } from "react"
import { StudentAPI } from '../../../api/StudentAPI';
import Classes from "./Classes";
import Dashboard from "./Dashboard";

export default function Home(){
    const studentID = 100001;
    const [loadingStats, setLoadingStats] = useState(false);
    const [loadingClasses, setLoadingClasses] = useState(false);
    const [classes, setClasses] = useState([]);
    const [stats, setStats] = useState({});

    useEffect(() => {
        setLoadingStats(true);
        setLoadingClasses(true);

        StudentAPI.getHome(studentID)
        .then((data) => {
            setStats(data);
        })
        .finally(() => {
            setLoadingStats(false);
        })

        StudentAPI.getClasses(studentID)
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
                <Dashboard stats={stats} loading={loadingStats}/>
                <Classes classes={classes} loading={loadingClasses} />
            </div>
        </>
    )
}
