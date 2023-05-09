import { useNavigate } from "react-router-dom";
import { FaUser, FaUserFriends } from "react-icons/fa";


export default function ClassCard(props){

    const class_ = props.class_;
    const navigate = useNavigate();

    const handleClassClick = (class_) => {
        navigate(`/student/classes/${class_.id}`);
    }


    return (

        <>
            <div 
                className=" cursor-pointer max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                onClick={() => handleClassClick(class_)}
            >
                <div className="relative h-36 w-full">
                    <img className="absolute inset-0 w-full h-full object-cover object-center rounded-t-lg" src={class_.image} alt="" />
                </div>


                <div className="p-5">
                    <p className="pb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {class_.name}
                    </p>

                    <div className="text-gray-700 dark:text-gray-400 font-light">
                        <FaUser className='inline-block mr-2' size={12}  />
                        <span className="inline-block text-sm">Prof. {class_.created_by.user.name}</span>
                    </div>

                    <div className="text-gray-700 dark:text-gray-400 font-light">
                        <FaUserFriends className='inline-block mr-2' size={15} />
                        <span className="inline-block text-sm">{class_.num_students} members</span>
                    </div>
                </div>
            </div>
        </>
    )
}
