const palette = {
  // Color Yellow
  yellow100: "#FFFCF3",
  yellow200: "#FFDD77",
  yellow300: "#FFCD39",
  yellow400: "#FFC107",
  yellow500: "#997404",
  yellow600: "#594402",

  // Color Blue
  blue100: "#F2F5FB",
  blue200: "#7396D2",
  blue300: "#3466BE",
  blue400: "#0140AE",
  blue500: "#012668",
  blue600: "#00163D",

  // Green color
  green100: "#F2F8F2",
  green200: "#73AC73",
  green300: "#339633",
  green400: "#007C00",
  green500: "#004A00",
  green600: "#002B00",

  // Orange color
  orange100: "#FFF8F3",
  orange200: "#F9B77D",
  orange300: "#F79642",
  orange400: "#F57C13",
  orange500: "#934A0B",
  orange600: "#562B07",

  // Red color
  red: "#C5281C",
  red100: "#FBF2F2",
  red200: "#D87373",
  red300: "#C63333",
  red400: "#B80000",
  red500: "#6E0000",
  red600: "#400000",

  // Neutral color
  neutral0: "#FFFFFF",
  neutral100: "#FBFBFB",
  neutral200: "#E5E8ED",
  neutral300: "#BBC3CF",
  neutral400: "#A1ABBB",
  neutral500: "#8693A8",
  neutral600: "#364B6E",
  neutral700: "#001B48",
  neutral800: "#000F27",
  neutral900: "#000000",

  // Black color
  black: "#1d1d1d",
  black100: "#EEF0F3",
  black200: "#E2E5EB",
  black300: "#A2A8B4",
  black400: "#5E6671",
  black450: "#585E69",
  black500: "#3D4148",
  black600: "#212121",
  black050: "#E5EAF0",

  // Color Gradient
  gradientYellow1: ["#FFDD00", "#FFD700", "#FFC50B", "#FBA819", "#F58220"] as (string | number)[],
  gradientYellow2: ["#F58220", "#F6881F", "#F8991D", "#FDB614", "#FFDD00"] as (string | number)[],
  gradientBlue1: ["#44C8F5", "#009EDA", "#0084C9", "#0076BF", "#0072BC"] as (string | number)[],
  gradientBlue2: ["#0072BC", "#0091D2", "#1DACE3", "#3DBFEF", "#44C8F5"] as (string | number)[],

  transparent: "rgba(0, 0, 0, 0)",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const appColors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  common: {
    /**
     * App UI background
     * Usage for Element container
     */
    appBackground: palette.neutral100,
    /**
     * White UI background
     * Usage for Element container
     */
    bgRed: palette.red,
    /**
     * White UI background
     * Usage for Element container
     */
    bgWhite: palette.neutral0,
    /**
     * Grey UI background
     * Usage for Element container
     */
    bgGrey: palette.neutral100,
    /**
     * High contract background
     * Tooltip container
     */
    bgInverse: palette.neutral800,
    /**
     * Usage for Display / Headline / Title
     * Icon
     * Press state for $character-secondary
     */
    characterPrimary: palette.neutral800,

    /**
     * Usage for Label / Body / Icon
     */
    characterSecondary: palette.neutral700,

    /**
     * Usage for Support / Icon
     * Hover state for $character-secondary
     */
    characterTertiary: palette.neutral600,

    /**
     * Usage for Label / Link
     * Icon
     */
    characterRedDefault: palette.red400,

    /**
     * Usage for hover state for $character-blue-default
     */
    characterBlueHover: palette.blue300,

    /**
     * Usage for press state for $character-blue-default
     */
    characterBluePress: palette.blue500,

    /**
     * Usage for placeholder character
     */
    characterPlaceholder: palette.neutral500,

    /**
     * Usage for character on color
     */
    characterWhite: palette.neutral0,

    /**
     * Usage for disabled state for character
     */
    characterDisabled: palette.neutral400,

    /**
     * Usage for interactable element
     */
    interactiveDefault: palette.blue400,

    /**
     * Usage for hover state for $input-default
     */
    interactiveHover: palette.blue300,

    /**
     * Usage for press state for $input-default
     */
    interactivePress: palette.red500,

    /**
     * Usage for interactable element on color;
     * White interactable container
     */
    interactiveWhite: palette.neutral0,

    /**
     * Usage for disabled state for interactable
     */
    interactiveDisabled: palette.neutral200,

    /**
     * Usage for Border
     */
    borderDefault: palette.neutral400,

    /**
     * Usage for hover state for $border-default
     */
    borderHover: palette.red300,

    /**
     * Usage for focus state for $border-default
     */
    borderFocus: palette.red400,

    /**
     * Usage for press state for $border-default
     */
    borderPress: palette.red500,

    /**
     * Usage for Divider
     */
    borderDivider: palette.neutral200,

    /**
     * Usage for disabled stated for $border-default
     */
    borderDisabled: palette.neutral300,

    /**
     * Usage for Successful alert
     * Positive feedback
     */
    successDefault: palette.green400,

    /**
     * Usage for hover state for $support-success
     */
    successHover: palette.green300,

    /**
     * Usage for press state for $support-success
     */
    successPress: palette.green500,

    /**
     * Usage for Warning alert
     * Caution feedback
     */
    warningDefault: palette.orange400,

    /**
     * Usage for hover state for $support-warning
     */
    warningHover: palette.orange300,

    /**
     * Usage for press state for $support-warning
     */
    warningPress: palette.orange500,

    /**
     * Usage for Error alert
     * Critical feedback
     */
    errorDefault: palette.red400,

    /**
     * Usage for hover state for $support-error
     */
    errorHover: palette.red300,

    /**
     * Usage for press state for $support-error
     */
    errorPress: palette.red500,

    /**
     * Usage for Divider
     */
    miscDivider: palette.neutral200,

    /**
     * Usage for black overlay
     */
  },
  components: {
    button: {
      primary: palette.red,
      primaryHover: palette.red300,
      primaryPress: palette.neutral200,
      secondary: palette.neutral0,
      disabled: palette.neutral200,
    },
    tag: {
      containerGrey: palette.neutral100,
      containerBlue: palette.blue100,
      containerGreen: palette.green100,
      containerOrange: palette.orange100,
      containerRed: palette.red100,
    },
  },
}

export type ColorsType = keyof typeof appColors | keyof typeof appColors.palette
