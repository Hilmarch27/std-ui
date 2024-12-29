import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TTooltipInfo = {
  text: string;
  className?: string;
  children: React.ReactNode;
};

export function TooltipInfo({ text, children, className }: TTooltipInfo) {
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={2}>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent>
            <p className={cn("text-sm", className)}>{text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
