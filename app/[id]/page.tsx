'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'

export default function CopiedTextPage() {
  const { id } = useParams()
  const [data, setData] = useState<any[] | any>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchText = async () => {
      try {
        const res = await axios.post(
          'https://pastbin-backend-production.up.railway.app/textcopy/copiedtext',
          { sheardurl: id }
        )
        console.log(res.data.data.text)
        if (!res.data.success) {
          setError(res.data.message)
        }
        setData(res.data)
      } catch (err: any) {
        setError('Link expired or invalid')
      } finally {
        setLoading(false)
      }
    }
    fetchText()
  }, [id])

  if (loading) return <p className="min-h-screen text-white flex items-center justify-center">Loading...</p>
  if (error) return <p className="min-h-screen text-white flex items-center justify-center">{error}</p>
  return (
    <div className="min-h-screen text-white flex flex-col">
      {/* //   <p className="text-xl"></p> */}
      <div className="text-white relative flex h-screen w-full flex-col items-start justify-start overflow-hidden">
        <BackgroundRippleEffect />
        <div className="mt-60 w-full">
          <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold md:text-4xl lg:text-7xl">
            Instant Text Sharing. Zero Friction.
          </h2>
        </div>
      </div>
      <p className="relative z-10 mx-auto mt-1 max-w-xl text-center">{data.data.text}</p>
    </div>
  )
}
