'use server'
import { createClient } from '@/lib/supabase/server'

export async function toggleFavourite(property_id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase
        .auth
        .getUser()
    if (!user) throw new Error("Login required")

    // Already saved cha? → remove, natra → add
    const { data: existing } = await supabase
        .from('favourites')
        .select('id')
        .eq('user_id', user.id)
        .eq('property_id', property_id)
        .single()

    if (existing) {
        await supabase
            .from('favourites')
            .delete()
            .eq('id', existing.id)
        return { saved: false }
    } else {
        await supabase
            .from('favourites')
            .insert({ user_id: user.id, property_id })
        return { saved: true }
    }
}

export async function getMyFavourites() {
    const supabase = await createClient()
    const { data: { user } } = await supabase
    .auth
    .getUser()
    if (!user) return []

    const { data, error } = await supabase
        .from('favourites')
        .select('*, properties(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)
    return data
}

export async function isFavourited(property_id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase
    .auth
    .getUser()
    if (!user) return false

    const { data } = await supabase
        .from('favourites')
        .select('id')
        .eq('user_id', user.id)
        .eq('property_id', property_id)
        .single()

    return !!data
}