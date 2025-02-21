import { NextResponse } from "next/server"

// Type for our post data
export interface Post {
  id: string
  image: string
  megaLink: string
  tutorialLink?: string
  caption?: string
  date: string
}

// Fallback to localStorage if Cloudflare is not configured
let posts: Post[] = []

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { image, megaLink, tutorialLink, caption } = data

    const post: Post = {
      id: Date.now().toString(),
      image,
      megaLink,
      tutorialLink,
      caption,
      date: new Date().toISOString(),
    }

    // Add new post to the beginning
    posts = [post, ...posts]

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}

export async function GET() {
  try {
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    posts = posts.filter((post) => post.id !== id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}

