import { CartItem } from '@/App.tsx'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils.ts'
import BigButton from '@/BigButton.tsx'

export default function ConfirmationDialog({
  cart,
  startNewOrder,
  children,
}: {
  cart: CartItem[]
  startNewOrder: () => void
  children: ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleStartNewOrder = async () => {
    setIsOpen(false)
    setTimeout(() => startNewOrder(), 100)
  }

  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        {children}
      </DialogTrigger>
      <VisuallyHidden.Root>
        <DialogHeader>
          <DialogTitle>Order Confirmation</DialogTitle>
          <DialogDescription>We hope you enjoy your food!</DialogDescription>
        </DialogHeader>
      </VisuallyHidden.Root>
      <DialogContent
        className={cn(
          'tablet:bottom-1/2 tablet:translate-y-1/2 tablet:px-10',
          'desktop:w-[592px] desktop:px-0'
        )}
        onPointerDownOutside={(e) => {
          e.preventDefault()
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault()
        }}
      >
        <div
          className={cn(
            'bg-white pt-10 pb-6 px-6 space-y-8 tablet:p-10',
            'rounded-t-[12px] tablet:rounded-[12px]'
          )}
        >
          <div className="flex flex-col space-y-6">
            <CheckIcon />
            <div className="flex flex-col space-y-2">
              <span className="text-[40px] text-rose-900 font-bold leading-[120%]">
                Order Confirmed
              </span>
              <span className="text-[16px] text-rose-500 leading-[normal]">
                We hope you enjoy your food!
              </span>
            </div>
          </div>
          <ItemInfoList cart={cart} />
          <DialogClose asChild>
            <BigButton onClick={handleStartNewOrder}>Start New Order</BigButton>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ItemInfoList({ cart }: { cart: CartItem[] }) {
  return (
    <div className="p-6 space-y-6 bg-rose-50 rounded-[8px]">
      <ul className="space-y-4">
        {cart.map((cartItem, index) => (
          <li key={cartItem.item.name}>
            <div className="flex justify-between">
              <ItemInfo item={cartItem.item} quantity={cartItem.quantity} />
            </div>
            {index < cart.length - 1 && (
              <div className="w-full h-px bg-rose-100 my-4" />
            )}
          </li>
        ))}
      </ul>
      <div className="w-full h-px bg-rose-100" />
      <div className="flex flex-row justify-between items-baseline">
        <span className="text-[14px] text-rose-900 leading-[normal]">
          Order Total
        </span>
        <span className="text-[24px] text-rose-900 font-bold leading-[normal]">
          $
          {cart
            .reduce((acc, item) => acc + item.quantity * item.item.price, 0)
            .toFixed(2)}
        </span>
      </div>
    </div>
  )
}

function ItemInfo({ item, quantity }: CartItem) {
  return (
    <div className="w-full flex items-center justify-between gap-x-2">
      <div className="flex flex-row space-x-4">
        <img
          src={new URL(item.image.thumbnail, import.meta.url).href}
          alt={item.name}
          className="w-12 h-12 object-cover rounded-[4px]"
        />
        <div className="flex flex-col space-y-2 overflow-hidden">
          <span className="text-[14px] text-rose-900 font-semibold leading-[normal] truncate">
            {item.name}
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="w-5 text-[14px] text-red font-semibold leading-[normal]">
              {quantity}x
            </span>
            <span className="text-[14px] text-rose-500 font-normal leading-[normal]">
              @ ${item.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <span className="text-[16px] text-rose-900 font-semibold leading-[normal]">
        ${(quantity * item.price).toFixed(2)}
      </span>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z"
        fill="#1EA575"
      />
      <path
        d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z"
        fill="#1EA575"
      />
    </svg>
  )
}
