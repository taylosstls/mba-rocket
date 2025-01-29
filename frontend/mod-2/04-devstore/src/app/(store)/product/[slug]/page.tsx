import { AddToCartButton } from '@/components/add-to-cart-button'
import { api } from '@/data/api'
import { Product } from '@/data/types/products'
import { Metadata } from 'next'
import Image from 'next/image'

interface ProductProps {
  params: {
    slug: string
  }
}

// Memoização - Como generateMetadata e ProductPage, chamam a mesma API
// só vai ser evocado uma única vez requisição da rota

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // Cache 1 hour duration
    },
  })

  const product = await response.json()

  return product
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.slug)

  return {
    title: product.title,
  }
}

export async function generateStaticParams() {
  const response = await api('/products/featured')
  const products: Product[] = await response.json()

  return products.map((product) => {
    return { slug: product.slug }
  })
}

export default async function ProductPage({ params }: ProductProps) {
  const sweatshirtSizes = ['PP', 'P', 'M', 'G', 'GG', 'XG']
  const product = await getProduct(params.slug)

  return (
    <div className="relative grid w-full max-h-[860px] grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0">
      <div className="col-span-3 lg:col-span-2 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          width={1000}
          height={1000}
          quality={100}
        />
      </div>

      <div className="col-span-3 lg:col-span-1 flex flex-col justify-center sm-px-0 lg:px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em 12x s/juros de{' '}
            {(product.price / 12).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            {sweatshirtSizes.map((size) => (
              <div className="relative" key={size}>
                <input
                  type="radio"
                  id={`sweatshirt-${size}`}
                  name="sweatshirtSize"
                  className="hidden peer"
                  value={size}
                />
                <label
                  htmlFor={`sweatshirt-${size}`}
                  className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-sm font-semibold transition-all cursor-pointer select-none hover:bg-zinc-700 peer-checked:bg-zinc-500"
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  )
}
