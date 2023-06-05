import React, { ReactElement } from "react";
import { ScrollView, TouchableOpacity, View, Switch } from "react-native";
import { GradientBackground, Text } from "@components";
import styles from "./settings.style";
import { colors } from "@utils";
import { difficulties, useSettings } from "@contexts/setting-context";

export default function Setting(): ReactElement | null {
  const { settings, saveSetting } = useSettings();
  if (!settings) return null;
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.field}>
          <Text weight="700" style={styles.label}>
            Bot Difficulty
          </Text>
          <View style={styles.choices}>
            {Object.keys(difficulties).map((level) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    saveSetting(
                      "difficulty",
                      level as keyof typeof difficulties
                    );
                  }}
                  key={level}
                  style={[
                    styles.subChoice,
                    {
                      backgroundColor:
                        settings.difficulty === level
                          ? colors.blueSky
                          : colors.lightGreen,
                    },
                  ]}
                >
                  <Text
                    weight="700"
                    style={[
                      styles.choiceText,
                      {
                        color:
                          settings.difficulty === level
                            ? colors.lightGreen
                            : colors.darkPurple,
                      },
                    ]}
                  >
                    {difficulties[level as "1" | "3" | "4" | "-1"]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[styles.field, styles.switchField]}>
          <Text style={styles.label} weight="700">
            Sounds
          </Text>
          <Switch
            trackColor={{ false: colors.purple, true: colors.blueSky }}
            ios_backgroundColor={colors.lightGreen}
            value={settings.sounds}
            onValueChange={() => {
              saveSetting("sounds", !settings.sounds);
            }}
          />
        </View>

        <View style={[styles.field, styles.switchField]}>
          <Text style={styles.label} weight="700">
            Hapitic/Vibrations
          </Text>
          <Switch
            trackColor={{ false: colors.purple, true: colors.blueSky }}
            ios_backgroundColor={colors.lightGreen}
            value={settings.haptics}
            onValueChange={() => {
              saveSetting("haptics", !settings.haptics);
            }}
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
