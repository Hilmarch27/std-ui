"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { components } from "~/__registry__";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { CodeBlock } from "./code-block";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: keyof typeof components;
  // description?: string;
  hideCode?: boolean;
  align?: "start" | "center" | "end";
  shouldExpand?: boolean;
}

export function ComponentPreview({
  name,
  className,
  align = "center",
  shouldExpand = false,
  // description,
  hideCode = false,
  ...props
}: ComponentPreviewProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const files = components[name].files;

  const Preview = React.useMemo(() => {
    const Component = components[name].component;

    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name]);

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          {!hideCode && (
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                  <TabsTrigger
                value="preview"
                className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Preview
              </TabsTrigger>
              {files.map((file) => {
                return (
                  <TabsTrigger
                    key={file.path}
                    value={file.path}
                    className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    {file.path.split("/").pop()}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          )}
        </div>
        <TabsContent
          value="preview"
          className={cn(
            !isExpanded && "h-[400px] overflow-hidden",
            "relative rounded-md border "
          )}
        >
          {shouldExpand && (
            <>
              {!isExpanded && (
                <div className="absolute bottom-0 right-0 left-0 w-full h-[200px] bg-gradient-to-t from-background to-transparent z-[19] pointer-events-none"></div>
              )}
              <Button
                variant="outline"
                className="absolute right-1/2 translate-x-1/2 bottom-5 z-[20]"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {!isExpanded ? "Expand" : "Collapse"}
              </Button>
            </>
          )}

          <div
            className={cn(
              "preview flex min-h-[350px] w-full justify-center p-10",
              {
                "items-center": align === "center",
                "items-start": align === "start",
                "items-end": align === "end",
              }
            )}
          >
            <React.Suspense
              fallback={
                <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              {Preview}
            </React.Suspense>
          </div>
        </TabsContent>
        {files.map((file) => (
          <TabsContent key={file.path} value={file.path}>
            <div className="flex flex-col space-y-4">
              <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
                <CodeBlock code={file.content} />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
