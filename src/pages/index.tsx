import useApi from '@/hooks/useApi';

export default function Home() {
  const url = "http://moonbase.info.gf:3001/v1/messages";
  const { loading, data } = useApi(url);
  if (loading) return <h1>Loading</h1>;
  return (
    <div>
      <h1>Data fetched successfully.</h1>
      {JSON.stringify(data)}
    </div>
  );
}