import { noop, isFunction, isObject, isString } from "./func"

describe("Unit test for func utils", () => {
  it("noop function return undefined", () => {
    expect(noop()).toEqual(undefined)
  })
  it("isFunction function return if argument is function", () => {
    expect(isFunction(noop)).toEqual(true)
  })
  it("isFunction function false if argument is not a function", () => {
    expect(isFunction("")).toEqual(false)
  })
  it("isObject function false if argument is not object", () => {
    expect(isObject(noop)).toEqual(false)
    expect(isObject("")).toEqual(false)
    expect(isObject(1)).toEqual(false)
    expect(isObject(undefined)).toEqual(false)
  })
  it("isObject function true if argument is object", () => {
    expect(isObject({ name: "Hello world!" })).toEqual(true)
  })
  it("isString function false if argument is not string", () => {
    expect(isString({ name: "Hello world!" })).toEqual(false)
    expect(isString(undefined)).toEqual(false)
    expect(isString(1)).toEqual(false)
  })
  it("isString function true if argument is string", () => {
    expect(isString("Hello world!")).toEqual(true)
  })
})
