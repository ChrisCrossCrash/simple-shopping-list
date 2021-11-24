import styles from './CategoryMenu.module.scss'
import { categoryColors } from '../../types'

type CategoryMenuProps = {}

export const CategoryMenu = (props: CategoryMenuProps) => {
  return (
    <div className={styles.base}>
      {Object.entries(categoryColors).map((category) => (
        <button
          className={styles.categoryBtn}
          style={{ backgroundColor: category[1] }}
          type='button'
          // TODO: Set the category when the button is clicked.
          // onClick={() => props.setCategory(category[0])}
        />
      ))}
    </div>
  )
}
