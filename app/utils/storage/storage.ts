import { MMKV } from "react-native-mmkv"

export const storage = new MMKV()

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export function loadString(key: string): string | null {
  return storage.getString(key)
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function saveString(key: string, value: string): boolean {
  storage.set(key, value)
  return true
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export function load(key: string): any | null {
  const almostThere = storage.getString(key)
  return almostThere ? JSON.parse(almostThere) : null
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function save(key: string, value: any): boolean {
  storage.set(key, JSON.stringify(value))
  return true
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export function remove(key: string): void {
  storage.delete(key)
}

/**
 * Burn it all to the ground.
 */
export function clear(): void {
  storage.clearAll()
}
