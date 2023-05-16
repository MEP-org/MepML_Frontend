import { Spinner } from 'flowbite-react';
import { FaFileAlt } from 'react-icons/fa';
import AssignmentCard from './AssignmentCard';
import FadeIn from 'react-fade-in';

export default function Results(props){

    const {assignments, loading, filter} = props;

    const renderLoading = () => {
        return (
            <div className='w-fit mx-auto '>
                <Spinner size='xl' />
            </div> 
        )
    }

    const noResults = () => {
        return (
            <>
                <div className='text-xl text-center mt-16'>
                    No results found
                </div>
            </>
        )
    }

    const assignmentFilter = (assignment) => {
        const exDate = new Date(assignment.deadline.split(' ')[0].split('/').reverse().join('-') + 'T' + assignment.deadline.split(' ')[1]);
        return (
            assignment.title.toLowerCase().includes(filter.title.toLowerCase()) &&
            (filter.deadline === 'all' || 
            (filter.deadline === 'closed' && exDate < new Date()) ||
            (filter.deadline === 'open' && exDate > new Date())
            ) &&
            (filter.filter === 'all' || 
            (filter.filter == assignment.students_class.id))
        )
    }   

    const sortAssignments = (a1, a2) => {
        const date1 = new Date(a1.publish_date.split(' ')[0].split('/').reverse().join('-') + 'T' + a1.publish_date.split(' ')[1]);
        const date2 = new Date(a2.publish_date.split(' ')[0].split('/').reverse().join('-') + 'T' + a2.publish_date.split(' ')[1]);
        if(filter.sort === 'recent'){
            return date1 < date2;
        } else if(filter.sort === 'oldest'){
            return date1 > date2;
        }
    }

    const renderAssignments = () => {
        const filteredAssignments = assignments.filter(assignmentFilter).sort(sortAssignments);
        if(filteredAssignments.length === 0){
            return noResults();
        }

        return (
            <>
                <FadeIn className='grid lg:grid-cols-2 gap-6'>
                    {filteredAssignments.map((assignment) => {
                        return (
                            <AssignmentCard assignment={assignment} key={assignment.id} />
                        )
                    })}
                </FadeIn>
            </>
        )
    }

    return (
        <>
            <div >
                <div className='font-semibold text-3xl mt-12 mb-5 flex items-center'>
                    <FaFileAlt className='inline-block mr-2' size={23} />
                    Assignments
                </div>
            </div>
            {loading ? renderLoading() : renderAssignments()}
        </>
    )
}
