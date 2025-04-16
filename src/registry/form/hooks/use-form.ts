import { createFormHookContexts, createFormHook } from '@tanstack/react-form'
import { ComboboxField, IDRField, SubscribeButton, TextField } from '@/registry/form/ui/form'

// ? this is context form
export const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts()

// ? this is hook form
export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    ComboboxField,
    IDRField
  },
  formComponents: {
    SubscribeButton
  },
  fieldContext,
  formContext
})
