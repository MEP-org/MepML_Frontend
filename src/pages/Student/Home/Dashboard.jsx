import {Spinner, Card} from 'flowbite-react';
import {FaCheckCircle, FaFileAlt, FaHourglassHalf, FaGraduationCap} from 'react-icons/fa'
import FadeIn from 'react-fade-in';


export default function Dashboard(props){

    const {stats, session, loading} = props;

    const renderLoading = () => {
        return (
            <Card className='mt-4 mb-8'>
                <div className='w-fit mx-auto'>
                    <Spinner size='xl' />
                </div> 
            </Card>
        )
    }

    const renderStats = () => {

        return (
            <>
                <Card className='mt-5 mb-8'>
                    <FadeIn className="grid sm:grid-cols-2 lg:sm:grid-cols-3 gap-8">

                        <div>
                            <div className="h-9 student-stats-sections">
                                <FaCheckCircle className='inline-block mr-2' />
                                <span className="inline-block font-semibold">Submissions</span>
                            </div>
                            <div className="h-24 flex justify-center items-center">
                                <div className="items-end">
                                    <span className="font-semibold text-3xl mr-2">{stats.num_submissions? stats.num_submissions: 0}</span>
                                    <span className="font-light text-sm">Submissions</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="h-9 student-stats-sections">
                                <FaFileAlt className='inline-block mr-2' />
                                <span className="inline-block font-semibold">Exercises</span>
                            </div>
                            <div className="h-24 flex justify-center items-center">
                                <div className="items-end">
                                    <span className="font-semibold text-3xl mr-2">{stats.num_exercises? stats.num_exercises: 0}</span>
                                    <span className="font-light text-sm">Exercises</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="h-9 student-stats-sections">
                                <FaHourglassHalf className='inline-block mr-2' />
                                <span className="inline-block font-semibold">Next Exercise</span>
                            </div>
                            <div className="h-24 flex justify-center items-center">
                                <div className="items-end">
                                <p className="font-semibold text-2xl mr-2">{stats.next_deadline_title? stats.next_deadline_title : ""}</p>
                                <p className="font-light text-sm">{stats.next_deadline? stats.next_deadline: "No assignments" }</p>
                                </div>
                            </div>
                        </div>                    
                    </FadeIn>
                </Card>
            </>
        );
    }

    return (
        <>
            <p className="font-bold text-4xl">Welcome, {session.user.name}!</p>

            {loading ? renderLoading() : renderStats()}

        </>
    )
}
