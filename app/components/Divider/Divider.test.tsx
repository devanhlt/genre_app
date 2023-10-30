import React from "react"

import { ViewStyle } from "react-native"
import renderer from "react-test-renderer"
import { Divider } from "./Divider"

describe("<Divider />", () => {
  it("renders correctly horizontal type", () => {
    const tree = renderer.create(<Divider type="horizontal" />)
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly vertical type", () => {
    const tree = renderer.create(<Divider type="vertical" />)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly vertical type and size 50", () => {
    const tree = renderer.create(<Divider type="vertical" size={50} />)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly horizontal type and size 50", () => {
    const tree = renderer.create(<Divider type="horizontal" size={50} />)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly style override", () => {
    const $styleOverride: ViewStyle = { backgroundColor: "red" }
    const tree = renderer.create(<Divider style={$styleOverride} />)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with horizontal line", () => {
    const $styleOverride: ViewStyle = { backgroundColor: "red" }
    const tree = renderer.create(<Divider type="horizontal" style={$styleOverride} line />)
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly with vertical line", () => {
    const $styleOverride: ViewStyle = { backgroundColor: "red" }
    const tree = renderer.create(<Divider type="vertical" style={$styleOverride} line />)
    expect(tree).toMatchSnapshot()
  })
})
