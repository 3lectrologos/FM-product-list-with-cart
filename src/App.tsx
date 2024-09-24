import ItemGrid from '@/ItemGrid.tsx'
import itemList from '@/data/data.json'
import Cart from '@/Cart.tsx'

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

function App() {
  return (
    <div className="min-h-dvh bg-rose-50 flex flex-col items-center">
      <div className="p-6 space-y-8">
        <h1 className="text-rose-900 text-[40px] font-bold leading-[1.2]">
          Desserts
        </h1>
        <ItemGrid items={itemList as Item[]} />
        <Cart />
      </div>
    </div>
  )
}

export default App
