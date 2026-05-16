import { SiteHeader } from "@/components/site-header"
import { QuickAccess } from "@/components/quick-access"
import { HeroNews } from "@/components/hero-news"
import { NewsGrid } from "@/components/news-grid"
import { SiteFooter } from "@/components/site-footer"
import { fetchNews } from "@/lib/news-service"

export default async function HomePage() {
  const articles = await fetchNews()
  const featured = articles[0]
  const rest = articles.slice(1, 10)

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <QuickAccess />
      {featured && <HeroNews article={featured} />}
      {rest.length > 0 && <NewsGrid articles={rest} />}
      <SiteFooter />
    </main>
  )
}
