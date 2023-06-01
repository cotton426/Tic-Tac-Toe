import React, { ReactElement } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import styles from "./home.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "src/config/navigator";
import { LinearGradient } from "expo-linear-gradient";

type HomeProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Home">;
};

export default function Home({ navigation }: HomeProps): ReactElement {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#9A86A4", "#B1BCE6"]}
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Home</Text>
        <Button
          title="Game"
          onPress={() => {
            navigation.navigate("Game", { gameId: "89" });
          }}
        />
      </ScrollView>
    </View>
  );
}
