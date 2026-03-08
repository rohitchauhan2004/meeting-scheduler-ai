"use client"

import { useState } from "react"
import CalendarComponent from "@/components/Calendar"
import TimeSlots from "@/components/TimeSlots"

export default function Home() {

  const [timezone,setTimezone] = useState("UTC+05:30 New Delhi")

  return (

    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">

      {/* STEP INDICATOR */}

      <div className="flex flex-col items-center mb-6">

        <div className="flex items-center space-x-6 text-sm">

          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-orange-500"></div>
            <span className="mt-1 text-gray-600">CHOOSE TIME</span>
          </div>

          <div className="w-16 h-[2px] bg-gray-300"></div>

          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
            <span className="mt-1 text-gray-400">YOUR INFO</span>
          </div>

        </div>

      </div>

      {/* LOGO */}

      <h1 className="text-2xl font-bold mb-6 text-blue-600">
        climatiq
      </h1>

      {/* MAIN CARD */}

      <div className="bg-white shadow-lg rounded-xl flex flex-col md:flex-row max-w-[900px] w-full overflow-hidden">

        {/* LEFT PANEL */}

        <div className="md:w-1/2 bg-slate-600 text-white p-8">

          <div className="flex flex-col items-center">

            <div className="w-16 h-16 bg-white text-slate-700 rounded-full flex items-center justify-center text-xl font-bold">
              V
            </div>

            <h2 className="mt-4 text-lg text-center">
              Meet with Victoire Serruys
            </h2>

            <p className="mt-2 text-sm opacity-80">
              Select a date
            </p>

          </div>

          <div className="mt-6">
            <CalendarComponent />
          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="md:w-1/2 p-6">

          {/* Meeting info */}

          <div className="mb-6">

            <p className="text-sm text-gray-500">
              Meeting location
            </p>

            <p className="font-semibold text-gray-800">
              Google Meet
            </p>

            <p className="text-sm text-gray-500 mt-4">
              Meeting duration
            </p>

            <div className="bg-gray-200 rounded-md px-3 py-2 text-sm font-medium text-gray-700 w-fit">
              30 mins
            </div>

          </div>

          {/* TIMEZONE SELECTOR */}

          <select
  value={timezone}
  onChange={(e)=>setTimezone(e.target.value)}
  className="border border-gray-300 p-2 rounded text-sm mb-4 w-full text-gray-800 bg-white"
>
  <option>UTC+05:00 Karachi</option>
  <option>UTC+05:30 New Delhi</option>
  <option>UTC+06:00 Dhaka</option>
  <option>UTC+06:30 Yangon</option>
  <option>UTC+07:00 Bangkok</option>
</select>

          {/* Time slot section */}

          <h3 className="font-semibold text-gray-700">
            What time works best?
          </h3>

          <p className="text-sm text-gray-500 mb-4">
            Showing times for {timezone}
          </p>

          <TimeSlots />

        </div>

      </div>

    </main>

  )
}