import { DocsSidebarNav } from "@/components/layouts/DocsSidebarNav";
import { docsConfig } from "@/lib/configs/docs-config";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="border-b max-w-screen-2xl mx-auto pt-16">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block border-r-2">
          <div className="h-full pr-6 py-6 lg:py-8 overflow-y-auto">
            <DocsSidebarNav config={docsConfig} />
          </div>
        </aside>
        {children}
      </div>
    </div>
  );
}
