"use client"

import ReactCalendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function CalendarComponent() {

  const router = useRouter()
  const params = useSearchParams()

  const urlDate = params.get("date")

  const [date, setDate] = useState<Date | null>(null)

  // sync calendar with URL
  useEffect(() => {
    if (urlDate) {
      setDate(new Date(urlDate))
    }
  }, [urlDate])

  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const isPastDate = (date: Date) => {
    const today = new Date()
    today.setHours(0,0,0,0)
    return date < today
  }

  const handleDateChange = (value: any) => {

    const selectedDate = new Date(value)

    setDate(selectedDate)

    const formatted = selectedDate.toISOString().split("T")[0]

    router.push(`/?date=${formatted}`)
  }

  return (

    <div className="bg-white rounded-lg p-2 text-gray-800">

      <ReactCalendar
        value={date}
        onChange={handleDateChange}
        tileDisabled={({ date }) =>
          isWeekend(date) || isPastDate(date)
        }
      />

    </div>

  )
}