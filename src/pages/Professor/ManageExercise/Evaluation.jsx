import{ useState } from 'react'
import { Label, TextInput } from 'flowbite-react'
import Select from 'react-select';

import DatePicker from "tailwind-datepicker-react"
import MarkdownEditor from "../../../components/MarkdownEditor"

export default function Evaluation(props){

    const {exercise, handleChange, metrics} = props
    const [show, setShow] = useState(false)

	const handleChangeDate = (selectedDate) => {
        let date = selectedDate.getFullYear() + '-' + ('0' + (selectedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + selectedDate.getDate()).slice(-2)
		handleChange({target: {name: "deadline", value: date}})
	}

	const handleClose = (state) => {
		setShow(state)
	}

    const handleChangeMetrics = (selectedMetrics) => {
        handleChange({target: {name: "metrics", 
            value: metrics.filter((m) => selectedMetrics.map((s) => s.value).includes(m.id))
        }})
    }

    const value = exercise.evaluationRules || "# Evaluation rules"
    const setValue = (value) => {
        handleChange({target: {name: "evaluationRules", value: value}})
    }

    const metricsOptions= metrics.map((m) => { return {value: m.id, label: m.title}})

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
            <div className='lg:flex lg:gap-6'>

                <div className="relative lg:w-[296px] lg:mb-0 mb-16">
                    <Label>Deadline date</Label>
                    <div className='mt-2'/>
                    {(exercise.deadline !== undefined || exercise.id === undefined )&&
                        <DatePicker
                            onChange={handleChangeDate} 
                            show={show} 
                            setShow={handleClose} 
                            classNames="absolute"
                            options={{
                                autoHide: false,
                                theme:{
                                    selected: "hover:bg-blue-500 dark:hover:bg-blue-500",
                                },
                                defaultDate: exercise.deadline? new Date(exercise.deadline.split(' ')[0].split('/').reverse().join('-')) : new Date(),
                            }}
                        />
                    }
                    </div>

                <div>
                    <Label>Attempts limit</Label>
                    <div className='mt-2'/>
                    <TextInput 
                        name="limit_of_attempts" 
                        type="number"
                        min={1}
                        placeholder="Unlimited" 
                        onChange={handleChange} 
                        value={exercise.limit_of_attempts}
                    />
                </div>

                <div className="flex-1">
                    <Label>Metrics</Label>
                    <div className='mt-2'/>
                    <Select
                        closeMenuOnSelect={false}
                        value={exercise.metrics.map((m) => { return {value: m.id, label: m.title}})}
                        isMulti
                        options={metricsOptions}
                        classNames={customClassNames}
                        className='z-20'
                        isSearchable={true}
                        onChange={handleChangeMetrics}      
                    />
                </div>

            </div>

            <div className="mt-4"/>
            <Label>Evaluation rules</Label>
            <div className='h-[80vh] mt-2'>
                <MarkdownEditor type='Evaluation' value={value} setValue={setValue} />
            </div>
        </>
		
	)
}