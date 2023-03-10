import Board from "@/components/tasks/board";
import { Topbar } from "@/layouts/topbar";
import { NextPage } from "next";
import { useRouter } from "next/router";

const DaoDetailPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;
  return (
    <>
      <div className="p-5">
        {id}
      </div>
    </>
  );
}

export default DaoDetailPage;