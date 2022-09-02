import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  DemoScreen
} from "../../screens"

export type TestNavNavigatorParamList = {
  demo: undefined
}

const Stack = createStackNavigator<TestNavNavigatorParamList>()
export const TestNavNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false, }}>
      <Stack.Screen name="demo" component={DemoScreen} />
    </Stack.Navigator>
  )
}
