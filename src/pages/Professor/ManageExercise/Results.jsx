import { Table } from 'flowbite-react';

export default function Results({exercise, results}){

    return (
        <>
            <div className='mb-20'>
                <p className='font-semibold text-2xl mb-5'>Evaluation of class models</p>

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
                                    <Table.Row key={student.user.nmec} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{student.user.nmec}</Table.Cell>
                                        <Table.Cell>{student.user.name}</Table.Cell>

                                        {exercise.metrics.map((r, i) => 
                                            <Table.Cell key={i}>-</Table.Cell>
                                        )}

                                    </Table.Row>
                                )
                            }

                            return (
                                <Table.Row key={student.user.nmec} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{student.user.nmec}</Table.Cell>
                                    <Table.Cell>{student.user.name}</Table.Cell>

                                    {studentResults.map((r, i) => 
                                        <Table.Cell key={i}>
                                            {r.score.toFixed(4)}
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>
        </>
    )
}