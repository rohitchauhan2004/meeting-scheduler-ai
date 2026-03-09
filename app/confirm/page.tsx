export const dynamic = "force-dynamic";
"use client"

import { useSearchParams } from "next/navigation"

export default function ConfirmPage() {

  const params = useSearchParams()

  const date = params.get("date")
  const time = params.get("time")

  return (

    <main className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-xl shadow-lg text-center w-[420px]">

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          🎉 Booking confirmed
        </h1>

        <p className="text-gray-600 mb-6">
          Your meeting has been successfully scheduled.
        </p>

        {/* Meeting Summary Card */}

        <div className="bg-gray-50 border rounded-lg p-6 text-left space-y-3">

          <p className="font-semibold text-gray-800">
            Meet with Victoire Serruys
          </p>

          <p className="text-gray-700">
            📅 {date}
          </p>

          <p className="text-gray-700">
            ⏰ {time}
          </p>

          <p className="text-gray-700">
            📍 Google Meet
          </p>

        </div>

        {/* Optional button */}

        <button
          onClick={() => window.location.href = "/"}
          className="mt-6 bg-slate-700 text-white px-5 py-2 rounded hover:bg-slate-800"
        >
          Schedule another meeting
        </button>

      </div>

    </main>

  )
}