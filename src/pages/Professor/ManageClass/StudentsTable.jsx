import { useState } from "react"
import { Table, Button } from "flowbite-react"
import { FaTrash, FaPlusCircle } from "react-icons/fa"
import CreatableSelect from 'react-select/creatable';


export default function StudentsTable({classData, setClassData}){

    const [students, setStudents] = useState([])
    const [newStudents, setNewStudents] = useState([])

    const handleAddStudents = () => {
        const n_mecs = students.map((student) => student.value)

        setNewStudents( n_mecs.map((n_mec) => {
            return {
                id: n_mec,
                user : {
                    nmec: n_mec,
                    name: 'name',
                    email: 'email'
                }
            }
        }))
        setNewStudents(newStudents.filter((student) => !classData.students.some((s) => s.id === student.id)))
        setClassData({
            ...classData,
            students: [...classData.students, ...newStudents]
        })
        setStudents([])
    }

    const handleDeleteStudent = (id) => {
        setClassData({
            ...classData,
            students: classData.students.filter((student) => student.id !== id)
        })
    }

    const customClassNames = {
        control: (state) => {
            return 'p-[2px] !bg-gray-50 dark:!bg-gray-700 dark:border-gray-600 !rounded-lg hover:!border-blue-500'
        },
        option: (state) => {
            return 'text-gray-900 dark:text-white' + (state.isFocused ? '!bg-blue-500 dark:!bg-blue-500' : '')
        },
        menu: (state) => {
            return 'bg-gray-50 dark:bg-gray-700 dark:text-white'
        },
        multiValue: (state) => {
            return '!bg-blue-500'
        },
        multiValueLabel: (state) => {
            return '!text-white'
        },
        multiValueRemove: (state) => {
            return '!text-white hover:!bg-red-500'
        },
        input: (state) => {
            // remove the default border
            return 'dark:!text-white'
        }

    };

    return (
        <>
                <div className='grid grid-cols-6 gap-6 mb-8'>
                    <div className='col-span-5'>
                        <CreatableSelect
                            defaultValue={[]}
                            options={[]}
                            isMulti
                            classNames={customClassNames}
                            className='z-20'
                            placeholder='Type n_mec and press enter to add student'
                            formatCreateLabel={(inputValue) => `Add student ${inputValue}`}
                            components={{DropdownIndicator: null}}
                            onChange={(value) => setStudents(value)}
                            value={students}
                            isValidNewOption={(inputValue) => inputValue.match(/^\d+$/)}
                        />
                    </div>

                    <Button type="submit" onClick={handleAddStudents} className="w-full">
                        <div className='w-32 text-center' id='manageStudent'>Add Students</div>
                        <FaPlusCircle />
                    </Button>
                </div>

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
                        <Table.HeadCell >
                            Email
                        </Table.HeadCell>
                        <Table.HeadCell className='w-20'/>
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
                                <Table.Cell className='cursor-pointer hover:text-red-500' onClick={() => handleDeleteStudent(student.id)}>
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