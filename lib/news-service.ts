import { XMLParser } from "fast-xml-parser"

export type NewsArticle = {
  id: string
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  readTime: string
  author: string
  href: string
}

const FEED_URL = "https://www.wreczyca-wielka.pl/aktualnosci.xml"

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&oacute;/g, "ó")
    .replace(/&aacute;/g, "á")
    .replace(/&eacute;/g, "é")
    .replace(/&Oacute;/g, "Ó")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&bdquo;/g, "„")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&hellip;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function stripHtml(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim())
}

function extractFirstImage(html: string): string | null {
  const matches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)]
  for (const m of matches) {
    const src = m[1]
    if (!src) continue
    if (src.includes("def_zaj_thumb")) continue
    if (src.startsWith("//")) return "https:" + src
    if (src.startsWith("/")) return "https://www.wreczyca-wielka.pl" + src
    if (src.startsWith("http")) return src
  }
  return null
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  } catch {
    return iso
  }
}

function calcReadTime(text: string): string {
  const words = text.split(/\s+/).filter(Boolean).length
  const min = Math.max(1, Math.round(words / 200))
  return `${min} min`
}

function guessCategory(title: string, body: string): string {
  const t = (title + " " + body).toLowerCase()
  if (/(konkurs|wiem|umiem|szkoł|przedszko|nauk|edukacj)/.test(t)) return "Edukacja"
  if (/(obwieszczen|ogłoszen|nabór|nabor|konsultacj)/.test(t)) return "Ogłoszenia"
  if (/(budowa|inwestyc|modernizac|asfalt|drog)/.test(t)) return "Inwestycje"
  if (/(festyn|koncert|wydarzen|dzień|święto|jarmark|piknik)/.test(t)) return "Wydarzenia"
  if (/(rolnic|susz|przymroz|pszok|odpad|powietrz)/.test(t)) return "Środowisko"
  if (/(sport|bieg|turniej|rower|piłkarsk)/.test(t)) return "Sport"
  if (/(kultur|bibliotek|teatr|wystaw|warszt)/.test(t)) return "Kultura"
  if (/(zdrow|badan|profilaktyk|szczepien)/.test(t)) return "Zdrowie"
  return "Aktualności"
}

type AtomEntry = {
  title?: unknown
  link?: unknown
  summary?: unknown
  content?: unknown
  updated?: string
  id?: string
}

function getText(v: unknown): string {
  if (typeof v === "string") return v
  if (v && typeof v === "object") {
    const obj = v as Record<string, unknown>
    if ("#text" in obj) return String(obj["#text"] ?? "")
  }
  return ""
}

function getLink(entry: AtomEntry): string {
  const l = entry.link as unknown
  if (Array.isArray(l)) {
    const first = l[0] as Record<string, unknown> | undefined
    return String(first?.["@_href"] ?? "#")
  }
  if (l && typeof l === "object") {
    return String((l as Record<string, unknown>)["@_href"] ?? "#")
  }
  return "#"
}

export async function fetchNews(): Promise<NewsArticle[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 1800 },
      headers: { "User-Agent": "Mozilla/5.0 WreczycaPortal/1.0" },
    })
    if (!res.ok) throw new Error(`Feed ${res.status}`)
    const xml = await res.text()

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      cdataPropName: "#text",
      textNodeName: "#text",
    })
    const data = parser.parse(xml)
    const entries: AtomEntry[] = data?.feed?.entry ?? []

    return entries.map((entry, i): NewsArticle => {
      const title = stripHtml(getText(entry.title))
      const contentRaw = getText(entry.content) || getText(entry.summary)
      const excerpt = stripHtml(getText(entry.summary) || contentRaw).slice(0, 260)
      const image = extractFirstImage(contentRaw) ?? "/placeholder.svg?height=600&width=900"
      const updated = entry.updated ?? ""
      const href = getLink(entry)
      return {
        id: entry.id ?? `news-${i}`,
        title,
        excerpt,
        image,
        category: guessCategory(title, excerpt),
        date: formatDate(updated),
        readTime: calcReadTime(stripHtml(contentRaw)),
        author: "Urząd Gminy",
        href,
      }
    })
  } catch (err) {
    console.log("[v0] News fetch failed:", err)
    return []
  }
}
