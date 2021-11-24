import { useState } from 'react'
import type { ItemObject } from '../../types'
import { CategoryMenu } from '../CategoryMenu/CategoryMenu'
import styles from './Item.module.scss'

type ItemProps = {
  item: ItemObject
}

export const Item = (props: ItemProps) => {
  const [isShowingCategoryMenu, setIsShowingCategoryMenu] = useState(false)

  let baseStyle = styles.base
  if (props.item.crossedOff) {
    baseStyle += ` ${styles.baseCrossedOff}`
  }

  return (
    <div className={baseStyle}>
      <div>{props.item.name}</div>
      <button
        className={styles.categoryBtn}
        style={{ backgroundColor: props.item.category }}
      />
      {isShowingCategoryMenu && <CategoryMenu />}
    </div>
  )
}
