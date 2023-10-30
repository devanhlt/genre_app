import { translate } from "./translate"

describe("translate.ts", () => {
  it("function should return correctly", () => {
    const actual = translate("common.back", { message: "TEST" })
    const expected = 'common.back {"message":"TEST"}'
    expect(actual).toEqual(expected)
  })
})
