import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import Banner from './Banner';
import StudentsTable from './StudentsTable';
import { StudentAPI } from '../../../api/StudentAPI';
import { Spinner } from "flowbite-react"

export default function Class() {
    const studentId = 1;

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
                <Banner classData={classData} loading={loading}/>
                <div className="mb-10"/>
                <StudentsTable classData={classData}/>
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