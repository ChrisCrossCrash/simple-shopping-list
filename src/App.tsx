import { AddBar } from './components/AddBar/AddBar'
import { ItemList } from './components/ItemList/ItemList'
import styles from './App.module.scss'

const App = () => (
  <div className={styles.app}>
    <div className={styles.content}>
      <AddBar />
      <ItemList />
    </div>
  </div>
)

export default App
