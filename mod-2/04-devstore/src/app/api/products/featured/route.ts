import data from '../data.json'

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1500)) // Adicionando delay pra criar o skeleton

  const featuredProducts = data.products.filter((product) => product.featured)

  return Response.json(featuredProducts)
}
