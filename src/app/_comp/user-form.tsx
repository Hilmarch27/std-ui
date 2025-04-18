'use client'

import { Form } from '@/registry/form/ui/form'
import { useAppForm } from '@/registry/form/hooks/use-form'
import React from 'react'
import { z } from 'zod'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'

const OptLastName = [
  {
    value: 'abdoel',
    label: 'Abdoel'
  },
  {
    value: 'hilman',
    label: 'Hilman'
  }
]

const OptRole = [
  {
    value: 'admin',
    label: 'Admin'
  },
  {
    value: 'user',
    label: 'User'
  }
]

const SchemaForm = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 characters'),
  lastName: z.string().min(1, 'Last name must be at least 1 characters'),
  address: z.string().min(1, 'Address must be at least 1 characters'),
  numberCard: z.string().min(1, 'Number Card must be at least 1 characters'),
  role: z.enum(['admin', 'user']),
  money: z.number().min(1, 'Money must be at least 1')
})

function USER_FORM() {
  const form = useAppForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      numberCard: '',
      role: 'user',
      money: 0
    },
    validators: {
      onChange: SchemaForm
    },
    onSubmit: async ({ value }) => {
      toast.message(
        <pre className="w-full rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(value, null, 2)}</code>
        </pre>
      )
    }
  })

  return (
    <div className="flex items-center justify-center w-full">
      <Card className="w-full max-w-sm">
        <CardContent>
          <Form className="max-w-xs" onSubmit={form.handleSubmit}>
            <form.AppField name="firstName" children={(field) => <field.TextField label="First Name" />} />
            <form.AppField
              name="lastName"
              children={(field) => <field.ComboboxField label="last Name" options={OptLastName} />}
            />
            <form.AppField name="money" children={(field) => <field.IDRField label="Money" />} />
            <form.AppField name="address" children={(field) => <field.TextFloatingField label="Address" />} />
            <form.AppField name="numberCard" children={(field) => <field.TextNumberField label="Number Card" />} />
            <form.AppField name="role" children={(field) => <field.SelectField label="Role" options={OptRole} />} />
            <form.AppForm>
              <form.SubscribeButton label="Submit" />
            </form.AppForm>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default USER_FORM
