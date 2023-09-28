import { MMKV } from "react-native-mmkv"
import { load, loadString, save, saveString, clear, remove } from "./storage"

export const storage = new MMKV()

// fixtures
const VALUE_OBJECT = { x: 1 }
const VALUE_STRING = JSON.stringify(VALUE_OBJECT)

beforeEach(() => (storage.getString as jest.Mock).mockReturnValue(Promise.resolve(VALUE_STRING)))
afterEach(() => jest.clearAllMocks())

test("load", () => {
  const value = load("something")
  expect(value).toEqual(JSON.parse(VALUE_STRING))
})

test("loadString", () => {
  const value = loadString("something")
  expect(value).toEqual(VALUE_STRING)
})

test("save", () => {
  save("something", VALUE_OBJECT)
  expect(save).toHaveBeenCalledWith("something", VALUE_STRING)
})

test("saveString", () => {
  saveString("something", VALUE_STRING)
  expect(saveString).toHaveBeenCalledWith("something", VALUE_STRING)
})

test("remove", () => {
  remove("something")
  expect(remove).toHaveBeenCalledWith("something")
})

test("clear", () => {
  clear()
  expect(clear).toHaveBeenCalledWith()
})
