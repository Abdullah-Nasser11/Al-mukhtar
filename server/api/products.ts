// server/api/products.ts
export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  // هذا السطر يخبر Nuxt أن يحفظ البيانات في مجلد اسمه data في جذر المشروع
  const storage = useStorage('assets:server') 
  
  // جلب البيانات من الملف (أو مصفوفة فارغة إذا كان أول مرة)
let products = await storage.getItem<any[]>('products.json') || [];
  if (method === 'GET') {
    return products
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const newProduct = { id: Date.now(), ...body }
    products.push(newProduct)
    await storage.setItem('products.json', products) // حفظ التغيير في الملف
    return newProduct
  }

  if (method === 'PUT') {
    const body = await readBody(event)
    products = products.map(p => p.id === body.id ? body : p)
    await storage.setItem('products.json', products) // حفظ التغيير
    return { message: 'Updated' }
  }

  if (method === 'DELETE') {
    const query = getQuery(event)
    products = products.filter(p => p.id !== Number(query.id))
    await storage.setItem('products.json', products) // حفظ التغيير
    return { message: 'Deleted' }
  }
})