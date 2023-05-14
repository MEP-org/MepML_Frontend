import { Spinner, useThemeMode, Table, Tooltip } from 'flowbite-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import {BiHelpCircle} from "react-icons/bi"
import 'react-circular-progressbar/dist/styles.css';

export default function Results(props) {
    
    const [mode,, toggleMode] = useThemeMode(); 
    const { exercise, my_results, results, loading } = props;
    let aux = 0;

    const renderLoading = () => {
        return (
            <div className='w-fit mx-auto'>
                <Spinner size='xl' />
            </div> 
        )
    }


    const renderResults = () => {

        const chartStyle = {
            path: {stroke: '#1C64F2'},
            text: {fill: '#ffffff', fontSize: '20px'},
            trail: {stroke: '#6B7280'}
        }

        if (mode === 'light') {
            chartStyle.path.stroke = '#1A56DB';
            chartStyle.text.fill = '#000000';
            chartStyle.trail.stroke = '#E5E7EB';
        }

        return (
            <>

                {/* Students results */}
                <div>
                    <p className='font-semibold text-2xl mb-10'>Evaluation of your model</p>

                    {my_results.length === 0 ?
                        <p className='text-center'>You have no results yet.</p>

                        :

                        <div className='flex flex-wrap'>
                            {my_results.map((res, index) =>
                                <div key={aux++} className='w-1/5 m-auto mb-10 px-10'>
                                    <CircularProgressbar value={(res.score * 100).toFixed(2)} text={`${(res.score * 100).toFixed(2)}%`} styles={chartStyle} />

                                    <div className="mt-2 flex justify-center items-center">
                                        <p className='mr-2'>{res.metric.title}</p>
                                        <Tooltip content={exercise.metrics[index].description} placement="bottom">
                                            <BiHelpCircle />
                                        </Tooltip>
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                </div>


                <hr className="h-px mt-14 mb-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>


                {/* Class results */}
                <div className='mb-20'>
                    <p className='font-semibold text-2xl mb-10'>Evaluation of class models</p>

                    <Table hoverable={true}>
                        <Table.Head>
                            <Table.HeadCell>Nmec</Table.HeadCell>
                            <Table.HeadCell>Name</Table.HeadCell>

                            {exercise.metrics.map((m) => 
                                <Table.HeadCell key={m.id}>
                                    {m.title}
                                </Table.HeadCell>
                            )}

                        </Table.Head>


                        <Table.Body className="divide-y">

                            {results.map((res) => {
                                let student = res.student;
                                let studentResults = res.results;

                                if (studentResults.length === 0) {
                                    return (
                                        <Table.Row key={student.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{student.user.nmec}</Table.Cell>
                                            <Table.Cell>{student.user.name}</Table.Cell>

                                            {exercise.metrics.map((m) =>
                                                <Table.Cell key={aux++}>-</Table.Cell>
                                            )}
                                        </Table.Row>
                                    )
                                }

                                return (
                                    <Table.Row key={student.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{student.user.nmec}</Table.Cell>
                                        <Table.Cell>{student.user.name}</Table.Cell>

                                        {studentResults.map((r) => 
                                            <Table.Cell key={aux++}>
                                                {r.score.toFixed(4)}
                                            </Table.Cell>
                                        )}

                                    </Table.Row>
                                )})}
                        </Table.Body>
                    </Table>
                </div>
            </>
        )
    }

    return (
        <>
            {loading ? renderLoading() : renderResults()}
        </>
    );

}
