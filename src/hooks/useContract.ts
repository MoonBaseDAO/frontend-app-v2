
export const useContract = (factoryContract: any) => {

  const getDaoList = async (start: number, limit: number) => {
    if (!factoryContract) return [];

    const daos = await factoryContract.get_daos({ from_index: start, limit: limit });
    return daos;
  }

  const getDaoCount = async () => {
    if (!factoryContract) return 0;

    const daoCount = await factoryContract.get_number_daos();
    return daoCount;
  }

  return [getDaoList, getDaoCount];
}