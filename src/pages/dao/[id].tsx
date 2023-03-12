import { useDaoContract } from "@/hooks/useDaoContract";
import { useNear } from "@/hooks/useNear";
import { getDaoId } from "@/utils";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const applications = [
  {
    applicant: {
      name: 'Ricardo Cooper',
      email: 'ricardo.cooper@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Completed phone screening',
    href: '#',
  },
  {
    applicant: {
      name: 'Kristen Ramos',
      email: 'kristen.ramos@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Completed phone screening',
    href: '#',
  },
  {
    applicant: {
      name: 'Ted Fox',
      email: 'ted.fox@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Completed phone screening',
    href: '#',
  },
]

const DaoDetailPage: NextPage = () => {
  const router = useRouter();
  const addr: string = router.query.id as string;

  const { getDaoContract } = useNear();
  const [daoConfig, setDaoConfig] = useState<any>(null);
  const [daoProposals, setDaoProposals] = useState<any>(null);

  const getInfos = async () => {
    if (!addr || daoConfig != null) return;
    const contract = getDaoContract(addr);
    const config = await contract.get_config();
    const proposals = await contract.get_proposals({ from_index: 0, limit: 100 });
    console.log(proposals);
    setDaoConfig(config);
    setDaoProposals(proposals);
  }

  useEffect(() => {
    getInfos();
  }, [getDaoContract])

  return (
    <>
      <div className="overflow-hidden bg-white">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">{getDaoId(addr)}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{addr}</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-12 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-11 sm:mt-0">{daoConfig?.name}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-12 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Purpose</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-11 sm:mt-0">{daoConfig?.purpose}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-12 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Proposals</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-11 sm:mt-0">
                <div className="overflow-hidden bg-white shadow sm:rounded-md">
                  <ul role="list" className="divide-y divide-gray-200">
                    {daoProposals?.map((proposal: any) => (
                      <li key={proposal?.id}>
                        <a href={'#'} className="block hover:bg-gray-50">
                          <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="flex min-w-0 flex-1 items-center">
                              <div className="flex-shrink-0">
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-500">
                                  <span className="text-xs font-medium leading-none text-white">{proposal.proposer}</span>
                                </span>
                              </div>
                              <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                <div>
                                  <p className="truncate text-sm font-medium text-indigo-600">{proposal.proposer}</p>
                                  <p className="mt-2 flex items-center text-sm text-gray-500">
                                    <EnvelopeIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    <span className="truncate">{proposal.description}</span>
                                  </p>
                                </div>
                                <div className="hidden md:block">
                                  <div>
                                    <p className="text-sm text-gray-900">
                                      Applied on <time dateTime={proposal.submission_time}>{proposal.submission_time}</time>
                                    </p>
                                    <span className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                                      {proposal.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}

export default DaoDetailPage;