import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types"
import { act, fireEvent, render, screen } from "@testing-library/react-native"
import React from "react"
import { Typography } from "../Typography"
import { BottomModal } from "./BottomModal"

describe("<BottomModal />", () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test("renders correctly ", () => {
    const ref = React.createRef<BottomSheetModalMethods>()
    render(
      <BottomModal ref={ref} title="Edit System Configuration" snapPoints={["70%"]}>
        <Typography text="Test" />
      </BottomModal>,
    )
    expect(screen.toJSON()).toMatchSnapshot()
    const wrapper = screen.getByTestId("modal-header-close-button")
    act(() => ref.current.close())
    expect(screen.queryByTestId("modal-header-close-button")).toBeVisible()

    fireEvent.press(wrapper)
  })

  test("should close when press close modal ", () => {
    const ref = React.createRef<BottomSheetModalMethods>()
    render(
      <BottomModal ref={ref} title="Edit System Configuration" snapPoints={["70%"]}>
        <Typography text="Test" />
      </BottomModal>,
    )
    const wrapper = screen.getByTestId("modal-header-close-button")
    fireEvent.press(wrapper)
    expect(screen.queryByTestId("modal-header-close-button")).toBeVisible()
  })

  test("should renderers correctly without props", () => {
    render(
      <BottomModal>
        <Typography text="Test" />
      </BottomModal>,
    )
    const wrapper = screen.getByTestId("modal-header-close-button")
    fireEvent.press(wrapper)
    expect(screen.queryByTestId("modal-header-close-button")).toBeVisible()
  })
})
