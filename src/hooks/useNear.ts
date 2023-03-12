import { getConfig } from "@/config/near";
import { initSDK, wallet, signOut, signIn } from "@/near-api/near";
import { Contract } from "near-api-js";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    accountId: string;
    factoryContract: any;
  }
}

const nearConfig = getConfig(process.env.NODE_ENV || 'development');

interface NearHookInterface {
  factoryContract: any
  isConnected: boolean
  isPending: boolean
  accountId: string | null,
  getDaoContract: (addr: string) => any
  handleConnect: (type: string) => void
}

export const useNear = (): NearHookInterface => {
  const router = useRouter();
  const [isPending, setPending] = useState<boolean>(false);
  const [isConnected, setConnected] = useState<boolean>(false);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [factoryContract, setFactoryContract] = useState<any>(null);
  const [daoContract, setDaoContract] = useState<any>(null);

  useEffect(() => {
    initSDK();
    if (wallet?.getAccountId()) {
      setConnected(true);
      setAccountId(wallet?.getAccountId());
      initContracts();
    }
  }, []);

  const initContracts = async () => {
    if (!wallet?.getAccountId) return;

    const contract = await new Contract(
      wallet?.account(),
      nearConfig.contractName,
      {
        viewMethods: ['get_dao_list', 'get_number_daos', 'get_daos'],
        changeMethods: ['create']
      }
    );

    setFactoryContract(contract);
  }

  const getDaoContract = (addr: string) => {
    if (!wallet?.getAccountId) return;

    const daoContract = new Contract(wallet?.account(), addr, {
      viewMethods: [
        'get_config',
        'get_policy',
        'get_staking_contract',
        'get_available_amount',
        'delegation_total_supply',
        'get_proposals',
        'get_last_proposal_id',
        'get_proposal',
        'get_bounty',
        'get_bounties',
        'get_last_bounty_id',
        'get_bounty_claims',
        'get_bounty_number_of_claims',
        'delegation_balance_of',
        'has_blob'
      ],
      changeMethods: ['add_proposal', 'act_proposal']
    });
    return daoContract;
  }

  const connectWithNear = async () => {
    if (isConnected) {
      await signOut();
      setConnected(false);
      setAccountId(null);
      router.replace('/');
    }
    else {
      await signIn();
      setPending(true);
    }
  }

  const handleConnect = (key: any) => {
    const keyString = key as string;
    if (keyString == "Near")
      connectWithNear();
  }

  return { factoryContract, isConnected, isPending, accountId, handleConnect, getDaoContract };
}