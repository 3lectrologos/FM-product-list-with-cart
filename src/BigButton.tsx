import { cn } from '@/lib/utils.ts'
import { Button } from '@/components/ui/button.tsx'
import { ReactNode } from 'react'

export default function BigButton({
  children,
  onClick,
  className,
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <Button
      className={cn('relative w-full group overflow-hidden', className)}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">{children}</div>
    </Button>
  )
}
