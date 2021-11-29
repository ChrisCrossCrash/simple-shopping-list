import styles from './CategoryMenu.module.scss'
import { categoryColors, ColorCategory } from '../../types'

type CategoryMenuProps = {
  setCategory: (category: ColorCategory) => void
}

export const CategoryMenu = (props: CategoryMenuProps) => (
  <div className={styles.base}>
    {Object.entries(categoryColors).map((category) => (
      <button
        key={category[0]}
        className={styles.categoryBtn}
        style={{ backgroundColor: category[1] }}
        type='button'
        onClick={(event) => {
          event.preventDefault()
          props.setCategory(category[0] as ColorCategory)
        }}
      />
    ))}
  </div>
)
