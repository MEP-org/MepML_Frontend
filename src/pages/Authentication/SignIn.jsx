import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Label, TextInput, Checkbox, Button, DarkThemeToggle, Alert } from 'flowbite-react'
import { AuthAPI } from '../../api/AuthAPI.jsx';
import { MySession } from '../../main.jsx';
import FadeIn from 'react-fade-in';
import { HiInformationCircle } from 'react-icons/hi';

export default function SignIn(){

    const navigate = useNavigate();
    const { session, setSession } = useContext(MySession);
    const [ new_session, setNewSession ] = useState({
        user : {
            name : "",
            email : "",
            id : ""
        },
        type : "",
        token : ""
    })

    const [formData, setFormData] = useState({
        email : "",
        password : "",
        remember : true
    })

    const [error, setError] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()

        AuthAPI.login(formData)
        .then((data) => {
            if (data === undefined){
                setError("Invalid credentials")
            }
            else{
                setError("")
                const info = {
                    user : { 
                        name : data.name, 
                        email : data.email,
                        id : data.id
                    },
                    type : data.user_type,
                    token : data.token
                }
                setNewSession(info)
                setSession(info)
            }
        })
    }

    useEffect(() => {
        if (new_session.token === ""){
            return
        }
        if (formData.remember){
            document.cookie = `MEPMLsession=${JSON.stringify(new_session)};max-age=604800;path=/;samesite=strict`
        }
        navigate(`/${new_session.type}/`)
    }, [new_session])

    useEffect(() => {
        if (session.token !== null){
            navigate(`/${session.type}/`)
        }
    }, [])

    return (
        <>
            <div className='absolute top-0 left-0 flex center w-full h-screen'>
            <Card size='xl' className='md:w-1/2 lg:w-1/3 w-full'>
                <FadeIn>
                <div className="mb-4 flex">
                    <h1 className="text-3xl font-extrabold">Sign in</h1>
                    <div className="ml-auto">
                        <DarkThemeToggle />
                    </div>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                        placeholder='••••••••'
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

                {error && 
                    <Alert
                        color="failure"
                        className='my-2'
                        icon={HiInformationCircle}
                    >
                        <span>
                            <span className="font-medium mr-2">Error!</span>
                            {error}
                        </span>
                    </Alert>
                }
                
                <Button 
                    type="submit"
                    className='mb-2'
                >
                    Sign in
                </Button>
                </form>

                
                <span className="text-sm">
                    Don't have an account?
                    <Link to="/auth/signup" className="text-blue-500 hover:underline">
                        {" "}Sign up
                    </Link>
                </span>
                </FadeIn>
            </Card>
            </div>
        </>
    )
}