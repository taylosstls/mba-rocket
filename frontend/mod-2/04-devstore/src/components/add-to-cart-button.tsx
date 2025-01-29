'use client'

import { useCart } from '@/app/contexts/cart-context'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export interface AddToCartButtonProps {
  productId: number
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  function handleAddProductToCart() {
    addToCart(productId)
    toast.success('Produto adicionado ao carrinho!', {})
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <button
        type="button"
        onClick={handleAddProductToCart}
        className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white transition-all hover:bg-emerald-500"
      >
        Adicionar ao carrinho
      </button>
    </>
  )
}
