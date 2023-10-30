/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from "react"

import renderer from "react-test-renderer"
import { Typography } from "./Typography"

jest.mock("../../i18n/i18n", () => ({
  isRTL: true,
}))

describe("<Typography />", () => {
  it("renders correctly with isRTL is true", () => {
    const tree = renderer.create(
      <Typography preset="body01" text="body02 - Cillum eu laboris in labore" />,
    )
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with text which is looked up via i18n", () => {
    const Component = (
      <>
        <Typography preset="body02" text="body02 - Cillum eu laboris in labore" />

        <Typography preset="body03" text="body03 - Cillum eu laboris in labore" />

        <Typography preset="body04" text="body04 - Cillum eu laboris in labore" />

        <Typography preset="headline01" text="headline01 - Cillum eu laboris in labore" />

        <Typography preset="headline02" text="headline02 - Cillum eu laboris in labore" />

        <Typography preset="label01" text="label01 - Cillum eu laboris in labore" />

        <Typography preset="label02" text="label02 - Cillum eu laboris in labore" />

        <Typography preset="label03" text="label03 - Cillum eu laboris in labore" />

        <Typography preset="link01" text="link01 - Cillum eu laboris in labore" />

        <Typography preset="link02" text="link02 - Cillum eu laboris in labore" />

        <Typography preset="support01" text="support01 - Cillum eu laboris in labore" />

        <Typography preset="support02" text="support02 - Cillum eu laboris in labore" />

        <Typography preset="title01" text="title01 - Cillum eu laboris in labore" />

        <Typography preset="title02" tx="common.back" />

        <Typography preset="title02">
          <Typography preset="title02" tx="common.back" />
        </Typography>
      </>
    )
    const tree = renderer.create(Component)
    expect(tree).toMatchSnapshot()
  })
})
