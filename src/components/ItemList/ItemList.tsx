import styles from './ItemList.module.scss'
import { Item } from '../Item/Item'
import { useItems } from '../../ItemsContext'
import { ItemObject } from '../../types'
import { colorCategories } from '../../categories'

const sortItems = (items: ItemObject[]) => {
  let newItems = [...items]

  // sort by name
  newItems.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })

  // sort by category
  newItems.sort((a, b) => {
    const indexA = colorCategories.indexOf(a.category)
    const indexB = colorCategories.indexOf(b.category)
    return indexA - indexB
  })

  return newItems
}

export const ItemList = () => {
  const items = useItems()
  const sortedItems = sortItems(items)

  return (
    <div className={styles.base}>
      {sortedItems.map((item) => (
        <Item key={item.name} item={item} />
      ))}
    </div>
  )
}
