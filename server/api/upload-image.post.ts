import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'node:crypto'

function getExtension(filename: string, mimeType?: string) {
  const fromName = filename?.split('.').pop()?.toLowerCase()
  if (fromName && fromName.length <= 5) return fromName

  if (!mimeType) return 'bin'
  if (mimeType === 'image/jpeg') return 'jpg'
  if (mimeType === 'image/png') return 'png'
  if (mimeType === 'image/webp') return 'webp'
  if (mimeType === 'image/gif') return 'gif'
  if (mimeType === 'image/avif') return 'avif'
  return 'bin'
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl as string
  const supabaseKey = config.supabaseServiceRoleKey as string
  const bucket = (config.supabaseStorageBucket as string) || 'product-images'

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      message: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.'
    })
  }

  const parts = await readMultipartFormData(event)
  const filePart = parts?.find((part) => part.name === 'file')

  if (!filePart?.data || !filePart.filename) {
    throw createError({ statusCode: 400, message: 'No file uploaded.' })
  }

  if (!String(filePart.type || '').startsWith('image/')) {
    throw createError({ statusCode: 400, message: 'Only image files are allowed.' })
  }

  const ext = getExtension(filePart.filename, filePart.type)
  const path = `products/${Date.now()}-${randomUUID()}.${ext}`

  const supabase = createClient(supabaseUrl, supabaseKey)
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, filePart.data, {
      contentType: filePart.type || 'application/octet-stream',
      upsert: false
    })

  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return { url: data.publicUrl, path }
})
