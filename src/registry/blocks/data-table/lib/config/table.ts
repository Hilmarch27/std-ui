export type DataTableConfig = typeof dataTableConfig

export const dataTableConfig = {
  filterVariants: [
    'text',
    'number',
    'range',
    'date',
    'dateRange',
    'boolean',
    'select',
    'multiSelect',
    'combobox',
    'password'
  ] as const
}

export function validateEditableProps<TData>(
  isEditable: boolean,
  props: {
    setData?: React.Dispatch<React.SetStateAction<TData[]>>
    updateRow?: (id: string, payload: TData) => void
    createRow?: (payload: TData) => void
    removeRow?: (id: string) => void
    fieldRow?: Partial<TData>
    originalData?: TData[]
  }
) {
  const { setData, updateRow, createRow, removeRow, fieldRow, originalData } = props

  const editablePropsProvided = setData || updateRow || createRow || removeRow || fieldRow || originalData

  if (!isEditable && editablePropsProvided) {
    throw new Error(
      '[useServerTable] You provided editable-related props without setting isEditable={true}. Please set isEditable or remove editable props.'
    )
  }

  if (isEditable) {
    const missingProps: string[] = []
    if (!setData) missingProps.push('setData')
    if (!updateRow) missingProps.push('updateRow')
    if (!createRow) missingProps.push('createRow')
    if (!removeRow) missingProps.push('removeRow')
    if (!fieldRow) missingProps.push('fieldRow')
    if (!originalData) missingProps.push('originalData')

    if (missingProps.length > 0) {
      throw new Error(`[useServerTable] Missing required props for editable mode: ${missingProps.join(', ')}`)
    }
  }
}
