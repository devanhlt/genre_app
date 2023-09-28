import { Platform, TextStyle } from "react-native"
import {
  Roboto_100Thin as robotoThin,
  Roboto_100Thin_Italic as robotoThinItalic,
  Roboto_300Light as robotoLight,
  Roboto_300Light_Italic as robotoLightItalic,
  Roboto_400Regular as robotoRegular,
  Roboto_400Regular_Italic as robotoRegularItalic,
  Roboto_500Medium as robotoMedium,
  Roboto_500Medium_Italic as robotoMediumItalic,
  Roboto_700Bold as robotoBold,
  Roboto_700Bold_Italic as robotoBoldItalic,
} from "@expo-google-fonts/roboto"

export const customFontsToLoad = {
  robotoThin,
  robotoThinItalic,
  robotoLight,
  robotoLightItalic,
  robotoRegular,
  robotoRegularItalic,
  robotoMedium,
  robotoMediumItalic,
  robotoBold,
  robotoBoldItalic,
}

const fonts = {
  roboto: {
    // Cross-platform Google font.
    thin: "robotoThin",
    light: "robotoLight",
    normal: "robotoRegular",
    medium: "robotoMedium",
    semiBold: "robotoBold",
    bold: "robotoBold",
  },
  sfPro: {
    // iOS only font.
    normal: "System",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const regularType: TextStyle = {
  fontFamily: Platform.select({
    ios: fonts.sfPro.normal,
    android: fonts.roboto.normal,
  }),
  fontWeight: "400",
}

const mediumType: TextStyle = {
  fontFamily: Platform.select({
    ios: fonts.sfPro.normal,
    android: fonts.roboto.medium,
  }),
  fontWeight: "500",
}

const semiBoldType: TextStyle = {
  fontFamily: Platform.select({
    ios: fonts.sfPro.normal,
    android: fonts.roboto.bold,
  }),
  fontWeight: "600",
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  headline01: {
    ...semiBoldType,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },
  headline02: {
    ...semiBoldType,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
  },
  title01: {
    ...semiBoldType,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0.1,
  },
  title02: {
    ...semiBoldType,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.1,
  },
  label01: {
    ...semiBoldType,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.15,
  },
  label02: {
    ...semiBoldType,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  label03: {
    ...regularType,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.15,
  },
  body01: {
    ...regularType,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.15,
  },
  body02: {
    ...regularType,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  body03: {
    ...semiBoldType,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.15,
  },
  body04: {
    ...semiBoldType,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  support01: {
    ...regularType,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
  },
  support02: {
    ...semiBoldType,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
  },
  link01: {
    ...mediumType,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.15,
  },
  link02: {
    ...mediumType,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
}
