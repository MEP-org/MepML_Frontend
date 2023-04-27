import {Spinner, Card} from 'flowbite-react';
import StudentsTable from './StudentsTable.jsx';
import MembersQuantity from './MembersQuantity.jsx';
import AssignmentCard from './AssignmentCard.jsx';
import ExercisesLabel from './ExercisesLabel.jsx';
import TableModal from './TableModal.jsx';

import { useEffect, useState } from "react"
import { ClassesAPI } from "../../../api/ClassesAPI";
import {FaFileAlt} from 'react-icons/fa';



export default function ViewClass(){

    // const location = useLocation();
    // const {class : myClass} = location.state || {class : null};
    // console.log(myClass);


    const exercisesMock = [
        {
            "id": 1,
            "title": "Titanic - Machine Learning from Disaster",
            "description": "Subtitle orem ipsum dolor sit amet, consectetur adipiscing elit. Duis blandit",
            "published": "2023-04-01",
            "deadline": "2023-05-01",
            "studentClass": {
                "id": 1,
                "name": "ML-C1"
            }
        },
        {
            "id": 2,
            "title": "Predicting a Biological Response",
            "description": "Subtitle orem ipsum dolor sit amet",
            "published": "2024-04-01",
            "deadline": "2025-05-01",
            "studentClass": {
                "id": 3,
                "name": "ML-C1"
            }
        },
        {
            "id": 3,
            "title": "Titanic - Machine Learning from Disaster",
            "description": "Subtitle orem ipsum dolor sit amet, consectetur adipiscing elit. Duis blandit",
            "published": "2023-04-01",
            "deadline": "2023-05-01",
            "studentClass": {
                "id": 1,
                "name": "ML-C1"
            }
        },
        {
            "id": 4,
            "title": "Titanic - Machine Learning from Disaster",
            "description": "Subtitle orem ipsum dolor sit amet, consectetur adipiscing elit. Duis blandit",
            "published": "2023-04-01",
            "deadline": "2023-05-01",
            "studentClass": {
                "id": 4,
                "name": "ML-C1"
            }
        }

    ] 


    const [loading, setLoading] = useState(false);
    const [myClass, setClasses] = useState([]);


    useEffect(() => {
        setLoading(true);
        ClassesAPI.getByClassName('ML-C1')
        .then((data) => {
            setClasses(data[0]);
        })
        .finally(() => {
            setLoading(false);
        })
    }, []);


    const renderLoading = () => {
        return (
            <>
                <div className='w-fit mt-20 mx-auto '>
                    <Spinner size='xl' />
                </div> 
            </>
        )
    }

    const renderExercises = () => {
        if (!exercisesMock) {
            return null; // Return null if future exercises is still undefined
        }

        if (exercisesMock.length === 0) {
            return (
                <div className=' font-bold text-xl text-center'>
                    No results found
                </div>
            )
        }

        return (
                <>
                    {exercisesMock.map((item) => 
                        <AssignmentCard content={ item } />
                    )}
                </>  
        );
    }
    
    
    const renderStats = () => {
        if (!myClass.students) {
            return null; // Return null if myClass.students is undefined
        }
    
        return (
            <div className='w-full container mt-8'>
                {/* Title */}
                <div className='font-bold text-5xl mb-3'>
                    {myClass.name}
                </div>

                {/* Members Label */}
                <div className='h-12'></div>
                <MembersQuantity quantity={myClass.students.length} />
                
                {/* Members */}
                <div className='h-4'></div>
                <TableModal quantity={myClass.students.length} myClass={myClass.students}/>

                {/* Exercises Label */}
                <div className='h-12'></div>
                <ExercisesLabel />

                {/* Exercises */}
                <div className='h-4'></div>
                <div className='relative flex'>
                    <div className='grid lg:grid-cols-2 gap-4' style={{ overflowY: 'auto' }}>
                        {renderExercises()}
                    </div>
                </div>
                
            </div>
        )
    }

    
    return (
        <>
            {loading ? renderLoading() : renderStats()}
            
            {/* {JSON.stringify(myClass.students, null, 2)} */}
        </>
    )
}
