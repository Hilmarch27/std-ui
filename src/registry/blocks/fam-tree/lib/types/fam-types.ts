export type FamTreeTypes = {
  id: string
  name: string
  role: string
  profiles?: FamTreeTypes[]
  spouse?: {
    id: string
    name: string
    image?: string
  }
}

export type ExpandedState = {
  [key: string]: boolean
}
