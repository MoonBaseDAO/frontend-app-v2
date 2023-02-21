import { LineChart } from "@/components/myorg/lineChart";
import { cardData } from "@/components/myorg/cardData";
import { InfoCard } from "@/components/myorg/infoCard";
import { DiscussionTable } from "@/components/myorg/discussionTable";

const Discover = () => {
  return (
    <>
      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">My Organization</h1>
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            className="sm:order-0 order-1 ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-0"
          >
            Share
          </button>
          <button
            type="button"
            className="order-0 inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
          >
            Create
          </button>
        </div>
      </div>
      <div className="w-[900px] p-6">
        <LineChart />
      </div>
      <div className="p-6 grid grid-cols-4 gap-2">
        {cardData.map((cardInfo) => (
          <div className="mr-1">
            <InfoCard title={cardInfo.title} counts={cardInfo.counts} percentage={cardInfo.percentage} />
          </div>
        ))}
      </div>
      <DiscussionTable />
    </>
  );
}

export default Discover;