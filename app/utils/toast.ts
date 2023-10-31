import RNToast, { ToastOptions } from "react-native-toast-message"

type ToastShowParams = ToastOptions & {
  title?: string
  subtitle?: string
}

const Toast = {
  success: ({ title = "", subtitle = "", type = "success", ...rest }: ToastShowParams) => {
    return RNToast.show({ ...rest, type, text1: title, text2: subtitle })
  },
  info: ({ title = "", subtitle = "", type = "info", ...rest }: ToastShowParams) => {
    return RNToast.show({ ...rest, type, text1: title, text2: subtitle })
  },
  error: ({ title = "", subtitle = "", type = "error", ...rest }: ToastShowParams) => {
    return RNToast.show({ ...rest, type, text1: title, text2: subtitle })
  },
  hide: (params?: void | undefined) => {
    return RNToast.hide(params)
  },
}

export { Toast }
