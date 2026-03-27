import { Header } from "./header";
import { CategoryGrid } from "./categoryGrid";
import { InnerContainer } from "@/components";

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full ">
      <Header />

      <InnerContainer>
        <CategoryGrid />
      </InnerContainer>
    </div>
  );
}
