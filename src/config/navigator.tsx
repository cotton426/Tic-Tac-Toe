import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { Home, SinglePlayerGame, Settings } from "@screens";
import { colors } from "@utils";

export type StackNavigatorParams = {
  Home: undefined;
  SinglePlayerGame: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();

const navigatorOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.pinkHeader,
  },
  headerTintColor: colors.lightGreen,
  headerTitleStyle: {
    fontFamily: "NotoSansThaiLooped_700Bold",
    fontSize: 18,
  },
};

export default function Navigator(): ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={navigatorOptions}
        // screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SinglePlayerGame" component={SinglePlayerGame} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
