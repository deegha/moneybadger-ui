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
      <div className="p-10 md:p-16">
        <NewCategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
}
