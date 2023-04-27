import { useState } from "react"
import { Table, Label,TextInput, Button } from "flowbite-react"
import { FaUserEdit, FaTrash, FaPlusCircle } from "react-icons/fa"

export default function StudentsTable({classData, setClassData}){

    const [student, setStudent] = useState({nMec: '', name: ''})

    const handleAddStudent = (e) => {
        e.preventDefault();
        setClassData({
            ...classData,
            students: [...classData.students, student]
        })
        setStudent({nMec: '', name: ''})

    }

    const handleDeleteStudent = (nMec) => {
        setClassData({
            ...classData,
            students: classData.students.filter((student) => student.nMec !== nMec)
        })
    }

    const handleEditStudent = (nMec, name) => {
        // TODO
    }

    return (
        <>
            <form>
                <div className='grid grid-cols-7 gap-6 mb-8'>
                    <div className='col-span-2'>
                        <Label>Student N_mec</Label>
                        <div className='mb-2' />
                        <TextInput 
                            placeholder='N_mec' 
                            value={student.nMec}
                            onChange={(e) => setStudent({...student, nMec: e.target.value})}
                        />
                    </div>

                    <div className='col-span-4'>
                        <Label>Student Name</Label>
                        <div className='mb-2' />
                        <TextInput 
                            placeholder='Name'
                            value={student.name}
                            onChange={(e) => setStudent({...student, name: e.target.value})}
                        />
                    </div>

                    <div className='mt-8' >
                        <Button type="submit" onClick={handleAddStudent}>
                            <div className='w-32 text-center' id='manageStudent'>Add Students</div>
                            <FaPlusCircle />
                        </Button>
                    </div>
                </div>
            </form>

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
                        <Table.HeadCell className='w-20'/>
                        <Table.HeadCell className='w-20'/>
                    </Table.Head>
                    <Table.Body>
                        {classData.students.map((student) => (
                            <Table.Row key={student.nMec}>
                                <Table.Cell>
                                    {student.nMec}
                                </Table.Cell>
                                <Table.Cell>
                                    {student.name}
                                </Table.Cell>
                                <Table.Cell className='cursor-pointer hover:text-blue-500' onClick={() => handleEditStudent(student.nMec, student.name)}>
                                    <FaUserEdit className="mx-auto" />
                                </Table.Cell>
                                <Table.Cell className='cursor-pointer hover:text-red-500' onClick={() => handleDeleteStudent(student.nMec)}>
                                    <FaTrash className="mx-auto" />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            }
        </>
    )
}