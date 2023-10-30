/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from "react"

import renderer from "react-test-renderer"
import { ModalBackdrop } from "./ModalBackdrop"

describe("<ModalBackdrop />", () => {
  it("renders correctly ", () => {
    const tree = renderer.create(
      <ModalBackdrop
        style={{ backgroundColor: "red" }}
        animatedIndex={{
          value: 0,
        }}
        animatedPosition={{
          value: 0,
        }}
      />,
    )
    expect(tree).toMatchSnapshot()
  })
})
