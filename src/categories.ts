export const colorCategories = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
] as const

export type ColorCategory = typeof colorCategories[number]
