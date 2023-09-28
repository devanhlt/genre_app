/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */

export const radius = {
  none: 0,
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  /**
   *  XXXL : 64
   */
  xxxl: 64,
} as const

export type Radius = keyof typeof radius
