import { useState } from 'react'
import type { ItemObject } from '../../types'
import { CategoryMenu } from '../CategoryMenu/CategoryMenu'
import styles from './Item.module.scss'
import { useSetItems } from '../../ItemsContext'
import { ColorCategory } from '../../categories'
import { XIcon } from '@primer/octicons-react'

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
    <div className={baseStyle} data-cy='item' onClick={toggleCrossedOff}>
      {/* Change Category Button */}
      <button
        className={`${styles.categoryBtn} category-${props.item.category}`}
        type='button'
        onClick={(event) => {
          // Prevent the button from triggering the parent's onClick event,
          // which would cause the item to be crossed off.
          event.stopPropagation()
          setIsShowingCategoryMenu(!isShowingCategoryMenu)
        }}
        data-cy='item-category-btn'
      />

      <div className={styles.label} data-cy='item-label'>
        {props.item.name}
      </div>

      {/* Delete Item Button */}
      <button
        className={styles.deleteBtn}
        type='button'
        onClick={() => {
          setItems((prevItems: ItemObject[]) =>
            prevItems.filter((item) => item.name !== props.item.name)
          )
        }}
        data-cy='item-delete-btn'
      >
        <XIcon size={24} />
      </button>
      {isShowingCategoryMenu && (
        <CategoryMenu
          setCategory={setCategory}
          className={styles.categoryMenu}
        />
      )}
    </div>
  )
}
