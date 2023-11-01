import React from "react"
import { render, screen } from "@testing-library/react-native"

import { appColors } from "app/theme"
import Badge from "./Badge"

describe("<Badge />", () => {
  it("renders correctly", async () => {
    render(
      <Badge textColor={"#fff"} backgroundColor={appColors.common.bgRed} borderRadius={4}>
        Test
      </Badge>,
    )

    const usernameOutput = await screen.findByTestId("test-id-badge")
    expect(usernameOutput).toHaveTextContent("Test")
    expect(screen.toJSON()).toMatchSnapshot()
  })
})
