import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/registry/block/sidebar/app-sidebar";
import { cookies } from "next/headers";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default async function DocsLayout({ children }: DocsLayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value !== "false";
  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </>
  );
}
