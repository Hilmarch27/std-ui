"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import Editor from "@/registry/block/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const defaultValue = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [],
    },
  ],
};

interface ContentFormProps {
  onSubmit: () => void;
  isPending: boolean;
}

export default function ContentForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState<string>("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const name = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    setSlug(name);
  }, [title]);

  async function handleSubmit() {
    // TODO: validate the data

    setPending(true);

    const result = { title, slug, content };
    console.log(result);
    setPending(false);
  }

  return (
    <div className="mt-6 flex w-full flex-col gap-4 px-2 h-full">
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>

      <Editor initialValue={defaultValue} onChange={setContent} />
      <Button className="mb-10" onClick={handleSubmit} disabled={pending}>
        {pending ? "Submitting..." : "Create"}
      </Button>
    </div>
  );
}
