import { fetchArticleBySlug } from "@/lib/news-service"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await fetchArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // Remove duplicate first image from content if it matches the article image
  const contentWithoutFirstImage = article.content.replace(/<img[^>]*src="([^"]*)"[^>]*>/i, (match, src) => {
    // If the image in content is the same as the hero image, remove it
    if (src.includes(article.image.split('?')[0]) || article.image.includes(src.split('?')[0])) {
      return ""
    }
    return match
  })

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-10 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Powrót do aktualności
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
              {article.category}
            </span>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-8 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-border/60">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold text-foreground">{article.author}</span>
                <span className="text-xs text-muted-foreground">Autor artykułu</span>
              </div>
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-white transition-all">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="relative aspect-video w-full overflow-hidden rounded-3xl mb-12 shadow-2xl">
          <img 
            src={article.image} 
            alt={article.title} 
            className="h-full w-full object-cover"
          />
        </div>

        <div className="prose prose-lg prose-slate max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: contentWithoutFirstImage }} 
            className="article-content leading-relaxed text-foreground/90 space-y-6"
          />
        </div>
        
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="bg-secondary/30 rounded-3xl p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Uważasz, że to ważne?</h3>
            <p className="text-muted-foreground mb-6">Podziel się tą informacją ze swoimi sąsiadami i znajomymi z gminy.</p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-lg hover:bg-primary/90 transition-all">
                Udostępnij na Facebooku
              </button>
            </div>
          </div>
        </footer>
      </article>

      <SiteFooter />
    </main>
  )
}
