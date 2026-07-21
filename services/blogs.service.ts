'use server'
import { createClient } from '@/lib/supabase/server'

export async function getAllBlogs() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blogs')
    .select('*, users(name)')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function createBlog(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Unauthorized")

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string
  const image = formData.get('image') as File
 
  // Role-based moderation logic
  const is_published_val = formData.get('is_published') === 'true'
  const { data: userData } = await supabase.from('users').select('role').eq('id', user.id).single()
  const is_published = userData?.role === 'admin' ? is_published_val : false

  let blog_image = ""

  if (image && image.size > 0) {
    const fileExt = image.name.split('.').pop()
    const fileName = `${user.id}/blogs/${Date.now()}.${fileExt}`

    const { data: uploadedImage, error: uploadError } = await supabase
      .storage
      .from('blog_image')
      .upload(fileName, image)

    if (!uploadError) {
      const { data: { publicUrl } } = supabase
      .storage
      .from('blog_image')
      .getPublicUrl(uploadedImage.path)
      blog_image = publicUrl
    }
  }

  /**
   * Generates a URL-friendly slug from the title, appending a unique timestamp suffix.
   * Example: "My First Blog" -> "my-first-blog-1234"
   */
  const generatedSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces/underscores with single hyphens
    .replace(/^-+|-+$/g, "")   // Remove leading/trailing hyphens
    + '-' + Date.now().toString().slice(-4);

  // Insert the blog record into the 'blogs' table
  // We use the 'blog_image' column for the cover image URL
  const { error } = await supabase.from('blogs').insert({
    author_id: user.id,
    title,
    content,
    excerpt,
    blog_image,
    is_published,
    slug: generatedSlug
  })

  // Log and throw error if insert fails
  if (error) {
    // console.error("Supabase blog creation error:", error);
    throw new Error(error.message);
  }
}

export async function deleteBlog(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  // Check if owner or admin
  const { data: blogData } = await supabase.from('blogs').select('author_id').eq('id', id).single()
  const { data: userData } = await supabase.from('users').select('role').eq('id', user.id).single()

  if (blogData?.author_id !== user.id && userData?.role !== 'admin') {
     throw new Error("You do not have permission to delete this blog")
  }

  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}

/**
 * Updates the publication status of a blog post.
 * Restricted to administrators only.
 */
export async function updateBlogStatus(id: string, is_published: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  // Verify that the performing user is an administrator
  const { data: userData } = await supabase.from('users').select('role').eq('id', user.id).single()
  if (userData?.role !== 'admin') {
    throw new Error("Only administrators can toggle blog publication status")
  }

  const { error } = await supabase
    .from('blogs')
    .update({ is_published })
    .eq('id', id)

  if (error) {
    // console.error("Status update error:", error);
    throw new Error(error.message);
  }
}

export async function getMyBlogs() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('blogs')
    .select('*, users(name)')
    .eq('author_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function getPublishedBlogs() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getPublishedBlogs error:', error.message)
    return []
  }
  return data ?? []
}

export async function getBlogBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blogs')
    .select('*, users(name)')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle()

  if (error) return null
  return data
}
