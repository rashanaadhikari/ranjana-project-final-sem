'use server'
import { createClient } from '@/lib/supabase/server'

export async function createProperty(formData: FormData) {
  // console.log("createProperty called with:", Object.fromEntries(formData.entries()))
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // console.error("createProperty: No user found")
    throw new Error("Unauthorized")
  }

  const title = formData.get('title') as string
  const price_per_month = parseInt(formData.get('rent') as string)
  const bedrooms = parseInt(formData.get('bedrooms') as string)
  const kitchens = parseInt(formData.get('kitchens') as string)
  const room_type = formData.get('category') as string
  const floor_number = formData.get('floor') as string
  const is_living_room_available = formData.get('livingRoom') === 'Available'
  const tags = formData.get('tags') as string
  const rent_design = formData.get('RentDesign') as string
  const detailed_address = formData.get('detailed_address') as string
  const description = formData.get('description') as string
  const lat = parseFloat(formData.get('lat') as string)
  const lng = parseFloat(formData.get('lng') as string)

  const imageFiles = formData.getAll('images') as File[]
  const image_urls: string[] = []

  for (const image of imageFiles) {
    if (image.size === 0) continue
    const fileExt = image.name.split('.').pop()
    const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`

    //uploading in supabase bucket
    const {
      data: uploadedImage,
      error: uploadError
    } = await supabase
      .storage
      .from('image_url')
      .upload(fileName, image)

    if (uploadError) {
      // console.error('Image upload failed:', uploadError.message) // add this
      continue
    }
    if (uploadedImage) {
      const { data: { publicUrl } } = supabase.storage.from('image_url').getPublicUrl(uploadedImage.path)
      image_urls.push(publicUrl)
    }
  }

  const { error } = await supabase.from('properties').insert({
    owner_id: user.id,
    title,
    description,
    room_type,
    room_type_slug: room_type.toLowerCase().replace(/ /g, '-'),
    price_per_month,
    bedrooms,
    kitchens,
    floor_number,
    is_living_room_available,
    rent_design,
    tags,
    detailed_address,
    location: formData.get('location') as string,
    latitude: lat,
    longitude: lng,
    image_urls,
    is_active: formData.get('is_active') === 'true',
    contact_phone: user.phone || user.user_metadata?.phone || "N/A"
  })

  if (error) throw new Error(error.message)
}

/*
* @description
* This function is used to get the properties of the admin
* @returns {Promise<Array<Object>>}
*/
export async function getAdminProperties() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('properties')
    .select('*, users:owner_id(name, phone_number)')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

/*
* @description
* This function is used to get the properties of the logged in user
* @returns {Promise<Array<Object>>}
*/
export async function getMyProperties() {
  const supabase = await createClient()
  const { data:
    {
      user
    }
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false })

  // console.log(data)

  if (error) throw new Error(error.message)
  return data
}

export async function updatePropertyStatus(id: string, is_active: boolean) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('properties')
    .update({ is_active })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export async function deleteProperty(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}