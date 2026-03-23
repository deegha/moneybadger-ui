"use client";
import { Button, HeaderBar, NewCategoryModal } from "@/components";
import { useState } from "react";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <HeaderBar
        title="Categories"
        actionButton={
          <Button onClick={() => setIsModalOpen(true)}>New Category</Button>
        }
      />
      <div>
        <NewCategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
}
