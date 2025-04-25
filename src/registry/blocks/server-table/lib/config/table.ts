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
