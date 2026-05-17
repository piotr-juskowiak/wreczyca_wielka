import { SiteHeader } from "@/components/site-header"
import { HeroNews } from "@/components/hero-news"
import { NewsGrid } from "@/components/news-grid"
import { GalleryCarousel } from "@/components/gallery-carousel"
import { SiteFooter } from "@/components/site-footer"
import { fetchNews } from "@/lib/news-service"

export default async function HomePage() {
  const articles = await fetchNews()
  const featuredArticles = articles.slice(0, 9)

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      {featuredArticles.length > 0 && <HeroNews articles={featuredArticles} />}
      {articles.length > 0 && <NewsGrid articles={articles} />}
      <GalleryCarousel />
      <SiteFooter />
    </main>
  )
}


