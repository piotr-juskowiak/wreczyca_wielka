import { fetchNews } from "@/lib/news-service"
import { NextResponse } from "next/server"

export const revalidate = 1800

export async function GET() {
  const articles = await fetchNews()
  return NextResponse.json({ articles })
}
