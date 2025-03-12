import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { ComboboxField, SubscribeButton, TextField } from "@/registry/form/extension/form";

// ? this is context form
export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

// ? this is hook form
export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    ComboboxField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});