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

            <div className="grid grid-cols-3 gap-6">
                
                <div className='drop-shadow-lg h-52 relative'>
                    <img src={classData.image} alt="class img" className="h-full w-full object-cover rounded-lg"/>
                </div>


                <div className="col-span-2 flex flex-col gap-4">
                    <div className='flex-1'>
                        <div className="h-full flex center">
                            <div>
                                <div className="flex center mb-4">
                                    <div className="font-bold text-4xl mr-4">
                                        {classData.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-10 gap-y-4">
                        <Button className='dark:bg-gray-800' color='light' onClick={() => navigate('/student/assignments')}>
                            <div className='w-40 text-center'>See exercises</div>
                            <FaEye />
                        </Button>
                        <div className='flex center col-span-2'>
                            <div className="text-xl">
                                <FaUser className='inline-block mr-2' size={18}  />
                                <span className="inline-block">Prof. {classData.created_by.user.name}</span>
                                <MdEmail className='inline-block ml-4' size={18} />
                                <span className="inline-block ml-2">{classData.created_by.user.email}</span>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </>
    )
}
