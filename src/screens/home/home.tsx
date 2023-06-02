import React, { ReactElement } from "react";
import { ScrollView, Image, View } from "react-native";
import styles from "./home.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "src/config/navigator";
import { GradientBackground, Button } from "@components";

type HomeProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Home">;
};

export default function Home({ navigation }: HomeProps): ReactElement {
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.logo} source={require("@assets/home-icon6.png")} />
        <View style={styles.buttons}>
          <Button style={styles.button} title="Single Player" />
          <Button style={styles.button} title="Multiplayer" />
          <Button style={styles.button} title="Login" />
          <Button style={styles.button} title="Setting" />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
