import { Label, TextInput, Select, Button } from 'flowbite-react';
import { FaSearch } from 'react-icons/fa'

export default function FIlters(props){

    const {filter, setFilter, profs} = props;
    let myFilter = filter;
    
    const handleFilter = (e, key) => {
        console.log(e.target.value);
        myFilter = {
            ...myFilter,
            [key]: e.target.value
        }
    }

    const handleSearch = (e) => {
        setFilter(myFilter);
    }

    return (
        <>
            <div className='grid grid-cols-7 gap-6'>

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
                    <Label htmlFor="minSize" value="Minsize" />
                    <div className='mb-2' />
                    <TextInput
                        id="minSize"
                        type="number"
                        placeholder="0"
                        onChange={(e) => handleFilter(e, 'minSize')}
                    />
                </div>

                <div>
                    <Label htmlFor="maxSize" value="Maxsize" />
                    <div className='mb-2' />
                    <TextInput
                        id="maxSize"
                        type="number"
                        placeholder="100000"
                        onChange={(e) => handleFilter(e, 'maxSize')}
                    />
                </div>

                <div>
                    <Label htmlFor="prof" value="Professor" />
                    <div className='mb-2' />
                    <Select
                        id="prof"
                        onChange={(e) => handleFilter(e, 'prof')}
                    >
                        <option value="all">All</option>
                        {profs.map((prof) => {
                            return (
                                <option value={prof.id} key={prof.id}>{prof.name}</option>
                            )
                        })}
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
                        <option value="abcUp">Alphabetic up</option>
                        <option value="abcDown">Alphabetic down</option>
                        <option value="sizeUp">Size up</option>
                        <option value="sizeDown">Size down</option>
                        <option value="nDownloadsUp">Downloads up</option>
                        <option value="nDownloadsDown">Downloads down</option>
                    </Select>
                </div>

                <div>
                    <div className='mb-8' />
                    <Button onClick={handleSearch} className='w-full'>
                        Search
                    </Button>
                </div>
            </div>
        </>
    )
}
