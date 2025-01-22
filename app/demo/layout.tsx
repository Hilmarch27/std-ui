interface DocsLayoutProps {
  children: React.ReactNode;
}

export default async function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="h-svh flex items-center justify-center">{children}</div>
  );
}
