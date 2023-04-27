import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import { Class } from '../../../model/Class';
import Banner from './Banner';
import StudentsTable from './StudentsTable';

export default function ManageClass(){

    const id = useParams().id || undefined
    const [loading, setLoading] = useState(false)
    const [classData, setClassData] = useState(Class)

    useEffect(() => {
        setLoading(true)
        setClassData({...Class, id: id})
        setLoading(false)
    }, [id])

    return (
        <>
            <div className="container my-10">
                
                <Banner classData={classData} setClassData={setClassData}/>
                <div className="mb-10"/>
                <StudentsTable classData={classData} setClassData={setClassData}/>
            </div>
        </>
    )
}
