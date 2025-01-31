// text-alignment-buttons.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { useEditor } from "novel";

export const TextAlignmentButtons = () => {
  const { editor } = useEditor();
  if (!editor) return null;

  const alignmentItems = [
    {
      name: "align-left",
      icon: AlignLeft,
      command: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: () => editor.isActive({ textAlign: "left" }),
    },
    {
      name: "align-center",
      icon: AlignCenter,
      command: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: () => editor.isActive({ textAlign: "center" }),
    },
    {
      name: "align-right",
      icon: AlignRight,
      command: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: () => editor.isActive({ textAlign: "right" }),
    },
  ];

  return (
    <div className="flex">
      {alignmentItems.map((item) => (
        <Button
          key={item.name}
          size="icon"
          variant="ghost"
          onClick={item.command}
          className={cn(
            "rounded-none h-8",
            { "text-primary": item.isActive() } // active state
          )}
        >
          <item.icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );
};
