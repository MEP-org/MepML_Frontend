import { TextInput, Select, Label, Checkbox, Textarea, Tooltip } from "flowbite-react"
import MarkdownEditor from "../../../components/MarkdownEditor"
import {BiHelpCircle} from "react-icons/bi"

export default function Description(props){

    const {handleChange, exercise, classes, setExercise} = props
    const value = exercise.description || "# Description"
    const setValue = (value) => {
        handleChange({target: {name: "description", value: value}})
    }

    const changeClass = (e) => {
        setExercise({
            ...exercise,
            students_class: {
                id: e.target.value,
                name: e.target.selectedOptions[0].text
            }
        })
    }

    return (
        <>
            <div className="grid grid-cols-3 gap-6">

                <div className="col-span-2">
                    <Label>Title</Label>
                    <TextInput
                        name="title"
                        value={exercise.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full mt-2"
                        helperText="(max 50 characters)"
                    />
                </div>

                <div>
                    <Label>Class</Label>
                    <Select
                        name="studentClass"
                        value={exercise.students_class.id || ""} 
                        onChange={changeClass}
                        className="w-full mt-2"
                        disabled={exercise.id !== undefined}
                    >
                        <option value="">Select a class</option>
                        {classes.map((item) => {
                            return (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </Select>
                    <div className="mt-2 flex gap-2 items-center">
                        <Checkbox 
                            id="visible" 
                            name="visible" 
                            value={exercise.visibility} 
                            onChange={handleChange} 
                        />
                        <Tooltip
                            content="If checked, the description and training dataset will publically available"
                            placement="bottom"
                        >
                            <BiHelpCircle />
                        </Tooltip>
                        <Label htmlFor="visible">Public</Label>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <Label>Sub Title</Label>
                <Textarea 
                    name="subtitle"
                    value={exercise.subtitle}
                    onChange={handleChange}
                    placeholder="Short description"
                    className="w-full mt-2"
                    helperText="(max 100 characters)"
                />
            </div>

            <div className="mt-4"/>
            <Label>Description (describe the problem and training dataset)</Label>
            <div className='h-[80vh] mt-2'>
                <MarkdownEditor type='Description' value={value} setValue={setValue} />
            </div>
        </>
    )
}