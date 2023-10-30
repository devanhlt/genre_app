import React from "react"

import renderer from "react-test-renderer"
import SearchField from "./SearchField"

jest.mock("react-native-gesture-handler", () => undefined)

describe("<SearchField />", () => {
  it("renders with plat preset correctly", () => {
    const tree = renderer.create(<SearchField preset="plat" />)
    expect(tree).toMatchSnapshot()
  })

  it("renders with outline preset correctly", () => {
    const tree = renderer.create(<SearchField preset="outline" />)
    expect(tree).toMatchSnapshot()
  })

  it("should changed text is passed as an argument to the callback handler", () => {
    const mockCallback = jest.fn(() => null)
    const tree = renderer.create(<SearchField preset="outline" onChangeText={mockCallback} />)
    expect(tree).toMatchSnapshot()
  })
})
