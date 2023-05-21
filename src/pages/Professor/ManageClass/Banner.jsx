import { useState, useEffect } from "react"
import { API_URL } from "../../../api/env"
import { Button} from "flowbite-react"
import { FaPlusCircle, FaEye, FaEdit, FaTrash} from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { ProfessorAPI } from "../../../api/ProfessorAPI"

import ClassNameModal from "./ClassNameModal"

export default function Banner({profId, classData, setClassData, loading}) {

    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (classData.id === undefined) setShowModal(true)
    }, [classData.id])

    const handleSubmit = () => {

        if (classData.id !== undefined) {
            ProfessorAPI.updateClass(profId, classData.id, classData)
                .finally(() => navigate('/professor/classes'))
        }
        else {
            ProfessorAPI.createClass(profId, classData)
                .finally(() => navigate('/professor/classes'))
        }
    }

    const handleEditImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".png, .jpg, .jpeg";
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setClassData({...classData, image: reader.result, newImage: file})
            };
        }
        input.click();
    }

    const handleDelete = () => {
        ProfessorAPI.deleteClass(profId, classData.id)
            .finally(() => navigate('/professor/classes'))
    }

    const addNmecs = (n_mecs) => {
        n_mecs = n_mecs.filter((n_mec) => !isNaN(n_mec) && n_mec.length > 0)
        n_mecs = [...new Set(n_mecs)]

        ProfessorAPI.getStudentsByNmecs(n_mecs)
            .then((res) => {
                let newStudents = res
                newStudents = newStudents.filter((student) => !classData.students.some((s) => s.id === student.id))
                setClassData({
                    ...classData,
                    students: [...classData.students, ...newStudents]
                })
            }) 
    }

    const handleImportStudents = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".csv, .xls, .xlsx, .tab";
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                const data_ = reader.result.split('\n').map((line) => line.split(/[\t,]/))
                const n_mec_col = data_[0].indexOf("NMecAluno")
                const n_mecs = data_.map((line) => line[n_mec_col])
                addNmecs(n_mecs)       
            };
        }
        input.click();
    }

    return (
        <>
            <ClassNameModal 
                classData={classData} 
                setClassData={setClassData} 
                showModal={showModal} 
                setShowModal={setShowModal}
            />

            <div className="mb-16">
                <div className="mb-8">
                    <div className="font-bold text-5xl">
                        {classData.id !== undefined ?
                            'View/Edit Class' : 
                            'Create new Class'
                        }
                        {classData.id !== undefined &&
                            <div className="inline-block cursor-pointer text-red-700 hover:text-red-500 ml-2">
                                <FaTrash size={32} onClick={handleDelete}/>
                            </div>
                        }
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 mb-10">
                    
                    <div className='drop-shadow-lg h-52 relative border-2 border-gray-200 dark:border-gray-800 rounded-lg'>
                        <img src={classData.image} alt="class img" className="h-full w-full object-cover rounded-lg"/>
                        <div className="absolute top-0 right-0 p-4">
                            <Button className="dark:bg-gray-800 hover:!text-blue-500 dark:!border-gray-800" color='light' onClick={handleEditImage}>
                                <FaEdit size={20} />
                            </Button>
                        </div>
                    </div>


                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className='flex-1'>
                            <div className="h-full flex center">
                                <div>
                                    <div className="flex center mb-4">
                                        <div className="font-bold text-4xl mr-4">
                                            {classData.name}
                                        </div>
                                        <div className="cursor-pointer hover:text-blue-500">
                                            <FaEdit size={20} onClick={() => setShowModal(true)}/>
                                        </div>
                                    </div>
                                    
                                    <Button color="success" className="mx-auto" onClick={handleSubmit}>
                                        {classData.id !== undefined ? 'Save changes' : 'Create class'}
                                    </Button>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 gap-4">
                            <Button className='dark:bg-gray-800 shadow-md' color='light' onClick={() => navigate('/professor/exercises')}>
                                <div className='w-32 text-center'>See exercises</div>
                                <FaEye />
                            </Button>
                            <Button className='dark:bg-gray-800 shadow-md' color='light' onClick={() => navigate('/professor/exercises/add')}>
                                <div className='w-32 text-center'>Add exercise</div>
                                <FaPlusCircle />
                            </Button>
                            <Button className='dark:bg-gray-800 shadow-md' color='light' onClick={handleImportStudents}>
                                <div className='w-32 text-center'>Import Students</div>
                                <FaPlusCircle />
                            </Button>
                        </div>
                    </div>                
                </div>
            </div>
        </>
    )
}