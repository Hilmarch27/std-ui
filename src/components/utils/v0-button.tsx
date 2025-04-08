"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons/index";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const V0Button = ({ url }: { url: string }) => {
  const v0Url = `https://v0.dev/chat/api/open?url=${url}`;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="font-mono text-xs"
          asChild
        >
          <a href={v0Url} target="_blank" rel="noopener noreferrer">
            <Icons.V0Logo />
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Open in v0</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default V0Button;
