"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Download, Book } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MatrixRain } from "@/components/matrix-rain"
import type { Post } from "@/app/api/posts/route"

export default function LeaksPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
      setPosts([]) // Set empty array on error
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#1DB954]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-[#1DB954]">
      <MatrixRain />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link href="/">
          <Button variant="ghost" className="text-[#1DB954] hover:text-[#1DB954]/90 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="flex items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center">SnapCrack Leaks</h1>
          <Badge className="bg-red-500/20 text-red-500 border-red-500/50">NSFW</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="bg-black/50 border-[#1DB954]/50 hover:border-[#1DB954] transition-all">
              <CardContent className="p-4">
                <div className="relative">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt="Leak preview"
                    className="w-full aspect-[4/5] object-cover rounded-lg mb-4"
                  />
                  <Badge className="absolute top-2 left-2 bg-[#1DB954] text-black">Featured</Badge>
                </div>
                {post.caption && <p className="text-white/80 mb-4">{post.caption}</p>}
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-[#1DB954] text-black hover:bg-[#1DB954]/90"
                    onClick={() => window.open(post.megaLink, "_blank")}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Get Mega
                  </Button>
                  {post.tutorialLink && (
                    <Button
                      variant="outline"
                      className="flex-1 border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10"
                      onClick={() => window.open(post.tutorialLink, "_blank")}
                    >
                      <Book className="mr-2 h-4 w-4" />
                      Tutorial
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

