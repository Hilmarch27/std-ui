import TABLE_USER from "./_comp/table-users";

export default async function Home() {
  return (
    <main className="px-8 flex min-h-screen flex-col items-center justify-center bg-background">
      <TABLE_USER />
    </main>
  );
}
