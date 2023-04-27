import{ useState } from 'react'
import { Label, TextInput, Dropdown, Checkbox } from 'flowbite-react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import DatePicker from "tailwind-datepicker-react"
import MarkdownEditor from "../../../components/MarkdownEditor"

export default function Evaluation(props){

    const {exercise, handleChange} = props
    const [show, setShow] = useState(false)
	const handleChangeDate = (selectedDate) => {
		console.log(selectedDate)
	}
	const handleClose = (state) => {
		setShow(state)
	}

    const value = exercise.evaluationRules || "# Evaluation rules"
    const setValue = (value) => {
        handleChange({target: {name: "evaluationRules", value: value}})
    }

    const animatedComponents = makeAnimated();
    const metricsTemp= [
        { value: 'accuracy', label: 'Accuracy' },
        { value: 'precision', label: 'Precision' },
        { value: 'recall', label: 'Recall' },
        { value: 'f1', label: 'F1' },
        { value: 'roc_auc', label: 'ROC AUC' },
    ]

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
            <div className='flex gap-6'>

                <div className="relative w-[296px]">
                    <Label>Deadline date</Label>
                    <div className='mt-2'/>
                    <DatePicker 
                        onChange={handleChangeDate} 
                        show={show} 
                        setShow={handleClose} 
                        classNames="absolute"
                        options={{
                            autoHide: false,
                            theme:{
                                selected: "hover:bg-blue-500 dark:hover:bg-blue-500",
                            }
                        }}
                    />
                </div>

                <div>
                    <Label>Attempts limit</Label>
                    <div className='mt-2'/>
                    <TextInput 
                        name="attemptsLimit" 
                        type="number" 
                        placeholder="Unlimited" 
                        onChange={props.handleChange} 
                        value={props.exercise.attemptsLimit} 
                    />
                </div>

                <div className="flex-1">
                    <Label>Metrics</Label>
                    <div className='mt-2'/>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={[]}
                        isMulti
                        options={metricsTemp}
                        classNames={customClassNames}
                        className='z-20'
                        isSearchable={true}                        
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