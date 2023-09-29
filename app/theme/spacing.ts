/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  size01: 1,
  size02: 2,
  size04: 4,
  size08: 8,
  size10: 10,
  size12: 12,
  size16: 16,
  size20: 20,
  size24: 24,
  size32: 32,
  size40: 40,
  size48: 48,
} as const

export type Spacing = keyof typeof spacing
