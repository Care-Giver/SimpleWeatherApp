import * as React from "react"
import { View, ImageStyle, Pressable } from "react-native"
import { AutoImage as Image } from "../auto-image/auto-image"
import { IconProps } from "./icon.props"
import { icons } from "./icons"

const ROOT: ImageStyle = {
  resizeMode: "contain",
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle, ...rest } = props

  return (
    <Pressable style={containerStyle} {...rest}>
      <Image style={[ROOT, styleOverride]} source={icons[icon]} />
    </Pressable>
  )
}
