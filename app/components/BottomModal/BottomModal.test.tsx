import React from "react"
import renderer, { act } from "react-test-renderer"

import { BottomModal } from "./BottomModal"
import { BottomSheetModal } from "@gorhom/bottom-sheet"

describe("<BottomModal />", () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.resetAllMocks()
  })

  test("renders correctly ", () => {
    const tree = renderer.create(
      <BottomModal title="Edit System Configuration" snapPoints={["70%"]}>
        <></>
      </BottomModal>,
    )
    expect(tree).toMatchSnapshot()
  })

  test("should close function to be called", () => {
    const ref = React.createRef<BottomSheetModal>()

    renderer.create(
      <BottomModal ref={ref} title="Edit System Configuration" snapPoints={["70%"]}>
        <></>
      </BottomModal>,
    )
    const close = jest.spyOn(ref.current, "close")
    act(() => {
      ref.current.close()
    })

    expect(close).toBeCalled()
  })
})
