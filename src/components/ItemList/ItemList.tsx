import type { ItemObject } from '../../types'
import styles from './ItemList.module.scss'
import { Item } from '../Item/Item'

type itemListProps = {}

const TestItems: ItemObject[] = [
  {
    name: 'Milk',
    category: 'orange',
    crossedOff: false,
  },
  {
    name: 'Eggs',
    category: 'blue',
    crossedOff: false,
  },
  {
    name: 'Bread',
    category: 'violet',
    crossedOff: true,
  },
]

export const ItemList = (props: itemListProps) => {
  return (
    <div className={styles.base}>
      {TestItems.map((item) => (
        <Item item={item} />
      ))}
    </div>
  )
}
