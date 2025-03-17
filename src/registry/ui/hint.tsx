import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type HintProps = {
  content: string
  children: React.ReactNode
  direction?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  asChild?: boolean
  onOpenChange?: (isOpen: boolean) => void
  enabled?: boolean
  delay?: number
}

export function Hint({
  content,
  children,
  className,
  direction = 'top',
  onOpenChange,
  enabled = true,
  delay = 2
}: HintProps) {
  if (!enabled) return <>{children}</>
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delay} onOpenChange={onOpenChange}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={direction}>
          <p className={cn('text-sm', className)}>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
