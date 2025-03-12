// import TABLE_USER from "./_comp/table-users";

import USER_FORM from "./_comp/user-form";

export default async function Home() {
  return (
    <main className="px-8 flex min-h-screen flex-col items-center justify-center bg-background">
      {/* <TABLE_USER /> */}
      <USER_FORM />
    </main>
  );
}
