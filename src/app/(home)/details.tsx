import { ThemedText } from "@/components/themed-text";
import { useResponsive } from "@/hooks/use-responsive";
import { useTheme } from "@/hooks/use-theme";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function DetailsScreen() {
  const theme = useTheme();
  const { isDesktop } = useResponsive();

  return (
    <>
      <Stack.Screen options={{ headerShown: !isDesktop }} />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ThemedText>Look at the back arrow up there! ⬆️</ThemedText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
