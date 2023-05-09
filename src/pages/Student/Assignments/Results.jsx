import { Spinner } from 'flowbite-react';
import { FaFileAlt } from 'react-icons/fa';
import AssignmentCard from './AssignmentCard';

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
                <div className=' font-bold text-xl text-center'>
                    No results found
                </div>
            </>
        )
    }

    const assignmentFilter = (assignment) => {
        return (
            assignment.title.toLowerCase().includes(filter.title.toLowerCase()) &&
            (filter.deadline === 'all' || 
            (filter.deadline === 'closed' && assignment.deadline < new Date()) ||
            (filter.deadline === 'open' && assignment.deadline > new Date())
            ) &&
            (filter.filter === 'all' || 
            (filter.filter == assignment.students_class.id))
        )
    }   

    const sortAssignments = (a1, a2) => {
        if(filter.sort === 'recent'){
            return a1.publish_date < a2.publish_date;
        } else if(filter.sort === 'oldest'){
            return a1.publish_date > a2.publish_date;
        } else if(filter.sort === 'closestDeadline'){
            return a1.deadline < a2.deadline;
        } else if(filter.sort === 'farthestDeadline'){
            return a1.deadline > a2.deadline;
        }
    }

    const renderAssignments = () => {
        const filteredAssignments = assignments.filter(assignmentFilter).sort(sortAssignments);
        if(filteredAssignments.length === 0){
            return noResults();
        }

        return (
            <>
                <div className='grid lg:grid-cols-2 gap-4'>
                    {filteredAssignments.map((assignment) => {
                        return (
                            <AssignmentCard assignment={assignment} key={assignment.id} />
                        )
                    })}
                </div>
            </>
        )
    }

    return (
        <>
            <div >
                <div className='font-semibold text-3xl mb-10 flex items-center'>
                    <FaFileAlt className='inline-block mr-2' size={25} />
                    Assignments
                </div>
            </div>
            {loading ? renderLoading() : renderAssignments()}
        </>
    )
}
