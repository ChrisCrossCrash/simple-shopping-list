import { useState } from 'react'
import type { ItemObject, ColorCategory } from '../../types'
import { CategoryMenu } from '../CategoryMenu/CategoryMenu'
import styles from './Item.module.scss'
import { useSetItems } from '../../ItemsContext'

type ItemProps = {
  item: ItemObject
}

export const Item = (props: ItemProps) => {
  const setItems = useSetItems()
  const [isShowingCategoryMenu, setIsShowingCategoryMenu] = useState(false)

  let baseStyle = styles.base
  if (props.item.crossedOff) {
    baseStyle += ` ${styles.baseCrossedOff}`
  }

  /** Change the category for the item and close the CategoryMenu. */
  const setCategory = (category: ColorCategory): void => {
    setItems((oldItems) => {
      const newItems = oldItems.map((item) => {
        if (item.name === props.item.name) {
          return {
            ...item,
            category,
          }
        }
        return item
      })
      return newItems
    })
    setIsShowingCategoryMenu(false)
  }

  const toggleCrossedOff = () => {
    setItems((oldItems) => {
      const newItems = oldItems.map((item) => {
        if (item.name === props.item.name) {
          return {
            ...item,
            crossedOff: !item.crossedOff,
          }
        }
        return item
      })
      return newItems
    })
  }

  return (
    <div className={baseStyle}>
      <div className={styles.label} onClick={toggleCrossedOff}>
        {props.item.name}
      </div>

      {/* Change Category Button */}
      <button
        className={styles.categoryBtn}
        style={{ backgroundColor: props.item.category }}
        type='button'
        onClick={() => setIsShowingCategoryMenu(!isShowingCategoryMenu)}
      />

      {/* Remove Item Button */}
      <button
        type='button'
        onClick={() => {
          setItems((prevItems: ItemObject[]) =>
            prevItems.filter((item) => item.name !== props.item.name)
          )
        }}
      >
        x
      </button>
      {isShowingCategoryMenu && <CategoryMenu setCategory={setCategory} />}
    </div>
  )
}
