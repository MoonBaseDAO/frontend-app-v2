import Board from "@/components/tasks/board";
import { Topbar } from "@/layouts/topbar";

export default function Home() {
  return (
    <>
      <Topbar title="Tasks" />
      <div className="p-5">
        <Board />
      </div>
    </>
  );
}