import { useState, useEffect } from "react"
import { Button} from "flowbite-react"
import { FaPlusCircle, FaEye, FaEdit} from "react-icons/fa"
import { useNavigate } from "react-router-dom"

import ClassNameModal from "./ClassNameModal"

export default function Banner({classData, setClassData}) {

    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (classData.id === undefined) setShowModal(true)
    }, [classData.id])

    const handleSubmit = () => {
        navigate('/professor/classes')
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
                setClassData({...classData, img: reader.result})
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

            <div className="mb-8">
                <div className="font-bold text-5xl">
                    {classData.id ? 
                        'View/Edit Class' : 
                        'Create new Class'
                    }
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                
                <div className='drop-shadow-lg h-52 relative'>
                    <img src={classData.img} alt="class img" className="h-full w-full object-cover rounded-lg"/>
                    <div className="absolute top-0 right-0 p-4">
                        <Button className="dark:bg-gray-800 hover:!text-blue-500 dark:!border-gray-800" color='light' onClick={handleEditImage}>
                            <FaEdit size={20} />
                        </Button>
                    </div>
                </div>


                <div className="col-span-2 flex flex-col gap-4">
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
                                <Button className="mx-auto" onClick={handleSubmit}>
                                    {classData.id ?
                                        'Save changes' :
                                        'Create class'
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-10 gap-y-4">
                        <Button className='dark:bg-gray-800' color='light'>
                            <div className='w-40 text-center'>See exercises</div>
                            <FaEye />
                        </Button>
                        <Button className='dark:bg-gray-800' color='light'>
                            <div className='w-40 text-center'>Add exercise</div>
                            <FaPlusCircle />
                        </Button>
                        <Button className='dark:bg-gray-800' color='light'>
                            <div className='w-40 text-center'>Import Students</div>
                            <FaPlusCircle />
                        </Button>
                    </div>
                </div>                
            </div>
        </>
    )
}