import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Label, TextInput, Select, Button, DarkThemeToggle } from 'flowbite-react'


export default function SignUp(){

    const [formData, setFormData] = useState({
        name : "",
        nMec: "",
        email : "",
        password : "",
        userType : "student"
    })

    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        setError("aa")
    }
    
    return (
        <>
            <div className='absolute top-0 left-0 flex center w-full h-screen'>
            <Card size='xl' className='w-1/3'>
                <div className="mb-4 flex">
                    <h1 className="text-3xl font-extrabold">Sign up</h1>
                    <div className="ml-auto">
                        <DarkThemeToggle />
                    </div>
                </div>
                <form className="flex flex-col gap-4">

                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="name"
                        value="Your name"
                    />
                    </div>
                    <TextInput
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        required={true}
                        onChange={(e) => setFormData({...formData, name : e.target.value})}
                    />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    {/* nmec  and select for type*/}
                    <div>
                        <div className="mb-2 block">
                        <Label
                            htmlFor="nMec"
                            value="Your nMec"
                        />
                        </div>
                        <TextInput
                            id="nMec"
                            type="text"
                            placeholder="123456"
                            required={true}
                            onChange={(e) => setFormData({...formData, nMec : e.target.value})}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                        <Label
                            htmlFor="userType"
                            value="Your user type"
                        />
                        </div>
                        <Select
                            id="userType"
                            required={true}
                            value={formData.userType}
                            onChange={(e) => setFormData({...formData, userType : e.target.value})}
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </Select>
                    </div>
                </div>

                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="email1"
                        value="Your email"
                    />
                    </div>
                    <TextInput
                        id="email1"
                        type="email"
                        placeholder="example@mail.com"
                        required={true}
                        onChange={(e) => setFormData({...formData, email : e.target.value})}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="password1"
                        value="Your password"
                    />
                    </div>
                    <TextInput
                        id="password1"
                        type="password"
                        placeholder='********'
                        required={true}
                        onChange={(e) => setFormData({...formData, password : e.target.value})}
                    />
                </div>
                <Button 
                    type="submit"
                    onClick={handleSubmit}
                    className='mt-2'
                >
                    Sign up
                </Button>
                </form>

                {error && <p className="text-red-500 text-center">{error}</p>}
                
                <span className="text-sm">
                    Already have an account?
                    <Link to="/auth/signin" className="text-blue-500 hover:underline">
                        {" "}Sign in
                    </Link>
                </span>

            </Card>
            </div>
        </>
    )
}