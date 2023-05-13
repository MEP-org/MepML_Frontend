import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Label, TextInput, Checkbox, Button, DarkThemeToggle } from 'flowbite-react'
import { MySession } from '../../main.jsx';

export default function SignIn(){

    const navigate = useNavigate();
    const { session, setSession } = useContext(MySession);

    const [formData, setFormData] = useState({
        email : "",
        password : "",
        remember : true
    })

    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const info = {
            user : { name : "Leonardo Almeida" , email : "email@email.com", id : 1 },
            type : formData.remember ? "student" : "professor",
            token : "token"
        }
        setSession(info)
        if (formData.remember) localStorage.setItem("session", JSON.stringify(info))

        navigate(`/${info.type}/`)
    }

    return (
        <>
            <div className='absolute top-0 left-0 flex center w-full h-screen'>
            <Card size='xl' className='w-1/3'>
                <div className="mb-4 flex">
                    <h1 className="text-3xl font-extrabold">Sign in</h1>
                    <div className="ml-auto">
                        <DarkThemeToggle />
                    </div>
                </div>
                <form className="flex flex-col gap-4">
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
                <div className="flex items-center gap-2">
                    <Checkbox 
                        id="remember"
                        checked={formData.remember}
                        onChange={(e) => setFormData({...formData, remember : e.target.checked})} 
                    />
                    <Label htmlFor="remember">
                        Remember me
                    </Label>
                </div>
                <Button 
                    type="submit"
                    onClick={handleSubmit}
                >
                    Sign in
                </Button>
                </form>

                {error && <p className="text-red-500 text-center">{error}</p>}
                
                <span className="text-sm">
                    Don't have an account?
                    <Link to="/auth/signup" className="text-blue-500 hover:underline">
                        {" "}Sign up
                    </Link>
                </span>

            </Card>
            </div>
        </>
    )
}