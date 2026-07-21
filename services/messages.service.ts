'use server'

import { createClient } from '@/lib/supabase/server'

export async function sendMessage(formData: {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  phoneNumber?: string;
  userId?: string;
}) {
  const supabase = await createClient()

  const { error } = await supabase.from('messages').insert({
    full_name: formData.fullName,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
    phone_number: formData.phoneNumber,
    user_id: formData.userId || null
  })

  if (error) {
    // console.error("Error sending message:", error)
    throw new Error(error.message)
  }

  return { success: true }
}

export async function getAllMessages() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    // console.error("Error fetching messages:", error)
    throw new Error(error.message)
  }

  return data
}

export async function deleteMessage(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id)

  if (error) {
    // console.error("Error deleting message:", error)
    throw new Error(error.message)
  }

  return { success: true }
}
