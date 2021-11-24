import { useLocalStorage } from '../../utils/useLocalStorage'
import { ColorCategory } from '../../types'
import styles from './AddBar.module.scss'
import { useState } from 'react'

type AddBarProps = {}

export const AddBar = (props: AddBarProps) => {
  const [currentCategory, setCurrentCategory] = useLocalStorage<ColorCategory>(
    'currentCategory',
    'red'
  )
  const [newItem, setNewItem] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: Add item to list.
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
