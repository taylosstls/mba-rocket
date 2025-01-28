import { z } from 'zod'
import type { NextRequest } from 'next/server'
import data from '../data.json'

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const { searchParams } = request.nextUrl

  const query = z.string().parse(searchParams.get('q')).toLocaleLowerCase()

  const products = data.products.filter((product) => {
    return product.title.toLocaleLowerCase().includes(query)
  })

  if (!products) {
    return Response.json({ message: 'Product not found' }, { status: 400 })
  }

  return Response.json(products)
}
