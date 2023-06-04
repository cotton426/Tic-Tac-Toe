import React, { ReactElement, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View, Switch } from "react-native";
import { GradientBackground, Text } from "@components";
import styles from "./settings.style";
import { colors } from "@utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const difficulties = {
  "1": "Beginner",
  "3": "Intermediate",
  "4": "Hard",
  "-1": "Impossible",
};

type settingType = {
  difficulty: keyof typeof difficulties;
  haptics: boolean;
  sounds: boolean;
};

const defaultSettings: settingType = {
  difficulty: "-1",
  haptics: true,
  sounds: true,
};

export default function Setting(): ReactElement | null {
  const [settings, setSettings] = useState<settingType | null>(null); //null if we dont load anything yet

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem("@settings");
      settings !== null
        ? setSettings(JSON.parse(settings))
        : setSettings(defaultSettings);
    } catch (error) {
      setSettings(defaultSettings);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

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
                    weight="400"
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
            // onValueChange={() => {
            //   setState(!state);
            // }}
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
            // onValueChange={() => {
            //   setState(!state);
            // }}
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
