import styles from './CategoryMenu.module.scss'
import { ColorCategory } from '../../categories'
import { colorCategories } from '../../categories'

type CategoryMenuProps = {
  setCategory: (category: ColorCategory) => void
  style?: React.CSSProperties
  className?: string
}

export const CategoryMenu = (props: CategoryMenuProps) => (
  <div
    className={`${styles.base} ${props.className}`}
    data-cy='category-menu'
    style={props.style}
    // Prevent clicks in the menu from bubbling up to the Item element,
    // which would cause the Item to crossed off.
    onClick={(event) => event.stopPropagation()}
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
)
