'use client'

import { useCart } from '@/app/contexts/cart-context'
import { ShoppingBag } from 'lucide-react'

export interface CartWidgetProps {}

export function CartWidget() {
  const { items } = useCart()

  return (
    <div className="flex items-center gap-2 relative">
      <ShoppingBag className="h-6 w-6 mr-2" />
      <span className="absolute -bottom-3.5 -right-2 text-sm text-center rounded-full flex justify-center align-middle items-center h-6 w-6 p-3 bg-violet-500">
        {items.length}
      </span>
    </div>
  )
}
