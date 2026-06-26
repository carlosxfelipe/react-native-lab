import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter } from "expo-router";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/hooks/use-theme";

const HEADER_BAR_HEIGHT = 44;

type Props = {
  scrollY: Animated.Value;
  title: string;
  bannerHeight: number;
};

export function ScrollHeader({ scrollY, title, bannerHeight }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const opacity = scrollY.interpolate({
    inputRange: [bannerHeight * 0.4, bannerHeight * 0.8],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const translateY = scrollY.interpolate({
    inputRange: [0, bannerHeight * 0.8],
    outputRange: [-60, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateY }],
          backgroundColor: theme.background,
          height: insets.top + HEADER_BAR_HEIGHT,
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialDesignIcons name="arrow-left" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <View style={styles.backButton} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
  },
});
