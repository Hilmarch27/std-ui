import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type THint = {
  content: string;
  children: React.ReactNode;
  direction?: "top" | "bottom" | "left" | "right";
  className?: string;
  asChild?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  enabled?: boolean;
  delay?: number;
};

export function Hint({
  content,
  children,
  className,
  direction = "top",
  asChild = false,
  onOpenChange,
  enabled = true,
  delay = 2,
}: THint) {
  if (!enabled) return <>{children}</>;
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={delay} onOpenChange={onOpenChange}>
          <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
          <TooltipContent side={direction} asChild>
            <p className={cn("text-sm", className)}>{content}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

const HintPreview = () => {
  return (
    <Hint content="This is the hint text">
      <button>Hover me</button>
    </Hint>
  );
};

export default HintPreview;
