import { Card } from 'flowbite-react';
import { FaGlobeAmericas } from 'react-icons/fa';
import { Spinner } from 'flowbite-react';

export default function Description(props) {
    
    const { assignment, loading } = props;

    const renderLoading = () => {
        return (
            <Card className='mb-8'>
                <div className='w-fit mx-auto'>
                    <Spinner size='xl' />
                </div> 
            </Card>
        )
    }

    const renderBanner = () => {
        if (!assignment.studentClass) {
            return null;
        }

        return (
            <Card className='mb-8'>
                <div className='grid lg:grid-cols-12 gap-4'>

                    <div className='lg:col-span-9'>
                        <p className='font-semibold text-2xl mb-3'>
                            {assignment.title}
                        </p>

                        <p className='text-justify'>
                            {assignment.subtitle}
                        </p>
                    </div>

                    <div className='lg:col-span-3'>
                        <div className="lg:text-right lg:mb-3"> 
                            <span id="badge-dismiss-green" className="inline-flex items-center px-2 py-1 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">
                                <FaGlobeAmericas className='inline-block mr-2' size={12}  />
                                {assignment.visible ? 'Public' : 'Private'}
                            </span>
                        </div>

                        <div className='lg:text-right'>
                            <span className="inline-block text-xs font-light pr-1">Class:</span>
                            <span className="inline-block text-xs font-bold">
                            {assignment.studentClass.name}
                            </span>
                        </div>

                        <div className='lg:text-right'>
                            <span className="inline-block text-xs font-light pr-1">Published:</span>
                            <span className="inline-block text-xs font-bold">
                                {assignment.publishingDate}
                            </span>
                        </div>

                        <div className='lg:text-right'>
                            <span className="inline-block text-xs font-light pr-1">Deadline:</span>
                            <span className="inline-block text-xs font-bold">
                                {assignment.deliveryDeadline}
                            </span>
                        </div>

                        <div className='lg:text-right'>
                            <span className="inline-block text-xs font-light pr-1">Nº attempts:</span>
                            <span className="inline-block text-xs font-bold">
                                {assignment.attemptsLimit}
                            </span>
                        </div>

                        <div className='lg:text-right'>
                            <span className="inline-block text-xs font-light pr-1">Total submissions:</span>
                            <span className="inline-block text-xs font-bold">
                                {assignment.totalSubmissions}
                            </span>
                        </div>
                    </div>

                </div>
            </Card>
        )
    }


    return (
        <>
            {loading ? renderLoading() : renderBanner()}
        </>
    );

}
