import React, { ReactNode, ReactElement } from "react";
import { Text as NativeText, TextProps as NativeTextProps } from "react-native";

type TextProps = {
  weight?: "300" | "400" | "700";
  children?: ReactNode;
} & NativeTextProps;

const customDefaultProps = {
  weight: "400",
};

Text.defaultProps = customDefaultProps;

export default function Text({
  children,
  style,
  weight,
  ...props
}: TextProps): ReactElement {
  let fontFamily;
  if (weight === "300") {
    fontFamily = "NotoSansThaiLooped_300Regular";
  }
  if (weight === "400") {
    fontFamily = "NotoSansThaiLooped_400Regular";
  }
  if (weight === "700") {
    fontFamily = "NotoSansThaiLooped_700Bold";
  }
  return (
    <NativeText {...props} style={[{ fontFamily: fontFamily }, style]}>
      {children}
    </NativeText>
  );
}
