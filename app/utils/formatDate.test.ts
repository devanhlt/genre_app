import { formatDate } from "./formatDate"

jest.mock("i18n-js", () => ({
  currentLocale: () => "en",
  t: (key: string, params: Record<string, string>) => {
    return `${key} ${JSON.stringify(params)}`
  },
}))

describe("formatDate.ts", () => {
  it("should return the date in 25-02-2020 format when I pass date in 2020-02-25", () => {
    expect(formatDate("2020-02-25", "dd-MM-yyyy")).toEqual("25-02-2020")
  })
  it("should return false when I pass date incorrectly format date", () => {
    expect(formatDate("2020-225-225", "dd-MM-yyyy")).toEqual(false)
  })
  it("should return the date with format yyyy-MM-dd when I pass date incorrectly format date", () => {
    expect(formatDate(new Date("2023-10-27").toDateString(), "yyyy-MM-dd")).toEqual("2023-10-27")
  })
  it("should return correctly value", () => {
    expect(formatDate(1393804800000)).toEqual("2014-03-03")
  })
})
