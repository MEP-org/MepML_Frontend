import { API_URL } from "../../../api/env"
import { Button} from "flowbite-react"
import { FaEye, FaUser} from "react-icons/fa"
import {MdEmail} from "react-icons/md"
import { useNavigate } from "react-router-dom"

export default function Banner({classData}) {

    const navigate = useNavigate()

    return (
        <>

            <div className="mb-8">
                <div className="font-bold text-5xl">
                    View Class
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-10">
                
                <div className='drop-shadow-lg h-52 relative border-2 border-gray-200 dark:border-gray-800 rounded-lg'>
                    <img src={classData.image} alt="class img" className="h-full w-full object-cover rounded-lg"/>
                </div>



                <div className="lg:col-span-2 flex flex-col gap-4">

                    <div className='flex-1'>
                        <div className="h-full flex center">
                            <div>
                                <div className="flex center mb-4">
                                    <div className="font-bold text-center text-3xl mr-4">
                                        {classData.name}
                                    </div>
                                </div>

                            <div className="text-xl text-center">
                                <FaUser className='inline-block mr-2' size={18}  />
                                <span className="inline-block">Prof. {classData.created_by.user.name}</span>
                            </div>
                            <div className="text-xl text-center">
                                <MdEmail className='inline-block mr-2' size={18} />
                                <span className="inline-block ml-2">{classData.created_by.user.email}</span>
                            </div>
                            </div>
                        </div>
                    </div>

                    <Button className='mx-auto dark:bg-gray-800 shadow-md w-full md:w-1/2' color='light' onClick={() => navigate('/student/assignments')}>
                        <div className='w-40 text-center'>See exercises</div>
                        <FaEye />
                    </Button>
                    
                </div>              
            </div>
        </>
    )
}
