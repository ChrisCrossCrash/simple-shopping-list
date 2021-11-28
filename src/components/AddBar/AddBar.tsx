import { useState } from 'react'
import { ColorCategory, ItemObject } from '../../types'
import styles from './AddBar.module.scss'
import { useSetItems } from '../../ItemsContext'

type AddBarProps = {}

export const AddBar = (props: AddBarProps) => {
  const setItems = useSetItems()

  const [currentCategory, setCurrentCategory] = useState<ColorCategory>('red')
  const [newItem, setNewItem] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNewItem('') // Clear the input
    setItems((prevItems: ItemObject[]) => {
      // Guard against dujplicate or emptyitems
      if (prevItems.find((item) => item.name === newItem) || !newItem) {
        return prevItems
      }

      return [
        ...prevItems,
        {
          name: newItem,
          category: currentCategory,
          crossedOff: false,
        },
      ]
    })
  }

  return (
    <form className={styles.base} onSubmit={handleSubmit}>
      <input
        type='text'
        className={styles.input}
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        className={styles.addBtn}
        style={{ backgroundColor: currentCategory }}
        type='submit'
      >
        Add
      </button>
    </form>
  )
}
