import React from "react"

import renderer from "react-test-renderer"
import { If } from "./If"
import { Typography } from "../Typography"

describe("<If />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(
      <If condition={true}>
        <Typography text="Test" />
      </If>,
    )
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly when condition is true and children is empty", () => {
    const tree = renderer.create(<If condition={true}></If>)
    expect(tree).toMatchSnapshot()
  })

  it("should renders empty when condition is false", () => {
    const tree = renderer.create(
      <If condition={false}>
        <Typography text="Test" />
      </If>,
    )
    expect(tree).toMatchSnapshot()
  })

  it("should renders empty when condition is false and children is empty", () => {
    const tree = renderer.create(<If condition={false}></If>)
    expect(tree).toMatchSnapshot()
  })
  it("should renders empty when condition is undefined", () => {
    const tree = renderer.create(<If condition={undefined}></If>)
    expect(tree).toMatchSnapshot()
  })
})
