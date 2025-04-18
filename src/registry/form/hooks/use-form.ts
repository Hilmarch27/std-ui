import { createFormHookContexts, createFormHook } from '@tanstack/react-form'
import { ComboboxField, IDRField, SelectField, SubscribeButton, TextField, TextFloatingField, TextNumberField } from '@/registry/form/ui/form'

// ? this is context form
export const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts()

// ? this is hook form
export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    ComboboxField,
    IDRField,
    TextFloatingField,
    TextNumberField,
    SelectField
  },
  formComponents: {
    SubscribeButton
  },
  fieldContext,
  formContext
})
