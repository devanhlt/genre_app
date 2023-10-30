/* eslint-disable @typescript-eslint/no-var-requires */
// we always make sure 'react-native' gets included first
import * as ReactNative from "react-native"
import mockFile from "./mockFile"

import "react-native-gesture-handler/jestSetup"

jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"))
jest.mock("@gorhom/bottom-sheet", () => require("@gorhom/bottom-sheet/mock"))

// libraries to mock
jest.doMock("react-native", () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      Image: {
        ...ReactNative.Image,
        resolveAssetSource: jest.fn((_source) => mockFile), // eslint-disable-line @typescript-eslint/no-unused-vars
        getSize: jest.fn(
          (
            uri: string, // eslint-disable-line @typescript-eslint/no-unused-vars
            success: (width: number, height: number) => void,
            failure?: (_error: any) => void, // eslint-disable-line @typescript-eslint/no-unused-vars
          ) => success(100, 100),
        ),
      },

      Dimensions: {
        ...ReactNative.Dimensions,
        get: jest.fn((dim: "window" | "screen") => {
          if (dim === "window") {
            return { width: 375, height: 812 }
          }
          return { width: 414, height: 896 }
        }),
      },
      Platform: {
        ...ReactNative.Platform,
        OS: "android",
      },
    },

    ReactNative,
  )
})

// jest.mock("react-native-mmkv", () => require("react-native-mmkv/lib/typescript/createMMKV.mock"))

jest.mock("i18n-js", () => ({
  currentLocale: () => "vi",
  t: (key: string, params: Record<string, string>) => {
    return `${key} ${JSON.stringify(params)}`
  },
}))

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
declare const tron

jest.useFakeTimers()
declare global {
  let __TEST__
}
