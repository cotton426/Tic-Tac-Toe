import React, { ReactElement, ReactNode } from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  NotoSansThaiLooped_300Light,
  NotoSansThaiLooped_400Regular,
  NotoSansThaiLooped_700Bold,
} from "@expo-google-fonts/noto-sans-thai-looped";

type AppBootstrapProps = {
  children: ReactNode;
};

export default function AppBootstrap({
  children,
}: AppBootstrapProps): ReactElement {
  const [fontLoading] = useFonts({
    NotoSansThaiLooped_300Light,
    NotoSansThaiLooped_400Regular,
    NotoSansThaiLooped_700Bold,
  });
  return fontLoading ? <>{children}</> : <AppLoading />;
}
