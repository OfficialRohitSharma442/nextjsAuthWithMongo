"use client"
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from "next/navigation"

const Register = () => {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    });

    const onChageHandler = (e: any) => setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    const onSubmitHandler = async (e: any) => {
        e.preventDefault();
        try {

            const response = await axios.post("/api/register", user);
            const data = await response.data
            toast.success(data.message);
            router.push("/login")

        } catch (e: any) {
            toast.error(e?.response.data.error)
        }
    }

    return (
        <>
            <section className='min-h-screen flex flex-col items-center justify-center'>
                <form onSubmit={onSubmitHandler} className='w-full mx-auto flex flex-col gap-5 md:w-1/2'>
                    <div className="mb-3">
                        <label htmlFor="">Username</label>
                        <input type="text" onChange={onChageHandler} name='username' value={user.username} className='w-full py-2 px-3 ring-2 ring-blue-800 border rounded' placeholder='Enter your UserName' />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Email</label>
                        <input type="text" onChange={onChageHandler} name='email' value={user.email} className='w-full py-2 px-3 ring-2 ring-blue-800 border rounded' placeholder='Enter your Email' />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Password</label>
                        <input type="password" onChange={onChageHandler} name="password" value={user.password} className='w-full py-2 px-3 ring-2 ring-blue-800 border rounded' placeholder='Enter your Password' />

                    </div>
                    <div className="mb-3">
                        <button disabled={user.email.length == 0 || user.password.length == 0 || user.username.length == 0} className='w-full px-5 py-2 bg-blue-500 text-white rounded disabled:bg-gray-500'>Register</button>

                    </div>
                    <div className="mb3">
                        <p>Already Have Account ? <Link className='text-blue-500 font-bold' href={"/login"}>Sign in</Link></p>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register