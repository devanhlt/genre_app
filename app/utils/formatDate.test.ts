import { formatDate } from "./formatDate"
import I18n from "i18n-js"

jest.mock("i18n-js", () => ({
  currentLocale: jest.fn(),
  t: (key: string, params: Record<string, string>) => {
    return `${key} ${JSON.stringify(params)}`
  },
}))

describe("formatDate.ts", () => {
  it("should return the date in 25-02-2020 format when I pass date in 2020-02-25", () => {
    ;(I18n.currentLocale as jest.Mock).mockReturnValue("vi")
    expect(formatDate("2020-02-25", "dd-MM-yyyy")).toEqual("25-02-2020")
  })

  it("should return the date correctly when I pass date with default format", () => {
    ;(I18n.currentLocale as jest.Mock).mockReturnValue("vi")
    expect(formatDate("2020-02-25")).toEqual("2020-02-25")
  })

  it("should return false when I pass date incorrectly format date", () => {
    ;(I18n.currentLocale as jest.Mock).mockReturnValue("en")
    expect(formatDate("2020-225-225", "dd-MM-yyyy")).toEqual(false)
  })
  it("should return false when I pass date incorrectly with default format", () => {
    ;(I18n.currentLocale as jest.Mock).mockReturnValue("en")
    expect(formatDate("2020-225-225")).toEqual(false)
  })
  it("should return the date with format yyyy-MM-dd when I pass date incorrectly format date", () => {
    expect(formatDate(new Date("2023-10-27").toDateString(), "yyyy-MM-dd")).toEqual("2023-10-27")
  })
  it("should return the date with default format when I pass date incorrectly format date", () => {
    expect(formatDate(new Date("2023-10-27").toDateString())).toEqual("2023-10-27")
  })
  it("should return correctly value", () => {
    expect(formatDate(1393804800000)).toEqual("2014-03-03")
  })
  it("should return correctly with currentLocale return empty", () => {
    ;(I18n.currentLocale as jest.Mock).mockReturnValue("")
    expect(formatDate(1393804800000)).toEqual("2014-03-03")
  })
})
