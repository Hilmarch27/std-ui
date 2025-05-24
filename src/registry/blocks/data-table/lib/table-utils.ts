import { SortingState } from "@tanstack/react-table"

// Ubah fungsi untuk selalu mengembalikan string atau null (tidak undefined)
export const stateToSortBy = (sorting: SortingState | undefined): string | null => {
    if (!sorting || sorting.length === 0) return null

    const sort = sorting[0]

    return sort ? `${sort.id}.${sort.desc ? 'desc' : 'asc'}` : null
}

// Pastikan fungsi ini menangani string | null dengan baik
export const sortByToState = (sortBy: string | null): SortingState => {
  if (!sortBy) return []

  const parts = sortBy.split('.')
  if (parts.length !== 2) return []
  
  const [id, direction] = parts
  // Pastikan id tidak undefined
  if (!id) return []
  
  return [{ id, desc: direction === 'desc' }]
}