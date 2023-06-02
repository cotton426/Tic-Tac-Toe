import React, { ReactElement } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import styles from "./button.style";
import { Text } from "@components";

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

export default function Button({
  title,
  style,
  ...props
}: ButtonProps): ReactElement {
  return (
    <TouchableOpacity {...props} style={[styles.button, style]}>
      <Text weight="700" style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
