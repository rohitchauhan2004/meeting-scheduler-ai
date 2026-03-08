export function generateSlots() {
  const slots: string[] = []

  const start = 16 * 60 + 30
  const end = 18 * 60

  for (let i = start; i <= end; i += 15) {
    const h = Math.floor(i / 60)
    const m = i % 60

    const hh = h.toString().padStart(2, "0")
    const mm = m.toString().padStart(2, "0")

    slots.push(`${hh}:${mm}`)
  }

  return slots
}