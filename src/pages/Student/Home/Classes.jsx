import {Spinner} from 'flowbite-react';
import {FaUserFriends} from 'react-icons/fa'
import ClassCard from './ClassCard';

export default function Classes(props){

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
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                {classes.map((c) => 
                    <ClassCard key={c.id} class_={c} />
                )}
            </div>
        );
    }

    return (
        <>
            <div >
                <div className='font-semibold text-3xl mb-4 flex items-center'>
                    <FaUserFriends className='inline-block mr-2' size={23} />
                    Classes
                </div>
            </div>

            {loading ? renderLoading() : renderClasses()}
            
        </>
    )
}
