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
    <main className="min-h-screen bg-background relative overflow-x-clip">
      {/* Premium ambient background blobs */}
      <div className="absolute top-[-5%] left-[-10%] w-[50%] aspect-square rounded-full bg-[#00933f]/[0.04] blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[35%] right-[-10%] w-[45%] aspect-square rounded-full bg-[#208fcf]/[0.04] blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-5%] w-[40%] aspect-square rounded-full bg-[#d97706]/[0.03] blur-[120px] pointer-events-none z-0" />
      
      <div className="relative z-10">
        <SiteHeader />
        {featuredArticles.length > 0 && <HeroNews articles={featuredArticles} />}
        {articles.length > 0 && <NewsGrid articles={articles} />}
        <GalleryCarousel />
        <SiteFooter />
      </div>
    </main>
  )
}


