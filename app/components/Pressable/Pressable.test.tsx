/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from "react"

import renderer from "react-test-renderer"
import { Pressable } from "./Pressable"

describe("<Pressable />", () => {
  it("renders correctly with isRTL is true", () => {
    const tree = renderer.create(
      <Pressable preset="primary" text="body02 - Cillum eu laboris in labore" />,
    )
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with text which is looked up via i18n", () => {
    const Component = (
      <>
        <Pressable preset="primary" tx="common.cancel" />

        <Pressable
          pressedStyle={{ backgroundColor: "red" }}
          preset="secondary"
          text="body03 - Cillum eu laboris in labore"
          size="medium"
        />
        <Pressable
          pressedStyle={{ backgroundColor: "red" }}
          preset="secondary"
          text="body03 - Cillum eu laboris in labore"
          size="small"
        />
        <Pressable
          pressedStyle={{ backgroundColor: "red" }}
          preset="primary"
          text="body03 - Cillum eu laboris in labore"
          size="small"
        />

        <Pressable pressedStyle={{ backgroundColor: "red" }} preset="secondary" size="small">
          <></>
        </Pressable>
        <Pressable pressedStyle={{ backgroundColor: "red" }} preset="tertiary" size="small">
          <></>
        </Pressable>

        <Pressable preset="tertiary" text="body04 - Cillum eu laboris in labore" />
      </>
    )
    const tree = renderer.create(Component)
    expect(tree).toMatchSnapshot()
  })
})
