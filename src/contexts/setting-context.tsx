import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const difficulties = {
  "1": "Beginner",
  "2": "Intermediate",
  "3": "Hard",
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

type setttingContextType = {
  settings: settingType | null;
  loadSettings: () => void;
  saveSetting: <T extends keyof settingType>(
    setting: T,
    value: settingType[T]
  ) => void;
};

const SettingsContext = createContext<setttingContextType | undefined>(
  undefined
); //keep it undefined until we load our settings from AsyncStorage | our defualt

function useSettings(): setttingContextType {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("must be use within a settingsProvider");
  }
  return context;
}

function SettingsProvider(props: { children: ReactNode }): ReactElement {
  const [settings, setSettings] = useState<settingType | null>(null); //null if we dont load anything yet

  const saveSetting = async <T extends keyof settingType>(
    setting: T,
    value: settingType[T]
  ) => {
    try {
      const oldSettings = settings ? settings : defaultSettings; //if settting is null load defaults
      const newSettings = { ...oldSettings, [setting]: value };
      const jsonSettings = JSON.stringify(newSettings);
      await AsyncStorage.setItem("@settings", jsonSettings); //json work on storage
      setSettings(newSettings); // after update settings in storage--> need to update our settings
    } catch (error) {
      Alert.alert("Error", "Error loading ");
    }
  };

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

  return (
    <SettingsContext.Provider
      {...props}
      value={{
        settings,
        saveSetting,
        loadSettings,
      }}
    />
  );
}

export { useSettings, SettingsProvider, difficulties };
