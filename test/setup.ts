/* eslint-disable @typescript-eslint/no-var-requires */
// we always make sure 'react-native' gets included first

import "react-native-gesture-handler/jestSetup"
import "@testing-library/jest-native/extend-expect"

jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"))
jest.mock("@gorhom/bottom-sheet", () => require("@gorhom/bottom-sheet/mock"))

// jest.mock("react-native-mmkv", () => require("react-native-mmkv/lib/typescript/createMMKV.mock"))

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper")

jest.mock("i18n-js", () => ({
  currentLocale: () => "vi",
  t: (key: string, params: Record<string, string>) => {
    return `${key} ${JSON.stringify(params)}`
  },
}))

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
declare const tron

declare global {
  let __TEST__
}
