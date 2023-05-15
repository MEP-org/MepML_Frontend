import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../api/env";
import { FaUser, FaUserFriends } from "react-icons/fa";


export default function ClassCard(props){

    const item = props.item;
    const navigate = useNavigate();

    const handleClassClick = (item) => {
        navigate('/professor/classes/' + item.id);
    }

    const checkImage = (image) => {
        if (image === null) {
            return 'https://flowbite.com/docs/images/carousel/carousel-1.svg';
        } else {
            return API_URL + image;
        }
    }

    return (
        <>
            <div
                className=" cursor-pointer max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                onClick={() => handleClassClick(item)}
            >
                <div className="relative h-36 w-full">
                    <img className="absolute inset-0 w-full h-full object-cover object-center rounded-t-lg" src={checkImage(item.image)} alt={item.name} />
                </div>


                <div className="p-5">
                    <p className="pb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.name}
                    </p>


                    <div className="text-gray-700 dark:text-gray-400 font-light">
                        <FaUserFriends className='inline-block mr-2' size={15} />
                        <span className="inline-block text-sm">{item.num_students} member(s)</span>
                    </div>
                </div>
            </div>
        </>
    )
}
