import styles from './ItemList.module.scss'
import { Item } from '../Item/Item'
import { useItems } from '../../ItemsContext'

export const ItemList = () => {
  const items = useItems()
  return (
    <div className={styles.base}>
      {items.map((item) => (
        <Item item={item} />
      ))}
    </div>
  )
}
