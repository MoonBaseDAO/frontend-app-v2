import { DiscoverCategories } from "@/components/discover/categories/categories";
import { DiscoverDaoTable } from "@/components/discover/dao-table";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const Discover = () => {
  return (
    <>
      <Topbar title="Discover" />
      <div className="py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <form className="flex w-full md:ml-0" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
              <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="search-field"
              name="search-field"
              className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
              placeholder="Search"
              type="search" />
          </div>
        </form>
      </div>
      <DiscoverCategories />
      <DiscoverDaoTable />
    </>
  );
}

export default Discover;