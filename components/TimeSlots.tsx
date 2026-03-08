"use client"

import { generateSlots } from "@/lib/slots"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function TimeSlots() {

  const router = useRouter()
  const params = useSearchParams()

  const date = params.get("date")

  const [selected, setSelected] = useState<string | null>(null)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const slots = generateSlots()

  async function fetchBookedSlots() {

    if (!date) return

    try {

      setLoading(true)

      const res = await fetch(`/api/bookings?date=${encodeURIComponent(date)}`)

      if (!res.ok) {
        console.error("Failed to fetch booked slots")
        return
      }

      const data = await res.json()

      const times = data.map((b: any) => b.time)

      setBookedSlots(times)

    } catch (err) {

      console.error("Error fetching booked slots:", err)

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {

    fetchBookedSlots()

    // refresh slots every 5 seconds
    const interval = setInterval(fetchBookedSlots, 5000)

    return () => clearInterval(interval)

  }, [date])

  if (!date) {
    return (
      <p className="text-gray-500 text-center mt-4">
        Select a date first
      </p>
    )
  }

  const handleClick = (time: string) => {

    if (bookedSlots.includes(time)) return

    setSelected(time)

    router.push(`/book?date=${date}&time=${time}`)

  }

  return (

    <div className="space-y-3 h-[350px] overflow-y-auto">

      {loading && (
        <p className="text-gray-400 text-sm">
          Loading available slots...
        </p>
      )}

      {slots.map((slot) => {

        const active = selected === slot
        const booked = bookedSlots.includes(slot)

        return (

          <button
            key={slot}
            disabled={booked}
            onClick={() => handleClick(slot)}
            className={`w-full border border-gray-300 p-3 rounded-md transition-all duration-150
            ${booked
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100 hover:scale-[1.02]"
            }
            ${active ? "bg-slate-700 text-white" : ""}
            `}
          >
            {slot} {booked && "• Booked"}
          </button>

        )

      })}

    </div>

  )

}