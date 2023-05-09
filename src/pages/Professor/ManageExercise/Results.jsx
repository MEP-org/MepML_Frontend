import { Table } from 'flowbite-react';

export default function Results({exercise, results}){

    return (
        <>
            <div className='mb-20'>
                <p className='font-semibold text-2xl mb-10'>Evaluation of class models</p>

                <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell>Nmec</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        {exercise.metrics.map((m) => {
                            return (
                                <Table.HeadCell key={m.id}>
                                    {m.title}
                                </Table.HeadCell>
                        )})}
                    </Table.Head>

                    <Table.Body className="divide-y">
                        {results.map((res) => {
                            return (

                                <Table.Row key={res.student.user.nmec} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{res.student.user.nmec}</Table.Cell>
                                    <Table.Cell>{res.student.user.name}</Table.Cell>

                                    {res.results.map((r, i) => {
                                        return (
                                            <Table.Cell key={i}>
                                                {r.score}
                                            </Table.Cell>
                                        )})}

                                </Table.Row>

                            )})}
                    </Table.Body>
                </Table>
            </div>
        </>
    )
}