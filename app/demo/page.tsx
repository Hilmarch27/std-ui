'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { InputForm } from "@/registry/ui/input-form";

function Index() {
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: any) => {
    toast.success(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputForm fields="name" form={form} placeholder="Name" type="text" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Index;
