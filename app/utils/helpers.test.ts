import { jsonToString, stringToJson } from "./helpers"

describe("stringToJson helper functions", () => {
  it("function return object data", () => {
    const objectString = '{"name":"Hello"}'
    const objectData = { name: "Hello" }
    const data = stringToJson(objectString)

    expect(data).toEqual(objectData)
  })

  it("function return null with incorrectly argument", () => {
    const objectString = '{"name":"Hello"'
    const data = stringToJson(objectString)
    expect(data).toEqual(null)
  })

  it("function return false with empty argument", () => {
    const data = stringToJson("")
    expect(data).toEqual(false)
  })
})

describe("jsonToString helper functions", () => {
  it("function return object string data with argument value is object", () => {
    const objectString = '{"name":"Hello"}'
    const objectData = { name: "Hello" }
    const data = jsonToString(objectData)

    expect(data).toEqual(objectString)
  })

  it("function return null with incorrectly argument", () => {
    const objectString = '{"name":"Hello"}'
    const objectData = { name: "Hello" }
    const data = jsonToString(objectData)
    expect(data).toEqual(objectString)
  })

  it("function return empty string with argument value is null", () => {
    const data = jsonToString(null)
    expect(data).toEqual("")
  })
  it("function return empty string with argument value is incorrectly format", () => {
    const data = jsonToString({ x: 2n })
    expect(data).toEqual("")
  })
})
