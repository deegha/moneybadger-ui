import { InnerContainer } from "@/components";
import { TransactionTable } from "./transactionsTable";
import { Header } from "./header";

export default function AddTransaction() {
  return (
    <div className="w-full">
      <Header />
      <InnerContainer>
        <TransactionTable />
      </InnerContainer>
    </div>
  );
}
