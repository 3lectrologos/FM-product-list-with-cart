import ItemGrid from '@/ItemGrid.tsx'
import itemList from '@/data/data.json'
import Cart from '@/Cart.tsx'
import { useState } from 'react'

export type Item = {
  image: {
    thumbnail: string
    mobile: string
    tablet: string
    desktop: string
  }
  name: string
  category: string
  price: number
}

export type CartItem = {
  name: string
  quantity: number
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: Item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name)
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      )
    } else {
      setCart([...cart, { name: item.name, quantity: 1 }])
    }
  }

  const removeFromCart = (item: Item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name)
    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      )
    } else {
      setCart(cart.filter((cartItem) => cartItem.name !== item.name))
    }
  }

  return (
    <div className="min-h-dvh bg-rose-50 flex flex-col items-center">
      <div className="p-6 space-y-8">
        <h1 className="text-rose-900 text-[40px] font-bold leading-[1.2]">
          Desserts
        </h1>
        <ItemGrid
          items={itemList as Item[]}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
        <Cart cart={cart} />
      </div>
    </div>
  )
}

export default App
