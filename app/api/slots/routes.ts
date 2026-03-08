import prisma from "@/lib/db"

export async function GET(req: Request) {

  try {

    const { searchParams } = new URL(req.url)
    const date = searchParams.get("date")

    if (!date) {
      return Response.json([])
    }

    const bookings = await prisma.booking.findMany({
      where: { date },
      select: { time: true }
    })

    return Response.json(bookings)

  } catch (error) {

    console.error("Slots API error:", error)

    return new Response(
      JSON.stringify({ error: "Failed to fetch slots" }),
      { status: 500 }
    )

  }

}