"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, User, Calendar, AlertCircle } from "lucide-react"
import { toast } from "sonner"

interface CommentItem {
  id: string
  articleId: string
  author: string
  comment: string
  source: string
  time: string
  avatarBg: string
  initials: string
  timestamp: number
}

// Helper to generate a random botanical color theme for custom avatars
const AVATAR_PALETTES = [
  "bg-[#588157]/20 text-[#344e41]",
  "bg-[#a3b18a]/20 text-[#3a5a40]",
  "bg-[#dad7cd]/45 text-[#3a5a40]",
  "bg-[#3a5a40]/15 text-[#3a5a40]",
  "bg-[#344e41]/10 text-[#344e41]"
]

export function ArticleComments({ articleId, articleTitle }: { articleId: string; articleTitle: string }) {
  const [comments, setComments] = useState<CommentItem[]>([])
  const [author, setAuthor] = useState("")
  const [text, setText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 1. Load comments from localStorage (filtering for this specific article)
  const loadComments = () => {
    try {
      const stored = localStorage.getItem("wreczyca_comments")
      if (stored) {
        const parsed = JSON.parse(stored) as CommentItem[]
        // Filter only comments belonging to this article and sort chronologically (newest at bottom of the article feed)
        const filtered = parsed
          .filter((c) => c.articleId === articleId)
          .sort((a, b) => a.timestamp - b.timestamp)
        setComments(filtered)
      } else {
        setComments([])
      }
    } catch (e) {
      console.error("Failed to load comments:", e)
    }
  }

  useEffect(() => {
    loadComments()
    
    // Listen for updates from other parts of the app
    window.addEventListener("commentsUpdated", loadComments)
    return () => window.removeEventListener("commentsUpdated", loadComments)
  }, [articleId])

  // 2. Handle comment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!author.trim()) {
      toast.error("Podaj swoje imię lub pseudonim")
      return
    }
    if (!text.trim() || text.length < 5) {
      toast.error("Wpisz treść komentarza (minimum 5 znaków)")
      return
    }

    setIsSubmitting(true)

    // Simulate small premium delay
    await new Promise((r) => setTimeout(r, 600))

    try {
      const initials = author.trim().slice(0, 2).toUpperCase()
      const randColor = AVATAR_PALETTES[Math.floor(Math.random() * AVATAR_PALETTES.length)]
      
      const newComment: CommentItem = {
        id: `com-custom-${Date.now()}`,
        articleId,
        author: author.trim(),
        comment: text.trim(),
        source: `Wypowiedź pod: ${articleTitle.slice(0, 30)}${articleTitle.length > 30 ? "..." : ""}`,
        time: "Przed chwilą",
        avatarBg: randColor,
        initials,
        timestamp: Date.now()
      }

      // Retrieve all, append, and save
      const stored = localStorage.getItem("wreczyca_comments")
      const currentAll: CommentItem[] = stored ? JSON.parse(stored) : []
      const updatedAll = [newComment, ...currentAll] // prepend to global so it is newest first
      
      localStorage.setItem("wreczyca_comments", JSON.stringify(updatedAll))
      
      // Notify other widgets reactively
      window.dispatchEvent(new Event("commentsUpdated"))

      // Reset form and notify user
      setText("")
      toast.success("Komentarz został opublikowany!", {
        description: "Twój głos został pomyślnie dodany do serwisu informacyjnego.",
      })
    } catch (err) {
      toast.error("Nie udało się opublikować komentarza")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-20 border-t border-[#dad7cd]/40 pt-16 select-none">
      
      <div className="flex items-center gap-3.5 mb-10 pb-3 border-b border-[#dad7cd]/35">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#3a5a40]/10 text-[#3a5a40]">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#344e41] uppercase tracking-wider">
            Głos Mieszkańców ({comments.length})
          </h3>
          <span className="text-[10px] text-[#a3b18a] font-bold uppercase tracking-wider block">
            Komentarze i opinie społeczności lokalnej
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Comments List (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {comments.length > 0 ? (
              comments.map((com) => (
                <motion.div
                  key={com.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ type: "spring", stiffness: 100, damping: 18 }}
                  className="flex gap-4 p-5 rounded-3xl bg-white border border-[#dad7cd]/40 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className={`h-10 w-10 rounded-full shrink-0 flex items-center justify-center font-bold text-sm ${com.avatarBg}`}>
                    {com.initials}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-[#344e41]">{com.author}</span>
                      <span className="text-[10px] font-bold text-[#3a5a40]/30 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {com.time}
                      </span>
                    </div>
                    <p className="text-sm text-[#3a5a40]/75 font-medium leading-relaxed">
                      {com.comment}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 px-6 text-center bg-[#dad7cd]/35 border border-[#dad7cd]/30 rounded-[2rem]"
              >
                <MessageSquare className="h-10 w-10 text-[#a3b18a]/40 mb-3" />
                <p className="text-sm font-bold text-[#344e41] mb-1">Brak komentarzy</p>
                <p className="text-xs text-[#3a5a40]/50 max-w-xs font-medium leading-relaxed">
                  Bądź pierwszym mieszkańcem, który podzieli się swoją opinią pod tym artykułem!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Form submission card (lg:col-span-5) */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-[#dad7cd]/40 rounded-[2rem] p-6 shadow-sm">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#344e41] mb-5 flex items-center gap-2">
              <Send className="h-3.5 w-3.5 text-[#a3b18a]" />
              Dodaj swój komentarz
            </h4>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Author Field */}
              <div className="space-y-1.5">
                <label htmlFor="comment-author" className="text-[10px] font-black uppercase tracking-wider text-[#344e41]/60">
                  Podpis (imię / pseudonim)
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 h-4 w-4 text-[#a3b18a] pointer-events-none" />
                  <input
                    id="comment-author"
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="np. Anna, Mieszkaniec"
                    className="w-full bg-[#dad7cd]/45 border border-[#dad7cd]/40 text-xs font-semibold text-[#344e41] rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:border-[#3a5a40] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Text Field */}
              <div className="space-y-1.5">
                <label htmlFor="comment-text" className="text-[10px] font-black uppercase tracking-wider text-[#344e41]/60">
                  Treść komentarza
                </label>
                <textarea
                  id="comment-text"
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Napisz co myślisz o tym artykule..."
                  rows={4}
                  className="w-full bg-[#dad7cd]/45 border border-[#dad7cd]/40 text-xs font-semibold text-[#344e41] rounded-2xl p-4 outline-none focus:border-[#3a5a40] focus:bg-white transition-all resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-start gap-2 bg-[#dad7cd]/30 p-3 rounded-2xl border border-[#dad7cd]/20">
                <AlertCircle className="h-3.5 w-3.5 text-[#a3b18a] shrink-0 mt-0.5" />
                <p className="text-[9px] font-medium text-[#3a5a40]/65 leading-relaxed">
                  Komentarze podlegają moderacji społecznościowej. Prosimy o kulturalną dyskusję dbającą o dobro wspólne gminy.
                </p>
              </div>

              {/* Submit CTA */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl bg-[#3a5a40] hover:bg-[#0b5e28] text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#3a5a40]/15 hover:shadow-[#3a5a40]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? "Publikowanie..." : "Opublikuj komentarz"}</span>
                <Send className="h-3.5 w-3.5 shrink-0" />
              </motion.button>

            </form>
          </div>
        </div>

      </div>

    </div>
  )
}
