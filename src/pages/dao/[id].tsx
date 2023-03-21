import { AddProposalModal } from "@/components/discover/add-proposal-modal";
import { Loading } from "@/components/loading";
import { useNear } from "@/hooks/useNear";
import { convertDuration, getDaoId, getUserAvatarId } from "@/utils";
import { ArrowLeftCircleIcon, ClockIcon, EnvelopeIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { HandThumbDownIcon, HandThumbUpIcon, TrashIcon } from "@heroicons/react/24/outline";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const colors: { [key: string]: string } = {
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
  const [daoPolicy, setDaoPolicy] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const getInfos = async () => {
    if (!addr || daoConfig != null) return;
    const contract = getDaoContract(addr);
    const config = await contract.get_config();
    const proposals = await contract.get_proposals({ from_index: 0, limit: 100 });
    const policy = await contract.get_policy();
    const sorted_proposals = proposals.sort((a: any, b: any) => b.submission_time - a.submission_time);
    setDaoConfig(config);
    setDaoPolicy(policy);
    setDaoProposals(sorted_proposals);
    setLoading(false);
  }

  useEffect(() => {
    getInfos();
  }, [getDaoContract])

  const handleBack = () => {
    router.push('/discover');
  }

  return (
    <>
      {isLoading && <Loading />}
      <div className="overflow-hidden bg-white">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between">
            <div className="flex items-center">
              <button type="button" className="mr-4" onClick={handleBack}>
                <ArrowLeftCircleIcon className="text-indigo-600 h-8 w-8" aria-hidden="true"/>
              </button>
              <div className="flex flex-col">
                <h3 className="text-base font-semibold leading-6 text-gray-900">{getDaoId(addr)}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{addr}</p>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => setModalOpen(true)}
            >
              Add Proposal
              <PlusCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
            </button>
          </div>
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
              <dt className="text-sm font-medium text-gray-500">Council</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-11 sm:mt-0">
                {daoPolicy?.roles[1]?.kind?.Group?.map((council: string) => 
                  <span key={council} className={`rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 mr-2`}>
                    {council}
                  </span>
                )}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-12 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Proposals</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-11 sm:mt-0">
                <div className="overflow-hidden bg-white shadow sm:rounded-md">
                  <ul role="list" className="divide-y divide-gray-200">
                    {daoProposals?.map((proposal: any, index: number) => (
                      <li key={proposal?.id}>
                        <a href={'#'} className="block hover:bg-gray-50">
                          <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="flex min-w-0 flex-1 items-center">
                              <div className="flex-shrink-0">
                                <img
                                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                                  src={`https://randomuser.me/api/portraits/men/${getUserAvatarId(proposal.proposer)}.jpg`}
                                  alt=""
                                />
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
                                      <ClockIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                      <span>Applied on &nbsp;</span>
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
                                    <HandThumbUpIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    <span>{proposal.vote_counts.council && proposal.vote_counts.council[0] ? proposal.vote_counts?.council[0] : 0}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <TrashIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    <span>{proposal.vote_counts.council && proposal.vote_counts.council[1] ? proposal.vote_counts?.council[1] : 0}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <HandThumbDownIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    <span>{proposal.vote_counts.council && proposal.vote_counts.council[2] ? proposal.vote_counts?.council[2] : 0}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <span className="bg-green-100 text-green-800"></span>
                  <span className="bg-blue-100 text-blue-800"></span>
                  <span className="bg-red-100 text-red-800"></span>
                  <AddProposalModal proposalBond={daoPolicy?.proposal_bond} addr={addr} open={isModalOpen} setOpen={setModalOpen} />
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