import {Spinner} from 'flowbite-react';
import {FaUserFriends} from 'react-icons/fa'
import ClassCard from './ClassCard';
import FadeIn from 'react-fade-in';

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

        if (classes.length === 0) {
            return (
                <div className="text-xl text-center mt-16">
                    You do not belong to any class yet
                </div>
            )
        }

        return (
            <FadeIn className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {classes.map((c) => 
                    <ClassCard key={c.id} class_={c} />
                )}           
            </FadeIn>
        );
    }

    return (
        <>
            <div className='font-semibold text-3xl mt-12 mb-4 flex items-center'>
                <FaUserFriends className='inline-block mr-2' size={23} />
                Classes
            </div>

            {loading ? renderLoading() : renderClasses()} 
        </>
    )
}
