import {useEffect, useState, useContext} from 'react';
import { MySession } from '../../../main.jsx';
import {useParams} from 'react-router-dom';
import FadeIn from 'react-fade-in';

import Banner from './Banner';
import StudentsTable from './StudentsTable';
import { StudentAPI } from '../../../api/StudentAPI';
import { Spinner } from "flowbite-react"

export default function Class() {
    const { session } = useContext(MySession);
    const studentId = session.user.id;

    const id = useParams().id || undefined
    const [loading, setLoading] = useState(false)
    const [classData, setClassData] = useState({
        "id": undefined,
        "name": '',
        "image": "https://flowbite.com/docs/images/carousel/carousel-1.svg",
        "created_by": { "user": { "name": '' } },
        "students": []
    })

    useEffect(() => {
        setLoading(true)

        StudentAPI.getClass(studentId, id)
            .then((data) => { setClassData(data) })
            .finally(() => { setLoading(false) })

    }, [id])


    const renderLoading = () => {
        return (
            <div className='w-fit mx-auto h-16'>
                <Spinner size='xl' />
            </div> 
        )
    }

    const renderContent = () => {
        return (
            <>
                <FadeIn>
                    <Banner classData={classData} loading={loading}/>
                    <StudentsTable classData={classData}/>
                </FadeIn>
            </>
        )
    }

    return (
        <>
            <div className="container my-10">
                
                {loading? renderLoading() : renderContent()}
            </div>
        </>
    )
}