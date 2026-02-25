// server/api/products.ts
import { createClient } from '@supabase/supabase-js'

const ID_FIELDS = [
  'title',
  'description',
  'category',
  'originalPrice',
  'discountPrice',
  'image',
  'tag'
]

const MATCH_FIELDS = [
  'title',
  'category',
  'originalPrice',
  'discountPrice',
  'tag'
]

function stableProductId(product: Record<string, any>) {
  const raw = ID_FIELDS.map((field) => String(product?.[field] ?? '')).join('|')
  let hash = 5381
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) + hash) + raw.charCodeAt(i)
    hash |= 0
  }
  return `p_${Math.abs(hash)}`
}

function normalizeProduct(product: Record<string, any>) {
  if (product?.id !== undefined && product?.id !== null && String(product.id) !== '') {
    return product
  }
  return { ...product, id: stableProductId(product) }
}

function getMatchableFields(product: Record<string, any>) {
  const out: Record<string, any> = {}
  for (const field of MATCH_FIELDS) {
    if (product?.[field] !== undefined && product?.[field] !== null) {
      out[field] = product[field]
    }
  }
  return out
}

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const config = useRuntimeConfig()

  // 1. استخدام "as string" لتفادي أخطاء TypeScript وضمان وجود القيم
  const supabaseUrl = config.public.supabaseUrl as string
  const supabaseKey = config.supabaseServiceRoleKey as string

  // 2. التحقق الصارم من وجود المفاتيح قبل محاولة إنشاء العميل
  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase configuration is missing. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    })
  }

  // ربط العميل بقاعدة البيانات
  const supabase = createClient(supabaseUrl, supabaseKey)

  // --- العمليات ---

  // 1. جلب البيانات (GET)
  if (method === 'GET') {
    const { data, error } = await supabase
      .from('products')
      .select('*')

    if (error) throw createError({ statusCode: 500, message: error.message })
    return (data || []).map(normalizeProduct)
  }

  // 2. إضافة منتج (POST)
  if (method === 'POST') {
    const body = await readBody(event)
    // التأكد من استبعاد id تماماً ليقوم Supabase بتوليده
    const { id, ...newProductData } = body

    const { data, error } = await supabase
      .from('products')
      .insert([newProductData])
      .select()

    if (error) throw createError({ statusCode: 500, message: error.message })
    return data[0]
  }

  // 3. تعديل منتج (PUT)
  if (method === 'PUT') {
    const body = await readBody(event)
    const { id, original, ...updateData } = body

    if (!id) throw createError({ statusCode: 400, message: 'ID is required for update' })
    let matchData = original ? getMatchableFields(original) : null

    if (!matchData || !Object.keys(matchData).length) {
      const { data: rows, error: listError } = await supabase
        .from('products')
        .select('*')

      if (listError) throw createError({ statusCode: 500, message: listError.message })

      const target = (rows || []).find((row) => normalizeProduct(row).id == id)
      if (!target) throw createError({ statusCode: 404, message: 'Product not found' })
      matchData = getMatchableFields(target)
    }

    if (!Object.keys(matchData).length) {
      throw createError({ statusCode: 400, message: 'Unable to identify product row for update' })
    }

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .match(matchData)
      .select()

    if (error) throw createError({ statusCode: 500, message: error.message })
    return normalizeProduct(data?.[0] || {})
  }

  // 4. حذف منتج (DELETE)
  if (method === 'DELETE') {
    const query = getQuery(event)
    const body = await readBody(event).catch(() => ({}))
    const bodyProduct = body?.product
    
    let matchData = bodyProduct ? getMatchableFields(bodyProduct) : null
    const queryId = query.id || body?.id

    if ((!matchData || !Object.keys(matchData).length) && !queryId) {
      throw createError({ statusCode: 400, message: 'ID or product snapshot is required for delete' })
    }

    if (!matchData || !Object.keys(matchData).length) {
      const { data: rows, error: listError } = await supabase
        .from('products')
        .select('*')

      if (listError) throw createError({ statusCode: 500, message: listError.message })

      const target = (rows || []).find((row) => normalizeProduct(row).id == queryId)
      if (!target) throw createError({ statusCode: 404, message: 'Product not found' })
      matchData = getMatchableFields(target)
    }

    if (!Object.keys(matchData).length) {
      throw createError({ statusCode: 400, message: 'Unable to identify product row for delete' })
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .match(matchData)

    if (error) throw createError({ statusCode: 500, message: error.message })
    return { status: 'success', message: 'Product deleted successfully' }
  }
})
