import { getKeyValueStore, KeyValueStore, setIndexedDb } from "../src"
//@ts-ignore
import * as fakeDb from "fake-indexeddb"

let dbName = ""
let store: KeyValueStore

beforeEach(async () => {
  setIndexedDb(fakeDb)
  dbName = `db-${new Date().getTime()}`
  store = await getKeyValueStore(dbName)
})

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
