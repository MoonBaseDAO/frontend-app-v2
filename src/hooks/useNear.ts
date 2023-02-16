import { initSDK, wallet, signOut, signIn } from "@/near-api/near";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

export const useNear = (): [boolean, boolean, string | null, (type: string) => void]  => {
  const router = useRouter();
  const [isPending, setPending] = useState<boolean>(false);
  const [isConnected, setConnected] = useState<boolean>(false);
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    initSDK();

    if (wallet?.getAccountId()) {
      setConnected(true);
      setAccountId(wallet?.getAccountId());
    }
  }, [wallet]);

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

  return [isConnected, isPending, accountId, handleConnect];
}