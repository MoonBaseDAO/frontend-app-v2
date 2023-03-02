import { Contract } from "near-api-js";
import { useRef } from "react";

export const useContract = (factoryContract: any) => {

  const getDaoList = async (start: number, limit: number) => {
    if(!factoryContract) return [];

    const daos = await factoryContract.get_daos({ from_index: start, limit: limit });
    return daos;
  }

  return [getDaoList];
}