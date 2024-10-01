import { CartItem, Item } from '@/App.tsx'
import { Button } from '@/components/ui/button.tsx'
import { cn } from '@/lib/utils.ts'

type ItemGridProps = {
  items: Item[]
  cart: CartItem[]
  addToCart: (item: Item) => void
  removeFromCart: (name: string) => void
}

export default function ItemGrid({
  items,
  cart,
  addToCart,
  removeFromCart,
}: ItemGridProps) {
  return (
    <ul
      className={cn(
        'space-y-6',
        'tablet:grid tablet:grid-cols-3 tablet:gap-x-6 tablet:gap-y-8 tablet:space-y-0'
      )}
    >
      {items.map((item) => (
        <li key={item.name}>
          <ItemDisplay
            item={item}
            quantity={
              cart.find((it) => it.item.name === item.name)?.quantity ?? 0
            }
            onAdd={() => addToCart(item)}
            onRemove={() => removeFromCart(item.name)}
          />
        </li>
      ))}
    </ul>
  )
}

type ItemDisplayProps = {
  item: Item
  quantity: number
  onAdd: () => void
  onRemove: () => void
}

function ItemDisplay({ item, quantity, onAdd, onRemove }: ItemDisplayProps) {
  return (
    <div className="-space-y-1.5">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'rounded-[8px] overflow-hidden border-2 border-red border-opacity-0 transition-all',
            quantity > 0 && 'border-opacity-100'
          )}
        >
          <picture>
            <source
              srcSet={new URL(item.image.desktop, import.meta.url).href}
              media="(min-width: 1024px)"
            />
            <source
              srcSet={new URL(item.image.tablet, import.meta.url).href}
              media="(min-width: 640px)"
            />
            <img
              src={new URL(item.image.mobile, import.meta.url).href}
              alt={item.name}
            />
          </picture>
        </div>
        <AddToCartButton
          quantity={quantity}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <span className="text-rose-500 text-[14px] leading-[normal]">
          {item.category}
        </span>
        <span className="text-rose-900 text-[16px] font-semibold leading-[normal]">
          {item.name}
        </span>
        <span className="text-red text-[16px] font-semibold leading-[normal]">
          ${item.price.toFixed(2)}
        </span>
      </div>
    </div>
  )
}

function AddToCartButton({
  quantity,
  onAdd,
  onRemove,
}: {
  quantity: number
  onAdd: () => void
  onRemove: () => void
}) {
  if (quantity > 0) {
    return (
      <div
        className={cn(
          'w-40 h-11 bg-red text-white rounded-full',
          'flex items-center justify-between px-3',
          '-translate-y-1/2'
        )}
      >
        <SmallButton onClick={onRemove}>
          <MinusIcon />
        </SmallButton>
        <span className="text-[14px] font-semibold">{quantity}</span>
        <SmallButton onClick={onAdd}>
          <PlusIcon />
        </SmallButton>
      </div>
    )
  }

  return (
    <Button
      className={cn(
        'w-40 h-11 bg-white border border-rose-400 text-[16px] font-semibold rounded-full',
        '-translate-y-1/2'
      )}
      onClick={onAdd}
    >
      <div className="flex gap-x-2">
        <CartIcon />
        <span className="text-rose-900 text-[14px] font-semibold leading-[normal]">
          Add to Cart
        </span>
      </div>
    </Button>
  )
}

function SmallButton({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <Button
      className="w-5 h-5 rounded-full border border-white px-0 py-0"
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      fill="none"
      viewBox="0 0 21 20"
    >
      <g fill="#C73B0F" clipPath="url(#a)">
        <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
        <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M.333 0h20v20h-20z" />
        </clipPath>
      </defs>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      fill="none"
      viewBox="0 0 10 10"
    >
      <path
        fill="#fff"
        d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
      />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="2"
      fill="none"
      viewBox="0 0 10 2"
    >
      <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
    </svg>
  )
}
