import { ColorCategory } from './categories'

export type ItemObject = {
  name: string
  category: ColorCategory
  crossedOff: boolean
}

export type SetStateFn<T> = React.Dispatch<React.SetStateAction<T>>
