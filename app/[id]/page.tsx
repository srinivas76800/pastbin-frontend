'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'

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
        if(!res.data.success){
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

  if (loading) return <p className="min-h-screen flex items-center justify-center">Loading...</p>
  if (error) return <p className="min-h-screen flex items-center justify-center">{error}</p>

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl">{data.data.text}</p>
    </div>
  )
}
