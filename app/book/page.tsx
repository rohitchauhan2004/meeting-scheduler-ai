"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"

export default function BookingPage() {

  const params = useSearchParams()
  const router = useRouter()

  const date = params.get("date")
  const time = params.get("time")

  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email,setEmail] = useState("")

  const handleSubmit = async (e:any) => {

    e.preventDefault()

    await fetch("/api/bookings",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:firstName + " " + lastName,
        email,
        time,
        date,              // ✅ dynamic date
        timezone:"UTC+05:30"
      })
    })

    // pass values to confirmation page
    router.push(`/confirm?date=${date}&time=${time}`)
  }

  return (

<main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">

  {/* STEP INDICATOR */}

  <div className="flex items-center space-x-6 mb-6">

    <div className="flex flex-col items-center">
      <div className="w-6 h-6 rounded-full bg-orange-500"></div>
      <span className="text-sm font-medium text-gray-700">
        CHOOSE TIME
      </span>
    </div>

    <div className="w-16 h-[2px] bg-orange-500"></div>

    <div className="flex flex-col items-center">
      <div className="w-6 h-6 rounded-full bg-orange-500"></div>
      <span className="text-sm font-medium text-gray-700">
        YOUR INFO
      </span>
    </div>

  </div>

  <h1 className="text-2xl font-bold text-blue-600 mb-6">
    climatiq
  </h1>

  {/* FORM CARD */}

  <div className="bg-white shadow-lg rounded-xl p-8 w-[520px]">

    <h2 className="text-xl font-semibold text-gray-800 mb-3">
      Your information
    </h2>

    {/* show selected values */}
    <p className="text-gray-600 mb-6">
      {date} at {time}
    </p>

    <form onSubmit={handleSubmit} className="space-y-4">

      <div className="flex space-x-4">

        <input
          placeholder="First name"
          value={firstName}
          onChange={(e)=>setFirstName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full text-gray-800"
          required
        />

        <input
          placeholder="Last name"
          value={lastName}
          onChange={(e)=>setLastName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full text-gray-800"
          required
        />

      </div>

      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full text-gray-800"
        required
      />

      <div className="flex justify-between pt-4">

        <button
          type="button"
          onClick={()=>router.push("/")}
          className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
        >
          Back
        </button>

        <button
          type="submit"
          className="bg-slate-700 text-white px-5 py-2 rounded hover:bg-slate-800"
        >
          Confirm
        </button>

      </div>

    </form>

  </div>

</main>

  )
}