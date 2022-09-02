import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { DemoScreen } from "../../screens"

export type FavortieStackNavigatorParamList = {
  demo: undefined
}

const Stack = createStackNavigator<FavortieStackNavigatorParamList>()
export const FavortieStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
    </Stack.Navigator>
  )
}
