export const dynamic = "force-dynamic"

import prisma from "@/lib/db"
import { sendEmail } from "@/lib/email"


// GET booked slots
export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)
  const date = searchParams.get("date")

  if (!date) return Response.json([])

  const bookings = await prisma.booking.findMany({
    where: { date },
    select: { time: true }
  })

  return Response.json(bookings)
}



// CREATE booking
export async function POST(req: Request) {

  const data = await req.json()

  const meetLink =
    `https://meet.google.com/${Math.random().toString(36).substring(2,10)}`

  const booking = await prisma.booking.create({
    data: {
      name: data.name,
      email: data.email,
      date: data.date,
      time: data.time,
      timezone: data.timezone,
      meetLink
    }
  })

  await sendEmail(data.email, meetLink, data.date, data.time)

  return Response.json(booking)

}