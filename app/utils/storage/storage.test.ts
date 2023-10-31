import { clear, load, loadString, remove, save, saveString } from "./storage"
describe("MMKV Storage", () => {
  it("functions correctly", () => {
    expect(saveString("testKey", "testValue")).toStrictEqual(true)
    expect(loadString("testKey")).toStrictEqual("testValue")
    expect(save("testSave", { username: "HelloWorld" })).toStrictEqual(true)
    expect(load("testSave")).toStrictEqual({ username: "HelloWorld" })
    remove("testSave")
    expect(load("testSave")).toStrictEqual(null)
  })

  it("should return false when saving with value is not correctly", () => {
    expect(save("testSave", 2n)).toStrictEqual(false)
  })
  it("should remove all value when call clear storage function", () => {
    clear()
    expect(load("testSave")).toStrictEqual(null)
  })
})
