import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { CheckIcon, User } from "lucide-react";

type Item = {
  text: string;
  subItems?: string[];
  icon?: React.ReactNode;
};

interface VerticalLineListProps {
  items?: Item[];
  className?: string;
  asChild?: boolean;
}

export function VerticalLineList({
  items = [],
  className,
  asChild = false,
}: VerticalLineListProps) {
  const Comp = asChild ? Slot : "ul";

  if (items.length === 0) {
    return null;
  }

  return (
    <Comp className={cn("relative", className)}>
      {items.map((item, index) => (
        <li key={index} className="pl-8 relative">
          <div className="absolute left-0 top-[6px] w-4 h-4 bg-primary rounded-full z-10 flex items-center justify-center">
            {item.icon && (
              <span className="text-white text-xs">{item.icon}</span>
            )}
          </div>
          {index < items.length - 1 && (
            <div className="absolute left-2 top-2 h-[105%] bottom-0 w-0.5 bg-primary"></div>
          )}
          <span className="text-primary font-medium text-lg">{item.text}</span>
          {item.subItems && item.subItems.length > 0 && (
            <ul className="space-y-1">
              {item.subItems.map((subItem, subIndex) => (
                <li key={subIndex} className="text-sm text-primary-foreground">
                  {subItem}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </Comp>
  );
}

const VerticalLineListPreview = () => {
  return (
    <VerticalLineList
      items={[
        {
          text: "Step 1",
          subItems: ["Substep 1"],
          icon: <User size={12} />,
        },
        {
          text: "Step 2",
          subItems: ["Substep 1", "Substep 2"],
          icon: <CheckIcon size={12} />,
        },
      ]}
    />
  );
};

export default VerticalLineListPreview;
