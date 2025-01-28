import data from './data.json'

export async function GET() {
  const responseData = data.products

  return Response.json(responseData)
}
