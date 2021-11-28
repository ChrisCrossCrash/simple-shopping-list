import { createContext, useContext, useState } from 'react'
import type { ItemObject, SetStateFn } from './types'
import { useLocalStorage } from './utils/useLocalStorage'

// FIXME: The following not-null assertions should be eliminated.
//  https://github.com/typescript-cheatsheets/react#extended-example
const SetItemsContext = createContext<SetStateFn<ItemObject[]>>(null!)
const ItemsContext = createContext<ItemObject[]>([])

export const useItems = () => useContext(ItemsContext)
export const useSetItems = () => useContext(SetItemsContext)

type ItemsProviderProps = {
  children: React.ReactNode
}

export const ItemsProvider = ({ children }: ItemsProviderProps) => {
  const [items, setItems] = useLocalStorage<ItemObject[]>('items', [])

  return (
    <ItemsContext.Provider value={items}>
      <SetItemsContext.Provider value={setItems}>
        {children}
      </SetItemsContext.Provider>
    </ItemsContext.Provider>
  )
}
