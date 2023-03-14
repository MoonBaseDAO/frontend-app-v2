import { Loading } from "@/components/loading";
import { useNear } from "@/hooks/useNear";
import { convertDuration, getDaoId } from "@/utils";
import { ClockIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
import { HandThumbDownIcon, HandThumbUpIcon, TrashIcon } from "@heroicons/react/24/outline";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const colors: {[key: string]: string} = {
  'Approved': 'green',
  'InProgress': 'blue',
  'Expired': 'red'
}

const DaoDetailPage: NextPage = () => {
  const router = useRouter();
  const addr: string = router.query.id as string;

  const { getDaoContract } = useNear();
  const [daoConfig, setDaoConfig] = useState<any>(null);
  const [daoProposals, setDaoProposals] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);

  const getInfos = async () => {
    if (!addr || daoConfig != null) return;
    const contract = getDaoContract(addr);
    const config = await contract.get_config();
    const proposals = await contract.get_proposals({ from_index: 0, limit: 100 });
    const sorted_proposals = proposals.sort((a: any, b: any) => b.submission_time - a.submission_time);
    setDaoConfig(config);
    setDaoProposals(sorted_proposals);
    setLoading(false);
  }

  useEffect(() => {
    getInfos();
  }, [getDaoContract])

  return (
    <>
      {isLoading && <Loading/>}
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
                                    <p className="text-sm text-gray-900 flex items-center mb-2">
                                      <ClockIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                                      <span>Applied on </span>
                                      <time>{convertDuration(proposal.submission_time as number).toDateString()}</time>
                                      <time>{convertDuration(proposal.submission_time as number).toLocaleTimeString()}</time>
                                    </p>
                                    <span className={`inline-flex uppercase items-center rounded-md bg-${colors[proposal.status]}-100 px-2.5 py-0.5 text-sm font-medium text-${colors[proposal.status]}-800`}>
                                      {proposal.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="min-w-0 px-4 md:grid md:grid-cols-1">
                                <div className="flex items-center space-x-5">
                                  <div className="flex items-center space-x-2">
                                    <HandThumbUpIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                                    <span>{proposal.vote_counts.council && proposal.vote_counts.council[0] ? proposal.vote_counts?.council[0]: 0}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <TrashIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                                    <span>{proposal.vote_counts.council && proposal.vote_counts.council[1] ? proposal.vote_counts?.council[1]: 0}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <HandThumbDownIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                                    <span>{proposal.vote_counts.council && proposal.vote_counts.council[2] ? proposal.vote_counts?.council[2]: 0}</span>
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