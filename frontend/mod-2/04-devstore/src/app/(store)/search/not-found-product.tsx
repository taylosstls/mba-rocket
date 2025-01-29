'use client'

import Lottie from 'lottie-react'
import animationData from '@/data/no-result-found.json'

export function NotFoundProduct() {
  return (
    <div className="col-span-3 min-h-[60vh] flex flex-col align-middle text-center justify-center items-center">
      <Lottie
        width={256}
        height={256}
        className="w-64 h-64"
        alt="Nenhum resultado encontrado"
        animationData={animationData}
      />
      <p className="text-2xl font-semibold">
        Ops...
        <br /> Nenhum produto encontrado com este nome
      </p>
    </div>
  )
}
