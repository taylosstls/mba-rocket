import { api } from '@/data/api'
import { Product } from '@/data/types/products'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

/**
 * Cache & Memoization
 * 'useMemo' / 'memo' / 'useCallback'
 *
 * React Memoization: O React não permite fazer requisição 2x da mesma rota
 * diferente do caso do usuário navegar em uma outra página, aí a requisição ocorrerá novamente
 *
 */

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
    // next: {
    //   revalidate: 60 * 10, // Daqui 10 minutos criará um novo cache
    // },
    // cache: 'force-cache' // formato padrão ou usa o cache ou usa o next. Por exemplo: E-Commerce com produtos fixos
    cache: 'no-store', // => A requisição sempre será requisitada. Por exemplo: Recomendação de vídeos do Youtube
  })

  const products = await response.json()

  return products
}

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="relative group col-span-6 row-span-6 flex justify-center items-end rounded-lg bg-zinc-900 overflow-hidden"
      >
        <Image
          className="group-hover:scale-105 group-hover:opacity-50 transition-all duration-500 object-cover object-center"
          src={highlightedProduct.image}
          alt={highlightedProduct.title}
          width={920}
          height={920}
          quality={100}
        />

        <div className="absolute bottom-20 right-20 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 group-hover:bg-black transition-all duration-500 p-1 pl-5">
          <span className="text-sm truncate">{highlightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highlightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>

      {otherProducts.slice(0, 2).map((product) => {
        return (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="relative group col-span-3 row-span-3 flex justify-center items-center rounded-lg bg-zinc-900 overflow-hidden"
          >
            <Image
              className="group-hover:scale-105 group-hover:opacity-50 transition-all duration-500 object-cover object-center"
              src={product.image}
              alt={product.title}
              width={460}
              height={460}
              quality={100}
            />

            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 group-hover:bg-black transition-all duration-500 p-1 pl-5">
              <span className="text-sm truncate">{product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
