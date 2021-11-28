export const categoryColors = {
  red: 'red',
  orange: 'orange',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',
  indigo: 'indigo',
  violet: 'violet',
}

export type ColorCategory = keyof typeof categoryColors

export type ItemObject = {
  name: string
  category: ColorCategory
  crossedOff: boolean
}

export type SetStateFn<T> = React.Dispatch<React.SetStateAction<T>>
