# simple-kvs
Simple key value store for the browser, based on indexed db, promise-based + TS friendly.

## How to install

`simple-kvs` is available on npm:

```
npm install simple-kvs
```

## Why another lib ?

Indexed db is very handy for storing large objects, but the API is quite cumbersome when you only need to store simple data.

Local storage only allows a little amount of data and only stores string. The API is callback based.

simple-kvs is a simple wrapper around IndexedDB, which defines a single table (`kv-store`) indexing a key column.

## API

To create a database just call
```js
import { getKeyValueStorage } from "simple-kvs"

getKeyValueStorage(dbName).then(store => {
  // store can be used !
}).catch(e => {
  // store is unavailable :(
})
```

which returns a promise with the store object:

```ts
export interface KeyValueStore {
  get: <T>(key: string) => Promise<T | undefined>
  getKeys: () => Promise<string[]>
  set: (key: string, value: any) => Promise<void>
  remove: (key: string) => Promise<void>
  clear: () => Promise<void>
}

```


Every operations that can be performed are described in the [test suite](./__tests__/index.test.ts) :

```js


test("should return undefined for unknown keys", async () => {
  const value = await store.get("unknown key")
  expect(value).toBeUndefined()
})

test("should return value after save for primitives", async () => {
  await store.set("key", 1)
  const value = await store.get("key")
  expect(value).toBe(1)
})

test("should return value after save for objects", async () => {
  await store.set("key", { a: 1, b: "2" })
  const value = await store.get("key")
  expect(value).toEqual({ a: 1, b: "2" })
})

test("should return keys after save", async () => {
  await store.set("key1", 1)
  await store.set("key2", 2)
  const value = await store.getKeys()
  expect(value).toEqual(["key1", "key2"])
})

test("should remove keys after remove", async () => {
  await store.set("key", 1)
  await store.remove("key")
  const value = await store.get("key")
  expect(value).toBeUndefined()
})

test("should remove all keys after clear", async () => {
  await store.set("key1", 1)
  await store.set("key2", 2)
  await store.clear()
  const value = await store.get("key1")
  expect(value).toBeUndefined()
  expect(await store.getKeys()).toEqual([])
})


```
