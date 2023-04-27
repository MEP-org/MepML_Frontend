import {FaUserFriends} from 'react-icons/fa'
import {Spinner} from 'flowbite-react';
import ClassCard from './ClassCard';

export default function MyClasses(props){

    const {classes, loading} = props;

    const renderLoading = () => {
        return (
            <>
                <div className='w-fit mx-auto'>
                    <Spinner size='xl' />
                </div> 
            </>
        )
    }

    const renderClasses = () => {
        return (
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6' >
                {classes.map((item) => 
                    <ClassCard key={item.id} item={item} />
                )}
            </div>
        );
    }

    return (
        <>
            <div>
                <div className='font-semibold text-3xl mb-4 flex items-center'>
                    <FaUserFriends className='inline-block mr-2' size={23} />
                    My Classes
                </div>
            </div>
            {loading ? renderLoading() : renderClasses()}
        </>
    )
}
