import { Header } from "./header";
import { Summary } from "./summary";
import { SpendingChart } from "./spendingChart";
import { BalanceCard } from "./balanceComponent";
import { InnerContainer } from "@/components";
import { CategoriesChart } from "./categoriesChart";
import { RecentTransactions } from "./recentTransactions";

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full ">
      <Header />
      <InnerContainer>
        <div className="flex gap-5 justify-between">
          <div className="w-full flex-3 gap-5 flex flex-col">
            <Summary />
            <SpendingChart />
            <RecentTransactions />
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <BalanceCard />
            <CategoriesChart />
          </div>
        </div>
      </InnerContainer>
    </div>
  );
}
