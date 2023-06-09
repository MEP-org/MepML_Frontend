import { useState } from "react"
import { Table, Button } from "flowbite-react"
import { FaTrash, FaPlusCircle } from "react-icons/fa"
import CreatableSelect from 'react-select/creatable';
import { ProfessorAPI } from "../../../api/ProfessorAPI"


export default function StudentsTable({classData, setClassData}){

    const [students, setStudents] = useState([])

    const handleAddStudents = () => {
        const n_mecs = students.map((student) => student.value)

        ProfessorAPI.getStudentsByNmecs(n_mecs)
            .then((res) => {
                let newStudents = res
                newStudents = newStudents.filter((student) => !classData.students.some((s) => s.id === student.id))
                setClassData({
                    ...classData,
                    students: [...classData.students, ...newStudents]
                })
                setStudents([])
            }) 
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
                <div className='grid lg:grid-cols-6 gap-6 mb-8'>
                    <div className='lg:col-span-4'>
                        <CreatableSelect
                            isMulti
                            classNames={customClassNames}
                            className='z-20'
                            placeholder='Type n_mec and press enter to add student'
                            formatCreateLabel={(inputValue) => `Add student with n_mec: ${inputValue}`}
                            components={{DropdownIndicator: null}}
                            onChange={(value) => setStudents(value)}
                            value={students}
                            isValidNewOption={(inputValue) => inputValue.match(/^\d+$/)}
                            noOptionsMessage = {() => 'Start typing to add a student'}
                        />
                    </div>

                    <Button onClick={handleAddStudents} className="w-full">
                        <div className='w-32 text-center' id='manageStudent'>Add Students</div>
                        <FaPlusCircle />
                    </Button>

                    <Button onClick={() => setClassData({...classData, students: []})} className="w-full" color='failure'>
                        <div className='w-32 text-center' id='manageStudent'>Delete All</div>
                        <FaTrash />
                    </Button>
                </div>

            {classData.students.length === 0 &&
                <div className="text-2xl text-center">
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
                        <Table.HeadCell className='w-20' />
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