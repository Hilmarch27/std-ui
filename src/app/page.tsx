import { SearchParams } from "nuqs";
import TABLE_USER from "./_comp/table-users";
import { searchParamsCache } from "@/registry/blocks/data-table/lib/schema/table";
// import { api } from "@/trpc/server";
// import USER_FORM from "./_comp/user-form";

type TSearchParams = Promise<SearchParams>;

export default async function Home(props: { searchParams: TSearchParams }) {
  const search = await props.searchParams;
  const query = searchParamsCache.parse(search);
  console.log("searchParams incik boss", query);
  // await api.users.getManyUsers(query);
  return (
    <main className="px-8 flex min-h-screen flex-col items-center justify-center bg-background">
      <TABLE_USER query={query} />
      {/* <USER_FORM /> */}
    </main>
  );
}
