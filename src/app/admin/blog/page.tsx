import { getPosts } from '../actions'
import BlogClient from './blog-client'

export default async function BlogPage() {
  const posts = await getPosts()
  return <BlogClient initialPosts={posts} />
}
