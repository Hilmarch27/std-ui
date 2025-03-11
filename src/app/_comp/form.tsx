"use client";

import { Form } from "@/registry/form/extension/form";
import { useAppForm } from "@/registry/form/hooks/use-form";
import React from "react";

const OptLastName = [
  {
    value: "abdoel",
    label: "Abdoel",
  },
  {
    value: "hilman",
    label: "Hilman",
  },
];

function FORM() {
  const form = useAppForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <Form onSubmit={form.handleSubmit}>
      <form.AppForm>
        <form.AppField
          name="firstName"
          children={(field) => <field.TextField label="First Name" />}
        />
        <form.AppField
          name="lastName"
          children={(field) => (
            <field.ComboboxField label="last Name" options={OptLastName} />
          )}
        />
        <form.AppForm>
          <form.SubscribeButton label="Submit" />
        </form.AppForm>
      </form.AppForm>
    </Form>
  );
}

export default FORM;
