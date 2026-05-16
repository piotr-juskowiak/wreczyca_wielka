import { XMLParser } from "fast-xml-parser"

const xml = `
<entry>
  <title>II edycja Dnia Zdrowia </title>
  <link rel="alternate" href="https://www.wreczyca-wielka.pl/aktualnosc-1310-ii_edycja_dnia_zdrowia.html"></link>
  <updated>2026-05-14T09:29:36Z</updated>
  <id>https://www.wreczyca-wielka.pl/aktualnosc-1310-ii_edycja_dnia_zdrowia.html</id>
  <summary type="text">II EDYCJA DNIA ZDROWIA WE WRĘCZYCY WIELKIEJ Wójt Gminy Wręczyca Wielka Anna Syguda zaprasza mieszkańców na II edycję Dnia Zdrowia.  Data: 26 maja 2026 roku Godzina: 10.00-15.00Miejsce: Plac przy Urzędzie Gminy Wręczyca Wielka</summary>
  <content type="text/html"><![CDATA[<img 0="alt" src="https://www.wreczyca-wielka.pl/uploads/pub/news/news_1310/zajawki/thumb_515d9d9f48f531a1adb117d847ab11d2a77713fe.jpg"><p><img src="/wreczyca_wielka_2024/web/uploads/pub/news/news_1310/text/dzień%20zdrowia.jpg" alt="Plakat z opisem wydarzenia " width="1414" height="2000" ></p>]]></content>
  <enclosure url="https://www.wreczyca-wielka.pl/uploads/pub/news/news_1310/zajawki/thumb_515d9d9f48f531a1adb117d847ab11d2a77713fe.jpg" length="48991" type="image/jpeg" />
</entry>
`

function getText(v: any): string {
  if (typeof v === "string") return v
  if (v && typeof v === "object") {
    console.log("getText received object:", JSON.stringify(v, null, 2))
    if ("#text" in v) return String(v["#text"] ?? "")
  }
  return ""
}

function extractFirstImage(html: string): string | null {
  const matches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)]
  console.log("Matches found:", matches.length)
  for (const m of matches) {
    const src = m[1]
    console.log("Found src:", src)
    if (!src) continue
    if (src.includes("def_zaj_thumb")) continue
    if (src.startsWith("//")) return "https:" + src
    if (src.startsWith("/")) return "https://www.wreczyca-wielka.pl" + src
    if (src.startsWith("http")) return src
  }
  return null
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  cdataPropName: "#text",
  textNodeName: "#text",
})

const data = parser.parse(xml)
const entry = data.entry
const contentRaw = getText(entry.content)
console.log("Content Raw length:", contentRaw.length)
console.log("Content Raw snippet:", contentRaw.slice(0, 100))
const img = extractFirstImage(contentRaw)
console.log("Extracted image:", img)

const enclosure = entry.enclosure
console.log("Enclosure:", enclosure)
