"use client"
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from "next/navigation"


const LoginPage = () => {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });

    const onChageHandler = (e: any) => setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    const onSubmitHandler = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/login", user);
            const data = await response.data
            toast.success(data.message);
            router.push("/")

        } catch (e: any) {
            // toast.error(e?.response.data.error)
        }
    }

    return (
        <>
            <section className='min-h-screen flex flex-col items-center justify-center'>
                <form onSubmit={onSubmitHandler} className='w-full mx-auto flex flex-col gap-5 md:w-1/2'>
                    <div className="mb-3">
                        <label htmlFor="">Email</label>
                        <input type="text" onChange={onChageHandler} name='email' value={user.email} className='w-full py-2 px-3 ring-2 ring-blue-800 border rounded' placeholder='Enter your Email' />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Password</label>
                        <input type="password" onChange={onChageHandler} name="password" value={user.password} className='w-full py-2 px-3 ring-2 ring-blue-800 border rounded' placeholder='Enter your Password' />

                    </div>
                    <div className="mb-3">
                        <button disabled={user.email.length == 0 || user.password.length == 0} className='w-full px-5 py-2 bg-blue-500 text-white rounded disabled:bg-gray-500'>Login</button>

                    </div>
                    <div className="mb3">
                        <p> Have Account ? <Link className='text-blue-500 font-bold' href={"/register"}>Sign Up</Link></p>
                    </div>
                </form>
            </section>

        </>
    )
}

export default LoginPage