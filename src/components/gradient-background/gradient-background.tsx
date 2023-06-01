import React, { ReactElement, ReactNode } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

type GradientBackgroundProps = {
  children: ReactNode;
};

export default function GradientBackground({
  children,
}: GradientBackgroundProps): ReactElement {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["#BB8FA9", "#D59DC5", "#D59DC5", "#E4AEC5", "#D5B4B4"]}
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
        }}
      />
      {children}
    </View>
  );
}
