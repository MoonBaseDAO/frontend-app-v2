import { useContract } from "@/hooks/useContract";
import { useNear } from "@/hooks/useNear";
import { projects } from "@/mock/projects";
import { classNames } from "@/utils";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export const DiscoverDaoTable = () => {
  const { factoryContract } = useNear();
  const [ getDaoList ] = useContract(factoryContract);
  const [daoList, setDaoList] = useState<any>([]);

  const fetchDaoList = async (start: number, limit: number) => {
    const list = await getDaoList(start, limit);
    setDaoList(list);
  }

  useEffect(() => {
    if(factoryContract)
      fetchDaoList(0, 100);
  }, [factoryContract])

  return (
    <>
      <div className="mt-10 sm:hidden">
        <div className="px-4 sm:px-6">
          <h2 className="text-sm font-medium text-gray-900">Top Trending DAOs</h2>
        </div>
        <ul role="list" className="mt-3 divide-y divide-gray-100 border-t border-gray-200">
          {projects.map((project) => (
            <li key={project.id}>
              <a href="#" className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6">
                <span className="flex items-center space-x-3 truncate">
                  <span
                    className={classNames(project.bgColorClass, 'w-2.5 h-2.5 flex-shrink-0 rounded-full')}
                    aria-hidden="true"
                  />
                  <span className="truncate text-sm font-medium leading-6">
                    {project.title} <span className="truncate font-normal text-gray-500">in {project.team}</span>
                  </span>
                </span>
                <ChevronRightIcon
                  className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 hidden sm:block">
        <div className="inline-block min-w-full border-b border-gray-200 align-middle">
          <table className="min-w-full">
            <thead>
              <tr className="border-t border-gray-200">
                <th
                  className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  <span className="lg:pl-2">Top Trending DAOs</span>
                </th>
                <th
                  className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  Members
                </th>
                <th
                  className="hidden border-b border-gray-200 bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900 md:table-cell"
                  scope="col"
                >
                  Last updated
                </th>
                <th
                  className="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                  scope="col"
                />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                    <div className="flex items-center space-x-3 lg:pl-2">
                      <div
                        className={classNames(project.bgColorClass, 'flex-shrink-0 w-2.5 h-2.5 rounded-full')}
                        aria-hidden="true"
                      />
                      <a href="#" className="truncate hover:text-gray-600">
                        <span>
                          {project.title} <span className="font-normal text-gray-500">in {project.team}</span>
                        </span>
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-500">
                    <div className="flex items-center space-x-2">
                      <div className="flex flex-shrink-0 -space-x-1">
                        {project.members.map((member) => (
                          <img
                            key={member.handle}
                            className="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                            src={member.imageUrl}
                            alt={member.name}
                          />
                        ))}
                      </div>
                      {project.totalMembers > project.members.length ? (
                        <span className="flex-shrink-0 text-xs font-medium leading-5">
                          +{project.totalMembers - project.members.length}
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                    {project.lastUpdated}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                      Join
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>

  );
}