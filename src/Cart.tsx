import { CartItem } from '@/App.tsx'
import { Button } from '@/components/ui/button.tsx'
import ConfirmationDialog from '@/ConfirmationDialog.tsx'
import { cn } from '@/lib/utils.ts'
import { motion } from 'framer-motion'

export default function Cart({
  cart,
  clearFromCart,
  startNewOrder,
  className,
}: {
  cart: CartItem[]
  clearFromCart: (name: string) => void
  startNewOrder: () => void
  className?: string
}) {
  return (
    <motion.div
      layout="position"
      className={cn('h-fit bg-white rounded-[12px] space-y-6 p-6', className)}
    >
      <motion.div
        layout="position"
        className="text-red text-[24px] font-bold leading-[normal]"
      >
        Your Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
      </motion.div>

      <motion.div className="">
        {cart.length === 0 && (
          <div className="flex flex-col items-center space-y-4 py-4">
            <EmptyCartIcon />
            <span className="text-rose-500 text-[14px] font-semibold leading-[normal]">
              Your added items will appear here
            </span>
          </div>
        )}

        {cart.map((cartItem, index) => (
          <motion.div key={cartItem.item.name}>
            <CartItemDisplay
              cartItem={cartItem}
              clearFromCart={() => clearFromCart(cartItem.item.name)}
            />
            {index < cart.length - 1 && (
              <div className="w-full h-px bg-rose-100 my-4" />
            )}
          </motion.div>
        ))}
      </motion.div>

      {cart.length > 0 && (
        <>
          <div className="w-full h-px bg-rose-100" />

          <motion.div className="flex justify-between items-baseline">
            <span>Order Total</span>
            <span className="text-[24px] text-rose-900 font-bold leading-[normal]">
              $
              {cart
                .reduce((acc, item) => acc + item.quantity * item.item.price, 0)
                .toFixed(2)}
            </span>
          </motion.div>

          <motion.div className="h-[52px] flex space-x-2 items-center justify-center bg-rose-50 rounded-[8px]">
            <CarbonNeutralIcon />
            <span className="text-[14px] text-rose-900 font-normal leading-[normal]">
              This is a <span className="font-semibold">carbon-neutral</span>{' '}
              delivery
            </span>
          </motion.div>
        </>
      )}

      <ConfirmationDialog cart={cart} startNewOrder={startNewOrder}>
        <Button className={cn('w-full hidden', cart.length > 0 && 'block')}>
          Confirm Order
        </Button>
      </ConfirmationDialog>
    </motion.div>
  )
}

function CartItemDisplay({
  cartItem,
  clearFromCart,
}: {
  cartItem: CartItem
  clearFromCart: () => void
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col space-y-2">
        <span className="text-[14px] text-rose-900 font-semibold leading-[normal]">
          {cartItem.item.name}
        </span>
        <div className="flex items-baseline space-x-2">
          <span className="w-5 text-[14px] text-red font-semibold leading-[normal]">
            {cartItem.quantity}x
          </span>
          <span className="text-[14px] text-rose-500 font-normal leading-[normal]">
            @ ${cartItem.item.price.toFixed(2)}
          </span>
          <span className="text-[14px] text-rose-500 font-semibold leading-[normal]">
            ${(cartItem.quantity * cartItem.item.price).toFixed(2)}
          </span>
        </div>
      </div>
      <Button
        className="w-[18px] h-[18px] rounded-full p-0 border border-rose-400 bg-white"
        onClick={clearFromCart}
      >
        <RemoveItemIcon />
      </Button>
    </div>
  )
}

function EmptyCartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="128"
      fill="none"
      viewBox="0 0 128 128"
    >
      <path
        fill="#260F08"
        d="M8.436 110.406c0 1.061 4.636 2.079 12.887 2.829 8.252.75 19.444 1.171 31.113 1.171 11.67 0 22.861-.421 31.113-1.171 8.251-.75 12.887-1.768 12.887-2.829 0-1.061-4.636-2.078-12.887-2.828-8.252-.75-19.443-1.172-31.113-1.172-11.67 0-22.861.422-31.113 1.172-8.251.75-12.887 1.767-12.887 2.828Z"
        opacity=".15"
      />
      <path
        fill="#87635A"
        d="m119.983 24.22-47.147 5.76 4.32 35.36 44.773-5.467a2.377 2.377 0 0 0 2.017-1.734c.083-.304.104-.62.063-.933l-4.026-32.986Z"
      />
      <path
        fill="#AD8A85"
        d="m74.561 44.142 47.147-5.754 1.435 11.778-47.142 5.758-1.44-11.782Z"
      />
      <path
        fill="#CAAFA7"
        d="M85.636 36.78a2.4 2.4 0 0 0-2.667-2.054 2.375 2.375 0 0 0-2.053 2.667l.293 2.347a3.574 3.574 0 0 1-7.066.88l-1.307-10.667 14.48-16.88c19.253-.693 34.133 3.6 35.013 10.8l1.28 10.533a1.172 1.172 0 0 1-1.333 1.307 4.696 4.696 0 0 1-3.787-4.08 2.378 2.378 0 1 0-4.72.587l.294 2.346a2.389 2.389 0 0 1-.484 1.755 2.387 2.387 0 0 1-1.583.899 2.383 2.383 0 0 1-1.755-.484 2.378 2.378 0 0 1-.898-1.583 2.371 2.371 0 0 0-1.716-2.008 2.374 2.374 0 0 0-2.511.817 2.374 2.374 0 0 0-.493 1.751l.293 2.373a4.753 4.753 0 0 1-7.652 4.317 4.755 4.755 0 0 1-1.788-3.17l-.427-3.547a2.346 2.346 0 0 0-2.666-2.053 2.4 2.4 0 0 0-2.08 2.667l.16 1.173a2.378 2.378 0 1 1-4.72.587l-.107-1.28Z"
      />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".974"
        d="m81.076 28.966 34.187-4.16"
      />
      <path
        fill="#87635A"
        d="M7.45 51.793c-.96 8.48 16.746 17.44 39.466 19.947 22.72 2.506 42.08-2.16 43.04-10.667l-3.947 35.493c-.96 8.48-20.24 13.334-43.04 10.667S2.463 95.74 3.423 87.18l4.026-35.387Z"
      />
      <path
        fill="#AD8A85"
        d="M5.823 65.953c-.96 8.453 16.746 17.44 39.573 20.027 22.827 2.586 42.053-2.187 43.013-10.667L87.076 87.1c-.96 8.48-20.24 13.333-43.04 10.666C21.236 95.1 3.53 86.22 4.49 77.74l1.334-11.787Z"
      />
      <path
        fill="#CAAFA7"
        d="M60.836 42.78a119.963 119.963 0 0 0-10.347-1.627c-24-2.667-44.453 1.893-45.333 10.373l-2.133 18.88a3.556 3.556 0 1 0 7.066.8 3.574 3.574 0 1 1 7.094.8l-.8 7.094a5.93 5.93 0 1 0 11.786 1.333 3.556 3.556 0 0 1 7.067.8l-.267 2.347a3.573 3.573 0 0 0 7.094.826l.133-1.2a5.932 5.932 0 1 1 11.787 1.36l-.4 3.52a3.573 3.573 0 0 0 7.093.827l.933-8.267a1.174 1.174 0 0 1 1.307-.906 1.146 1.146 0 0 1 1.04 1.306 5.947 5.947 0 0 0 11.813 1.334l.534-4.72a3.556 3.556 0 0 1 7.066.8 3.573 3.573 0 0 0 7.094.826l1.786-15.546a2.373 2.373 0 0 0-2.08-2.667L44.143 55.74l16.693-12.96Z"
      />
      <path
        fill="#87635A"
        d="m59.156 57.66 1.68-14.88-16.827 13.173 15.147 1.707Z"
      />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".974"
        d="M9.796 52.06c-.667 5.866 16.24 12.586 37.733 15.04 14.774 1.68 27.867.906 34.854-1.654"
      />
    </svg>
  )
}

function RemoveItemIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      fill="none"
      viewBox="0 0 10 10"
    >
      <path
        fill="#AD8A85"
        d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
      />
    </svg>
  )
}

function CarbonNeutralIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      fill="none"
      viewBox="0 0 21 20"
    >
      <path
        fill="#1EA575"
        d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"
      />
      <path
        fill="#1EA575"
        d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"
      />
    </svg>
  )
}
