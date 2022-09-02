import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  DemoScreen
} from "../../screens"

export type CommonScreensStackNavigatorParamList = {
  demo: undefined
}

const Stack = createStackNavigator<CommonScreensStackNavigatorParamList>()
export const CommonScreensStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false, }}>
      <Stack.Screen name="demo" component={DemoScreen} />
    </Stack.Navigator>
  )
}
