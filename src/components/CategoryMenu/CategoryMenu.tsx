import styles from './CategoryMenu.module.scss'
import { ColorCategory } from '../../categories'
import { colorCategories } from '../../categories'
import { SetStateFn } from '../../types'

type CategoryMenuProps = {
  setCategory: (category: ColorCategory) => void
  style?: React.CSSProperties
  className?: string
  setIsShowingCategoryMenu: SetStateFn<boolean>
}

export const CategoryMenu = (props: CategoryMenuProps) => (
  <div
    className={styles.base}
    // Prevent clicks in the menu from bubbling up to the Item element,
    // which would cause the Item to crossed off.
    onClick={(event) => event.stopPropagation()}
  >
    {/* This overlay element allows users to "click out" of the menu */}
    <div
      className={styles.overlay}
      onClick={() => props.setIsShowingCategoryMenu(false)}
      data-cy='category-menu-overlay'
    />
    <div
      className={`${styles.menu} ${props.className}`}
      data-cy='category-menu'
      style={props.style}
    >
      {colorCategories.map((category) => (
        <button
          key={category}
          className={`${styles.categoryBtn} category-${category}`}
          type='button'
          onClick={(event) => {
            event.preventDefault()
            props.setCategory(category)
          }}
          data-cy={`category-btn-${category}`}
        />
      ))}
    </div>
  </div>
)
