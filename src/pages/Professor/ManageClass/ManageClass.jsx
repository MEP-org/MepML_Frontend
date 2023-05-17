import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MySession } from '../../../main.jsx';
import { Spinner } from "flowbite-react"
import FadeIn from 'react-fade-in';

import Banner from './Banner';
import StudentsTable from './StudentsTable';
import { ProfessorAPI } from '../../../api/ProfessorAPI';

export default function ManageClass(){
    const { session } = useContext(MySession);
    const profId = session.user.id;

    const id = useParams().id || undefined
    const [loading, setLoading] = useState(false)
    const [classData, setClassData] = useState({
        "id": undefined,
        "name": '',
        "image": 'https://flowbite.com/docs/images/carousel/carousel-1.svg',
        "students": []
    })

    useEffect(() => {
        if (id === undefined) return
        setLoading(true)
        ProfessorAPI.getClass(profId, id)
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
                <Banner classData={classData} loading={loading} setClassData={setClassData} profId={profId}/>
                <StudentsTable classData={classData} setClassData={setClassData}/>
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
