"use client";

import { Form } from "@/registry/form/extension/form";
import { useAppForm } from "@/registry/form/hooks/use-form";
import React from "react";
import { z } from "zod";

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

const SchemaForm = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(1, "Last name must be at least 1 characters"),
});

function USER_FORM() {
  const form = useAppForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    validators: {
      onChange: SchemaForm,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <Form className="max-w-xs" onSubmit={form.handleSubmit}>
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
    </Form>
  );
}

export default USER_FORM;
