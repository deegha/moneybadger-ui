import { Header } from "./header";
import { CategoryGrid } from "./categoryGrid";

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full ">
      <Header />

      <div className="p-5">
        <CategoryGrid />
      </div>
    </div>
  );
}
