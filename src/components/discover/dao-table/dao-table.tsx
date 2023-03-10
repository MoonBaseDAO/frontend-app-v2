import { useContract } from "@/hooks/useContract";
import { useNear } from "@/hooks/useNear";
import { getDaoId } from "@/utils";
import { ArchiveBoxIcon, FolderIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

const daoAvatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60";

export const DiscoverDaoTable = () => {
  const { factoryContract } = useNear();
  const [getDaoList] = useContract(factoryContract);
  const [daoList, setDaoList] = useState<any>([]);

  const fetchDaoList = async (start: number, limit: number) => {
    const list = await getDaoList(start, limit);
    setDaoList(list);
  }

  useEffect(() => {
    if (factoryContract)
      fetchDaoList(0, 100);
  }, [factoryContract])

  return (
    <div className="my-6 px-4 sm:px-6 lg:px-8">
      <ul role="list" className="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-4 lg:grid-cols-6">
        {daoList.map((daoAddr: string) => (
          <li key={daoAddr} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">{getDaoId(daoAddr)}</h3>
                  <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    DAO
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">{daoAddr}</p>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a
                    href={'#'}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <ArchiveBoxIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    View
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={`/dao/${daoAddr}`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <FolderIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    Select
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}