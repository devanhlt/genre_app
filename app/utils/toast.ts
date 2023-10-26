import RNToast, { ToastOptions } from "react-native-toast-message"

type ToastShowParams = ToastOptions & {
  title?: string
  subtitle?: string
}

const Toast = {
  success: ({ title = "", subtitle = "", ...rest }: ToastShowParams) => {
    return RNToast.show({ ...rest, type: "success", text1: title, text2: subtitle })
  },
  info: ({ title = "", subtitle = "", ...rest }: ToastShowParams) => {
    return RNToast.show({ ...rest, type: "info", text1: title, text2: subtitle })
  },
  error: ({ title = "", subtitle = "", ...rest }: ToastShowParams) => {
    return RNToast.show({ ...rest, type: "error", text1: title, text2: subtitle })
  },
  hide: (params?: void | undefined) => {
    return RNToast.hide(params)
  },
}

export { Toast }
