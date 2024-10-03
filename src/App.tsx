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
  item: Item
  quantity: number
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: Item) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.item.name === item.name
    )
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.item.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      )
    } else {
      setCart([...cart, { item, quantity: 1 }])
    }
  }

  const removeFromCart = (name: string) => {
    const existingItem = cart.find((cartItem) => cartItem.item.name === name)
    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map((cartItem) =>
          cartItem.item.name === name
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      )
    } else {
      setCart(cart.filter((cartItem) => cartItem.item.name !== name))
    }
  }

  const clearFromCart = (name: string) => {
    setCart(cart.filter((cartItem) => cartItem.item.name !== name))
  }

  const startNewOrder = () => {
    setCart([])
  }

  return (
    <main className="min-h-dvh bg-rose-50 flex flex-col items-center">
      <div className="p-6 space-y-8 tablet:p-10 desktop:py-[88px] desktop:px-[112px] desktop:flex desktop:space-y-0 desktop:gap-x-8">
        <div className="space-y-8">
          <h1 className="text-rose-900 text-[40px] font-bold leading-[1.2]">
            Desserts
          </h1>
          <ItemGrid
            items={itemList as Item[]}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </div>
        <Cart
          className="desktop:w-[384px] desktop:shrink-0"
          cart={cart}
          clearFromCart={clearFromCart}
          startNewOrder={startNewOrder}
        />
      </div>
    </main>
  )
}

export default App
