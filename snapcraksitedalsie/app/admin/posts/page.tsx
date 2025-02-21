"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowLeft, Plus, ImageIcon, LinkIcon, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { MatrixRain } from "@/components/matrix-rain"
import type { Post } from "@/app/api/posts/route"

export default function AdminPosts() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [newPost, setNewPost] = useState({
    image: "",
    megaLink: "",
    tutorialLink: "",
    caption: "",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Fetch posts on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts()
    }
  }, [isAuthenticated])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts")
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
      alert("Failed to fetch posts")
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "samkojegood") {
      setIsAuthenticated(true)
    } else {
      alert("Nesprávne heslo")
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setNewPost((prev) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.image || !newPost.megaLink) {
      alert("Prosím vyplňte všetky povinné polia")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      })

      if (!response.ok) throw new Error("Failed to create post")

      const post = await response.json()
      setPosts((prev) => [post, ...prev])
      setNewPost({ image: "", megaLink: "", tutorialLink: "", caption: "" })
      setImagePreview(null)
      const fileInput = document.getElementById("image-upload") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } catch (error) {
      console.error("Error creating post:", error)
      alert("Failed to create post")
    } finally {
      setIsLoading(false)
    }
  }

  const deletePost = async (id: string) => {
    if (!confirm("Naozaj chcete vymazať tento príspevok?")) return

    try {
      const response = await fetch("/api/posts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error("Failed to delete post")

      setPosts((prev) => prev.filter((post) => post.id !== id))
    } catch (error) {
      console.error("Error deleting post:", error)
      alert("Failed to delete post")
    }
  }

  if (!isAuthenticated) {
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

          <Card className="max-w-md mx-auto bg-black/50 border-[#1DB954]/50">
            <CardHeader>
              <h1 className="text-2xl font-bold text-center text-[#1DB954]">Admin Access</h1>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black border-[#1DB954]/50 text-white"
                />
                <Button type="submit" className="w-full bg-[#1DB954] text-black hover:bg-[#1DB954]/90">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
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

        <Card className="bg-black/50 border-[#1DB954]/50 mb-8">
          <CardHeader>
            <h1 className="text-2xl font-bold text-[#1DB954]">Create New Post</h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label className="block mb-2 text-white">Image</label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image-upload")?.click()}
                      className="border-[#1DB954]/50 text-[#1DB954] hover:bg-[#1DB954]/10"
                      disabled={isLoading}
                    >
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Choose Image
                    </Button>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={isLoading}
                    />
                  </div>
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="max-w-[200px] rounded-lg border border-[#1DB954]/50"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-white">Caption</label>
                  <Textarea
                    value={newPost.caption}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, caption: e.target.value }))}
                    placeholder="Enter post caption"
                    className="bg-black border-[#1DB954]/50 text-white min-h-[100px]"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-white">Mega Link</label>
                  <Input
                    value={newPost.megaLink}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, megaLink: e.target.value }))}
                    placeholder="Enter Mega link"
                    className="bg-black border-[#1DB954]/50 text-white"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-white">Tutorial Link (optional)</label>
                  <Input
                    value={newPost.tutorialLink}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, tutorialLink: e.target.value }))}
                    placeholder="Enter tutorial link"
                    className="bg-black border-[#1DB954]/50 text-white"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <Button type="submit" className="bg-[#1DB954] text-black hover:bg-[#1DB954]/90" disabled={isLoading}>
                <Plus className="mr-2 h-4 w-4" />
                {isLoading ? "Creating..." : "Create Post"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="bg-black/50 border-[#1DB954]/50">
              <CardContent className="p-4">
                <div className="relative">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt="Post"
                    className="w-full aspect-[4/5] object-cover rounded-lg mb-4"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => deletePost(post.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {post.caption && <p className="text-white/80">{post.caption}</p>}
                  <div className="flex items-center gap-2 text-white/80">
                    <LinkIcon className="h-4 w-4 text-[#1DB954]" />
                    <span className="truncate">{post.megaLink}</span>
                  </div>
                  {post.tutorialLink && (
                    <div className="flex items-center gap-2 text-white/80">
                      <LinkIcon className="h-4 w-4 text-[#1DB954]" />
                      <span className="truncate">{post.tutorialLink}</span>
                    </div>
                  )}
                  <div className="text-white/60 text-sm">Added: {new Date(post.date).toLocaleDateString()}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

