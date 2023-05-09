import { Table} from "flowbite-react"

export default function StudentsTable({classData}){

    return (
        <>
            {classData.students.length === 0 &&
                <div className="font-bold text-4xl text-center">
                    No students yet
                </div>
            }
            {classData.students.length > 0 &&
                <Table
                    striped={true}
                    hoverable={true}
                >
                    <Table.Head>
                        <Table.HeadCell className='w-36'>
                            N_mec
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Name
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Email
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {classData.students.map((student) => (
                            <Table.Row key={student.id}>
                                <Table.Cell>
                                    {student.user.nmec}
                                </Table.Cell>
                                <Table.Cell>
                                    {student.user.name}
                                </Table.Cell>
                                <Table.Cell>
                                    {student.user.email}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            }
        </>
    )
}