import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { seedBlogs } from '@/data/blogs'
import type { BlogPost } from '@/types'

const STORAGE_KEY = 'bokvra_blog_posts'

interface BlogContextValue {
  posts: BlogPost[]
  addPost: (post: Omit<BlogPost, 'id' | 'publishedAt'>) => BlogPost
  getPost: (id: string) => BlogPost | undefined
}

const BlogContext = createContext<BlogContextValue | undefined>(undefined)

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    const userPosts: BlogPost[] = raw ? JSON.parse(raw) : []
    const merged = [...userPosts, ...seedBlogs].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    setPosts(merged)
  }, [])

  function addPost(post: Omit<BlogPost, 'id' | 'publishedAt'>) {
    const newPost: BlogPost = {
      ...post,
      id: `user-${Date.now()}`,
      publishedAt: new Date().toISOString().slice(0, 10),
    }
    const raw = localStorage.getItem(STORAGE_KEY)
    const userPosts: BlogPost[] = raw ? JSON.parse(raw) : []
    const updatedUserPosts = [newPost, ...userPosts]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUserPosts))
    setPosts([newPost, ...posts])
    return newPost
  }

  function getPost(id: string) {
    return posts.find((p) => p.id === id)
  }

  return (
    <BlogContext.Provider value={{ posts, addPost, getPost }}>{children}</BlogContext.Provider>
  )
}

export function useBlog() {
  const ctx = useContext(BlogContext)
  if (!ctx) throw new Error('useBlog must be used within a BlogProvider')
  return ctx
}
