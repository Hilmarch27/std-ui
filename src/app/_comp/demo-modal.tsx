"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/registry/hooks/use-modal";

const ModalDemo = () => {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal("Modal title", <p>Modal content</p>);
  };

  return (
    <>
      <Button onClick={handleClick}>Open</Button>
    </>
  );
};

export default ModalDemo;
