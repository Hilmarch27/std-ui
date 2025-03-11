import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { ComboboxField, SubscribeButton, TextField } from "@/registry/form/extension/form";


export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

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