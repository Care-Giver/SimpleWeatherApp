import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../text/text"

//! 스타일링 할때 제발! width 먼저 쓰세요! height 는 나중에!!
const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface MyInfoButtonAfterUpdateProps {
  style?: StyleProp<ViewStyle>
}

//! 함수 작성하시면, 함수 기능에대해서 제발 주석좀 달아주세요 제발
export const MyInfoButtonAfterUpdate = observer(function MyInfoButtonAfterUpdate(props: MyInfoButtonAfterUpdateProps) {
  const { style } = props
  const styles = Object.assign({}, CONTAINER, style)

  return (
    <View style={styles}>
      <Text style={TEXT}>Hello</Text>
    </View>
  )
})
