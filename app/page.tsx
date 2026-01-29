'use client'
import { useState } from "react";
import axios from 'axios'
import Link from "next/link";

export default function Home() {
  const [inputtext, setInputtext] = useState('')
  const [data, setData] = useState('')


  const url = 'https://pastbin-backend-production.up.railway.app/textcopy/text'

  const submitHandler = async (e: any) => {
    e.preventDefault()
    if (!inputtext) return
    console.log(inputtext, 'this is input text')
    try {
      const res = await axios.post(url, { text: inputtext }, { withCredentials: true })
      console.log(res.data, 'this is from front end')
      setData(res.data.url)
      console.log(data, 'this is data in state')
    } catch (err: any) {
      if (err.response) {
        // Backend responded with a status code outside 2xx
        console.error('Error response from backend:', err.response.data);
        console.error('Status code:', err.response.status);
        console.error('Headers:', err.response.headers);
      } else if (err.request) {
        // Request was made but no response received
        console.error('No response received:', err.request);
      } else {
        // Something else happened
        console.error('Axios error:', err.message);
      }
    }
  }


  return (
    <form onSubmit={(e) => submitHandler(e)} className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <input type="text" placeholder="your text here.. " className="border rounded-2xl px-5 h-10 w-40" onChange={(e) => setInputtext(e.target.value)} value={inputtext} />
      <button className="h-10 w-40 m-3 text-center border rounded-2xl">sheare</button>
      <Link
        href={`/${data}`}
        className="cursor-pointer text-blue-600 underline"
      >
        {data}
      </Link>

    </form>
  );
}
