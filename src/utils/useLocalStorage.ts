// https://gist.github.com/ChrisCrossCrash/ef8b6e9fe468bc8ee977c65cfb05e7a6

import * as React from 'react'
import { useEffect } from 'react'

type Jsonable =
  | null
  | boolean
  | number
  | string
  | Jsonable[]
  | { [prop: string]: Jsonable }

// FIXME: Calling `useLocalStorage()` in multiple places throughout the app causes problems,
//  since the different calls don't share the same state, but they do share the same local storage key.
//  Find a way to call `useLocalStorage()` anywhere in the app, have the state be shared.
export const useLocalStorage = <T extends Jsonable>(
  key: string,
  initialValue: T | (() => T)
) => {
  const [value, setValue] = React.useState(() => {
    // First, check if there is already a value for the provided key.
    const storedValue = localStorage.getItem(key)
    if (typeof storedValue === 'string') {
      return JSON.parse(storedValue) as T
    }

    // If there isn't already a stored value, use the initialValue.
    let returnValue
    initialValue instanceof Function
      ? (returnValue = initialValue())
      : (returnValue = initialValue)

    return returnValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
