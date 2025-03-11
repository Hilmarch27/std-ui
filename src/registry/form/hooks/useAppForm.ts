import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { TextField } from "../extension/input-form";
import { SubscribeButton } from "../extension/button-form";

// export useFieldContext for use in your custom components

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});