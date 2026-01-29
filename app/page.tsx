'use client'
import { useState } from "react";
import axios from 'axios'
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";
import { NoiseBackground } from "@/components/ui/noise-background";

export default function Home() {
  const [inputtext, setInputtext] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState('')


  const url = 'https://pastbin-backend-production.up.railway.app/textcopy/text'

  const submitHandler = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    if (!inputtext) return
    console.log(inputtext, 'this is input text')
    try {
      const res = await axios.post(url, { text: inputtext }, { withCredentials: true })
      console.log(res.data, 'this is from front end')
      setData(res.data.url)
      console.log(data, 'this is data in state')
    } catch (err: any) {
      if (err.response) {
        console.error('Error response from backend:', err.response.data);
        console.error('Status code:', err.response.status);
        console.error('Headers:', err.response.headers);
      } else if (err.request) {
        console.error('No response received:', err.request);
      } else {
        console.error('Axios error:', err.message);
      }
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="relative flex h-[40rem] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          Paste. Share. Expire <br />
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
          Secure Text Sharing with Time-Based Expiry. Copy text, generate a live link, and control views & expiry.
        </p>
        <form onSubmit={(e) => submitHandler(e)} className="flex  items-center mt-10 justify-center font-sans">
          <input type="text" placeholder="Enter your text here.. " className="bg-gray-300 border rounded-full mx-2 px-5 h-16 w-full" onChange={(e) => setInputtext(e.target.value)} value={inputtext} />
          <div className="flex justify-center">
            <NoiseBackground
              className="mx-10"
              containerClassName="w-fit p-1 rounded-full mx-auto"
              gradientColors={[
                "rgb(255, 100, 150)",
                "rgb(100, 150, 255)",
                "rgb(255, 200, 100)",
              ]}
            >
              <button className="m-3 text-center rounded-2xl font-bold text-2xl">{loading ? loading : ('share')}</button>
            </NoiseBackground>
          </div>
        </form>
        <div className="w-full text-center">

          <Link
            href={`/${data}`}
            className="cursor-pointer text-blue-600 underline"
          >
            {data ? (`https://pastbin-frontend.vercel.app/${data}`) : ('')}
          </Link>
        </div>
      </div>


    </div>
  );
}
