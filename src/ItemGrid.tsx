import { Item } from '@/App.tsx'
import { Button } from '@/components/ui/button.tsx'
import { cn } from '@/lib/utils.ts'

export default function ItemGrid({ items }: { items: Item[] }) {
  return (
    <ul className="space-y-6">
      {items.map((item) => (
        <li key={item.name}>
          <ItemDisplay item={item} />
        </li>
      ))}
    </ul>
  )
}

function ItemDisplay({ item }: { item: Item }) {
  return (
    <div className="-space-y-1.5">
      <div className="flex flex-col items-center">
        <div className={'rounded-[8px] overflow-hidden'}>
          <img
            src={new URL(item.image.mobile, import.meta.url).href}
            alt={item.name}
          />
        </div>
        <AddToCartButton />
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

function AddToCartButton() {
  return (
    <Button
      className={cn(
        'w-40 h-11 bg-white border border-rose-400 text-[16px] font-semibold rounded-full',
        '-translate-y-1/2'
      )}
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
