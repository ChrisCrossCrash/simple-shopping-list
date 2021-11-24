import { AddBar } from './components/AddBar/AddBar'
import { ItemList } from './components/ItemList/ItemList'
import styles from './App.module.scss'
import { useLocalStorage } from './utils/useLocalStorage'
import type { ItemObject } from './types'

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <AddBar />
        <ItemList />
      </div>
    </div>
  )
}

export default App
