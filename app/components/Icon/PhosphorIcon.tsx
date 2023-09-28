import * as PhosphorIconsPack from "phosphor-react-native"
import React from "react"

export type IconTypes = keyof typeof PhosphorIconsPack

export type IconWeight = PhosphorIconsPack.IconWeight

interface IconProps extends PhosphorIconsPack.IconProps {
  /**
   * The name of the icon
   */
  name: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number
  disabled?: boolean
  disabledColor?: string
}

export const PhosphorIcon = (props: IconProps) => {
  const Icon = PhosphorIconsPack[props.name] as any
  return <Icon {...props} />
}

export default PhosphorIconsPack
