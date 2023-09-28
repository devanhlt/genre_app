import React from "react"

import { SvgIcons, SvgIconsType } from "app/assets/svg"
import { LocalSvg, SvgProps } from "react-native-svg"

interface IconProps extends SvgProps {
  /**
   * The name of the icon
   */
  name: SvgIconsType
}

export const SvgIcon = ({ name, ...rest }: IconProps) => {
  if (typeof name !== "string" || !Object.keys(SvgIcons).includes(name)) {
    console.warn(
      `Variant ${name} was not provided properly. Valid variants are ${Object.keys(SvgIcons).join(
        ", ",
      )}.`,
    )
    return <></>
  }
  const Icon = SvgIcons[name as string] as any

  return <LocalSvg asset={Icon} {...rest} />
}
