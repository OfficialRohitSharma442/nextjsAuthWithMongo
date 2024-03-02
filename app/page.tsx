'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function Home() {
  const Router = useRouter();
  const onLogOutHandler = async () => {
    try {
      const response = await axios.get("/api/logout");
      const data = await response.data;
      toast.success(data.message);
      Router.push("./login")
    } catch (error) {

    }

  }
  return (
    <>
      <section className='min-h-screen flex flex-col items-center justify-center'>
        <h1>UserName : <span className="font-bold text-2xl">Rohit</span></h1>
        <h1>Email : <span className="font-bold text-2xl">Rohit</span></h1>
        <div>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded"
            onClick={onLogOutHandler}
          >Logout</button>
        </div>
      </section>
    </>
  );
}
