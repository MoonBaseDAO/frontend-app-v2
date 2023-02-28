import { LineChart } from "@/components/myorg/lineChart";
import { cardData } from "@/components/myorg/cardData";
import { InfoCard } from "@/components/myorg/infoCard";
import { DiscussionTable } from "@/components/myorg/discussionTable";
import { Topbar } from "@/layouts/topbar";

const Discover = () => {
  return (
    <>
      <Topbar title="My Organization"/>
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