import Image from 'next/image'
import Link from 'next/link'

import { CartWidget } from './cart-widget'
import { SearchForm } from './search-form'
import { Suspense } from 'react'

export function Header() {
  return (
    <header className="flex flex-wrap items-center justify-center lg:justify-between gap-6 lg:gap-0 mb-4">
      <div className="flex flex-wrap justify-center items-center gap-5">
        <Link href="/" className="text-2xl font-extrabold text-white">
          <Image
            className="lg:w-[106px] lg:h-[29]"
            src="/devstore.svg"
            alt="Logomarca Devstore"
            width={141}
            height={39}
          />
        </Link>

        <Suspense fallback={null}>
          <SearchForm />
        </Suspense>
      </div>

      <div className="flex items-center gap-4">
        <CartWidget />

        <div className="w-px h-4 bg-zinc-700"></div>

        <Link href="/" className="flex items-center gap-3 hover:underline">
          <span className="text-sm">Conta</span>
          <Image
            src="https://github.com/taylosstls.png"
            className="h-8 w-8 object-cover object-center rounded-full"
            width={48}
            height={48}
            alt="Minha conta"
          />
        </Link>
      </div>
    </header>
  )
}
