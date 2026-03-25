import { Header } from "./header";
import { Summary } from "./summary";
import { SpendingChart } from "./spendingChart";
import { BalanceCard } from "./balanceComponent";
import { InnerContainer } from "@/components";

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full ">
      <Header />
      <InnerContainer>
        <div className="flex gap-5 justify-between">
          <div className="w-full flex-3 gap-5 flex flex-col">
            <Summary />
            <SpendingChart />
          </div>
          <div className="flex-1">
            <BalanceCard />
          </div>
        </div>
      </InnerContainer>
    </div>
  );
}
