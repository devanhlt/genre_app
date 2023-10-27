import { formatDate } from "./formatDate"

describe("Unit test for formatDate utils", () => {
  it("should return the date in 25-02-2020 format when I pass date in 2020-02-25", () => {
    expect(formatDate("2020-02-25", "dd-MM-yyyy")).toEqual("25-02-2020")
  })
  it("should return false when I pass date incorrectly format date", () => {
    expect(formatDate("2020-225-225", "dd-MM-yyyy")).toEqual(false)
  })
  it("should return the date with format yyyy-MM-dd  when I pass date incorrectly format date", () => {
    expect(formatDate(new Date("2023-10-27").toDateString(), "yyyy-MM-dd")).toEqual("2023-10-27")
  })
})
