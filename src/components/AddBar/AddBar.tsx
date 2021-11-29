import { useState } from 'react'
import { ColorCategory, ItemObject } from '../../types'
import styles from './AddBar.module.scss'
import { useSetItems } from '../../ItemsContext'
import { CategoryMenu } from '../CategoryMenu/CategoryMenu'
import ClickNHold from 'react-click-n-hold'

type AddBarProps = {}

export const AddBar = (props: AddBarProps) => {
  const setItems = useSetItems()

  const [currentCategory, setCurrentCategory] = useState<ColorCategory>('red')
  const [newItem, setNewItem] = useState('')
  const [isShowingCategoryMenu, setIsShowingCategoryMenu] = useState(false)

  /** Submit the item in the input. If `category` is undefined, then the item will be submitted with `currentCategory` */
  const submitNewItem = (category?: ColorCategory) =>
    setItems((prevItems: ItemObject[]) => {
      // Guard against duplicate or empty items
      if (prevItems.find((item) => item.name === newItem) || !newItem) {
        return prevItems
      }

      return [
        ...prevItems,
        {
          name: newItem,
          category: category ? category : currentCategory,
          crossedOff: false,
        },
      ]
    })

  /** Handle the user submitting the newItem. Click-n-hold events also count as submission, so we must handle them here. */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Guard against submission if the event was from a click-n-hold
    if (isShowingCategoryMenu) return

    setNewItem('') // Clear the input
    submitNewItem()
  }

  /** Handle the category being selected within `CategoryMenu` */
  const handleCategorySelect = (category: ColorCategory) => {
    setIsShowingCategoryMenu(false)
    setNewItem('')
    setCurrentCategory(category)
    // We must pass the category to `submitNewItem`, since `currentCategory` is only
    // queued up to be updated by `setCurrentCategory`, but still has the old value.
    submitNewItem(category)
  }

  /** Show the category menu after the user holds the menu for a certain amount of time. */
  const handleClickNHold = () => {
    setIsShowingCategoryMenu(true)
  }

  return (
    <form className={styles.base} onSubmit={handleSubmit}>
      <input
        type='text'
        className={styles.input}
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />

      <ClickNHold time={1} onClickNHold={handleClickNHold}>
        <button
          className={styles.addBtn}
          style={{ backgroundColor: currentCategory }}
          type='submit'
        >
          Add
        </button>
      </ClickNHold>

      {isShowingCategoryMenu && (
        <CategoryMenu setCategory={handleCategorySelect} />
      )}
    </form>
  )
}
