import { StyleSheet, Text, View, Image } from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  NotoSansThaiLooped_100Thin,
  NotoSansThaiLooped_200ExtraLight,
  NotoSansThaiLooped_300Light,
  NotoSansThaiLooped_400Regular,
  NotoSansThaiLooped_500Medium,
  NotoSansThaiLooped_600SemiBold,
  NotoSansThaiLooped_700Bold,
  NotoSansThaiLooped_800ExtraBold,
  NotoSansThaiLooped_900Black,
} from "@expo-google-fonts/noto-sans-thai-looped";

export default function App() {
  const [fontLoading] = useFonts({ NotoSansThaiLooped_300Light });
  if (!fontLoading) return <AppLoading />;
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontFamily: "NotoSansThaiLooped_300Light" }}>
        Heelo
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2E3DB",
    alignItems: "center",
    justifyContent: "center",
  },
});
