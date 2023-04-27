import { useEffect, useState } from "react"
import { ClassesAPI } from "../../../api/ClassesAPI";
import Classes from "./Classes";
import Dashboard from "./Dashboard";

// temporary data
import {student_stats} from '../../../api/data.json';


export default function Home(){

    const [loadingStats, setLoadingStats] = useState(false);
    const [loadingClasses, setLoadingClasses] = useState(false);
    const [classes, setClasses] = useState([]);
    const [stats, setStats] = useState(student_stats);

    useEffect(() => {
        setLoadingStats(true);
        setLoadingClasses(true);
        const studentID = 100001;
        ClassesAPI.getByStudent(studentID)
        .then((data) => {
            //TODO: get student stats
            setClasses(data);
        })
        .finally(() => {
            setLoadingClasses(false);
            setLoadingStats(false);
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
