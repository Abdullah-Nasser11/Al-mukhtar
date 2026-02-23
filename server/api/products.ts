// server/api/products.ts
export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const storage = useStorage('data') 

  // تأكد من تعريف المصفوفة داخل الدالة أو التأكد من جلبها أولاً
  let products = await storage.getItem<any[]>('products') || []

  if (method === 'GET') {
    return products
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const newProduct = { id: Date.now(), ...body }
    products.push(newProduct)
    await storage.setItem('products', products) 
    return newProduct
  }

  if (method === 'PUT') {
    const body = await readBody(event)
    products = products.map(p => p.id === body.id ? body : p)
    await storage.setItem('products', products)
    return { message: 'Updated' }
  }

  if (method === 'DELETE') {
    const query = getQuery(event)
    products = products.filter(p => p.id !== Number(query.id))
    await storage.setItem('products', products)
    return { message: 'Deleted' }
  }
})