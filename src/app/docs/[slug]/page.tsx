import { MDXContent } from "@/components/utils/mdxComponents";
import { documents } from "#site/content";
import { notFound } from "next/navigation";
import { DashboardTableOfContents } from "@/components/utils/toc";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PageProps = {
  params: any;
  searchParams?: any;
};

function getDocumentBySlug(slug: string) {
  return documents.find((document) => document.slug === slug);
}

export default async function Home({ params }: PageProps) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  if (!doc) return notFound();

  return (
    <div className="flex gap-3">
      <div className="mx-auto flex flex-col w-full min-w-0 py-6 lg:py-8 px-3">
        <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
          <div className="truncate">Docs</div>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <div className="text-foreground">{doc.title}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-3xl font-bold tracking-tight")}>
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-base text-muted-foreground">{doc.description}</p>
          )}
        </div>

        <div className="w-full mt-6">
          <MDXContent code={doc.content} />
        </div>
      </div>
      <div className="hidden text-sm xl:block py-6 lg:py-8">
        <div className="sticky top-20 h-[calc(100vh-3.5rem)]">
          <div className="h-full pb-10 overflow-auto">
            {doc.toc && <DashboardTableOfContents toc={doc.toc} />}
          </div>
        </div>
      </div>
    </div>
  );
}
