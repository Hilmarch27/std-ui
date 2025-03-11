"use client";

import { useAppForm } from "@/registry/form/hooks/useAppForm";
import React from "react";

function FORM() {
  const form = useAppForm({
    defaultValues: {
      firstName: "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  console.log(form.getFieldValue("firstName"));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <form.AppForm>
        <form.AppField
          name="firstName"
          children={(field) => <field.TextField label="First Name" />}
        />
        <form.SubscribeButton label="Submit" />
      </form.AppForm>
    </form>
  );
}

export default FORM;
