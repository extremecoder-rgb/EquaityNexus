
class BrowserStorage {
  private store: Map<string, any> = new Map()

 
  get<T>(key: string): T | undefined {
    return this.store.get(key) as T | undefined
  }

  
  set<T>(key: string, value: T): void {
    this.store.set(key, value)
  }

 
  has(key: string): boolean {
    return this.store.has(key)
  }


  delete(key: string): boolean {
    return this.store.delete(key)
  }


  clear(): void {
    this.store.clear()
  }
}


const globalStorage = new BrowserStorage()


export function getStorageValue<T>(key: string): T | undefined {
  return globalStorage.get<T>(key)
}


export function setStorageValue<T>(key: string, value: T): void {
  globalStorage.set(key, value)
}


export function hasStorageValue(key: string): boolean {
  return globalStorage.has(key)
}


export function deleteStorageValue(key: string): boolean {
  return globalStorage.delete(key)
}

export function clearStorage(): void {
  globalStorage.clear()
}

export const storage = globalStorage
