import { Label, TextInput, Select } from 'flowbite-react';
import { FaSearch } from 'react-icons/fa'
import { useState } from 'react';

export default function Filters(props){

    const {filter, setFilter, classes} = props;

    const [debounce, setDebounce] = useState(null)

    const handleFilter = (e, key) => {
        clearTimeout(debounce)
        setDebounce(setTimeout(() => {
            setFilter({
                ...filter,
                [key]: e.target.value
            })
        }, 300))       
    }

    return (
        <>
            <div className='grid grid-cols-5 gap-6'>

                <div className='col-span-2 '>
                    <Label htmlFor="search" value="Tittle" />
                    <div className='mb-2' />
                    <TextInput
                        id="search"
                        type="text"
                        rightIcon={FaSearch}
                        placeholder="Search"
                        onChange={(e) => handleFilter(e, 'title')}
                    />
                </div>

                <div>
                    <Label htmlFor="filter" value="Filter by class" />
                    <div className='mb-2' />
                    <Select 
                        id="filter" 
                        onChange={(e) => handleFilter(e, 'filter')}
                    >
                        <option value="all">All</option>
                        {classes.map((classe) => {
                            return (
                                <option value={classe.id} key={classe.id}>{classe.name}</option>
                            )
                        })}
                    </Select>
                </div>

                <div>
                    <Label htmlFor="deadline" value="Deadline" />
                    <div className='mb-2' />
                    <Select 
                        id="deadline" 
                        onChange={(e) => handleFilter(e, 'deadline')}
                    >
                        <option value="all">All</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="sort" value="Sort by" />
                    <div className='mb-2' />
                    <Select 
                        id="sort" 
                        onChange={(e) => handleFilter(e, 'sort')}
                    >
                        <option value="recent">Recent</option>
                        <option value="oldest">Oldest</option>
                        <option value="closestDeadline">Closest Deadline</option>
                        <option value="farthestDeadline">Farthest Deadline</option>
                    </Select>
                </div>

            </div>
        </>
    )
}
