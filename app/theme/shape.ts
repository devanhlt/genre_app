/**
  Use these shapes for Sharped UI element.
 */
export const shape = {
  /**
   * Use this shape for Sharped UI element.
   */
  sharp: 0,

  /**
   * Use this shape for Checkbox
   * Chip
   * Small-sized UI element
   */
  small: 4,

  /**
   * Use this shape for Buttons
   * Input fields
   * Normal-sized UI element
   */
  medium: 8,

  /**
   * Use this shape for Card
   * Large-sized UI element
   */
  large: 16,

  /**
   * Use this shape for Status Chip
   * Pill-shape UI element
   */
  pill: 999,

  /**
   * Use this shape for Avatar
   * Radio
   * Rounded UI element.
   */
  circle: (size: number) => size / 2,
} as const

export type Shape = keyof typeof shape
