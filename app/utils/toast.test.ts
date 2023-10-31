import { act } from "react-test-renderer"
import { Toast } from "./toast"
import { ToastOptions } from "react-native-toast-message"
import { noop } from "./func"

const DEFAULT_OPTIONS: Required<ToastOptions> = {
  type: "success",
  position: "top",
  autoHide: true,
  visibilityTime: 4000,
  topOffset: 40,
  bottomOffset: 40,
  keyboardOffset: 10,
  onShow: noop,
  onHide: noop,
  onPress: noop,
  props: {},
}

describe("toast.ts", () => {
  it("functions correctly", () => {
    const error = jest.spyOn(Toast, "error")
    const info = jest.spyOn(Toast, "info")
    const hide = jest.spyOn(Toast, "hide")
    const success = jest.spyOn(Toast, "success")

    act(() => {
      Toast.success({
        ...DEFAULT_OPTIONS,
        title: "Test",
        subtitle: "Test",
        visibilityTime: 1000,
        position: "top",
        type: "success",
      })
      Toast.success({
        ...DEFAULT_OPTIONS,
        title: "Test",
        subtitle: "Test",
        visibilityTime: 1000,
        position: "top",
        type: "info",
      })
      Toast.success({
        ...DEFAULT_OPTIONS,
        title: "Test",
        subtitle: "Test",
        visibilityTime: 1000,
        position: "top",
        type: "error",
      })
      Toast.error({
        ...DEFAULT_OPTIONS,
        title: "Test",
        subtitle: "Test",
        visibilityTime: 1000,
        position: "top",
      })
      Toast.info({
        ...DEFAULT_OPTIONS,
        title: "Test",
        subtitle: "Test",
        visibilityTime: 1000,
        position: "top",
      })
      Toast.hide()
    })
    expect(success).toBeCalled()
    expect(error).toBeCalled()
    expect(info).toBeCalled()
    expect(hide).toBeCalled()
  })
  it("functions correctly with position props is bottom", () => {
    const error = jest.spyOn(Toast, "error")
    const info = jest.spyOn(Toast, "info")
    const hide = jest.spyOn(Toast, "hide")
    const success = jest.spyOn(Toast, "success")

    act(() => {
      Toast.success({
        ...DEFAULT_OPTIONS,
        autoHide: false,
        title: "Test",
        subtitle: "Test",
        visibilityTime: 1000,
        position: "bottom",
      })

      Toast.error({
        ...DEFAULT_OPTIONS,
        autoHide: false,
        title: "Test",
        subtitle: "Test",
        visibilityTime: 1000,
        position: "bottom",
      })
      Toast.info({
        ...DEFAULT_OPTIONS,
        autoHide: false,
        title: "Test",
        subtitle: "Test",
        visibilityTime: 1000,
        position: "bottom",
      })
      Toast.hide()
    })
    expect(success).toBeCalled()
    expect(error).toBeCalled()
    expect(info).toBeCalled()
    expect(hide).toBeCalled()
  })
  it("functions correctly with empty params", () => {
    const error = jest.spyOn(Toast, "error")
    const info = jest.spyOn(Toast, "info")
    const hide = jest.spyOn(Toast, "hide")
    const success = jest.spyOn(Toast, "success")

    act(() => {
      Toast.success({})
      Toast.error({})
      Toast.info({})
      Toast.hide()
    })
    expect(success).toBeCalled()
    expect(error).toBeCalled()
    expect(info).toBeCalled()
    expect(hide).toBeCalled()
  })
})
