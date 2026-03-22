"use client";
import { Button, HeaderBar, NewTransactionModal } from "@/components";
import { useState } from "react";

export function Header() {
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
  return (
    <>
      <HeaderBar
        title="Dashboard"
        actionButton={
          <Button onClick={() => setIsNewTransactionOpen(true)}>
            New Transaction
          </Button>
        }
      />
      <div className="p-10 md:p-16">
        <NewTransactionModal
          isOpen={isNewTransactionOpen}
          onClose={() => setIsNewTransactionOpen(false)}
        />
      </div>
    </>
  );
}
