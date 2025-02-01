"use client";

import { useEffect, useState } from "react";

import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
} from "novel";

import { ImageResizer, handleCommandNavigation } from "novel";
import { handleImageDrop, handleImagePaste } from "novel";

import { slashCommand, suggestionItems } from "./slash-command";
import EditorMenu from "./editor-menu";
import { uploadFn } from "./image-upload";
import { defaultExtensions } from "./extensions";
import { TextButtons } from "./selectors/text-buttons";
import { LinkSelector } from "./selectors/link-selector";
import { NodeSelector } from "./selectors/node-selector";
import { MathSelector } from "./selectors/math-selector";
import { ColorSelector } from "./selectors/color-selector";
import { useDebouncedCallback } from "use-debounce";
import { Separator } from "@/components/ui/separator";
import { TextAlignmentButtons } from "./selectors/text-align";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const extensions = [...defaultExtensions, slashCommand];

export const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [],
    },
  ],
};

type TStatus = "Saved" | "Unsaved";
type TEditorProps = {
  className?: string;
  title?: string;
  contentname?: string;
};

export default function Editor({
  className,
  title = "Novel Editor",
  contentname = "novel",
}: TEditorProps) {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    null
  );
  const [saveStatus, setSaveStatus] = useState<TStatus>("Saved");
  const [charsCount, setCharsCount] = useState();

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      setCharsCount(editor.storage.characterCount.words());
      window.localStorage.setItem(contentname, editor.getHTML());
      window.localStorage.setItem("novel-content", JSON.stringify(json));
      setSaveStatus("Saved");
    },
    500
  );

  console.log(window.localStorage.getItem(contentname));

  useEffect(() => {
    const content = window.localStorage.getItem("novel-content");
    if (content) setInitialContent(JSON.parse(content));
    else setInitialContent(defaultEditorContent);
  }, []);

  if (!initialContent) return null;

  return (
    <Card className={cn("w-auto h-auto min-w-[350px]", className)}>
      <CardHeader className="flex flex-row justify-between items-center border-b  p-3 rounded-t-xl">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex flex-row gap-2">
          <Badge
            variant={"outline"}
            className={charsCount ? "items-baseline gap-1.5" : "hidden"}
          >
            <span className="text-[0.625rem] font-medium text-emerald-500">
              {charsCount}
            </span>
            Words
          </Badge>
          <Badge variant="outline" className="gap-1.5">
            <span
              className={`size-1.5 rounded-full ${saveStatus === "Saved" ? "bg-emerald-500" : "bg-red-500"}`}
              aria-hidden="true"
            ></span>
            {saveStatus}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EditorRoot>
          <EditorContent
            initialContent={initialContent}
            extensions={extensions}
            className="relative min-h-96"
            editorProps={{
              handleDOMEvents: {
                keydown: (_view, event) => handleCommandNavigation(event),
              },
              handlePaste: (view, event) =>
                handleImagePaste(view, event, uploadFn),
              handleDrop: (view, event, _slice, moved) =>
                handleImageDrop(view, event, moved, uploadFn),
              attributes: {
                class:
                  "prose dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
              },
            }}
            onUpdate={({ editor }) => {
              debouncedUpdates(editor);
              setSaveStatus("Unsaved");
            }}
            slotAfter={<ImageResizer />}
          >
            <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
              <EditorCommandEmpty className="px-2 text-muted-foreground">
                No results
              </EditorCommandEmpty>
              <EditorCommandList>
                {suggestionItems.map((item) => (
                  <EditorCommandItem
                    value={item.title}
                    onCommand={(val) => item.command?.(val)}
                    className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                    key={item.title}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </EditorCommandItem>
                ))}
              </EditorCommandList>
            </EditorCommand>

            <EditorMenu open={openAI} onOpenChange={setOpenAI}>
              <Separator orientation="vertical" />
              <NodeSelector open={openNode} onOpenChange={setOpenNode} />

              <Separator orientation="vertical" />
              <LinkSelector open={openLink} onOpenChange={setOpenLink} />

              <Separator orientation="vertical" />
              <MathSelector />

              <Separator orientation="vertical" />
              <TextAlignmentButtons />

              <Separator orientation="vertical" />
              <TextButtons />

              <Separator orientation="vertical" />
              <ColorSelector open={openColor} onOpenChange={setOpenColor} />
            </EditorMenu>
          </EditorContent>
        </EditorRoot>
      </CardContent>
    </Card>
  );
}
