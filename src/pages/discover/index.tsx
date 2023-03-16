import { DiscoverCategories } from "@/components/discover/categories/categories";
import { DiscoverDaoTable } from "@/components/discover/dao-table";
import { Topbar } from "@/layouts/topbar";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const Discover = () => {
  return (
    <>
      <Topbar title="Discover" />
      <DiscoverDaoTable />
    </>
  );
}

export default Discover;