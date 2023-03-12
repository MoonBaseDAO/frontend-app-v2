
export const useDaoContract = (daoContract: any) => {
  const getDaoConfig = async () => {
    if (!daoContract) return {};
    const config = await daoContract.get_config();
    return config;
  }
  return [getDaoConfig];
}