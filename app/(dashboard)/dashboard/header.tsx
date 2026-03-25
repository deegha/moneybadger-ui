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
      <div>
        <NewTransactionModal
          isOpen={isNewTransactionOpen}
          onClose={() => setIsNewTransactionOpen(false)}
        />
      </div>
    </>
  );
}
