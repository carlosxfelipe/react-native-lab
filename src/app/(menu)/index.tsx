import { Stack } from "expo-router";
import { Platform, ScrollView, StyleSheet } from "react-native";

import { Icon } from "@/components/icon";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";

export default function MenuScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Icon
              name="magnify"
              size={22}
              color={theme.text}
              onPress={() => console.log("Search pressed!")}
              style={Platform.OS === "web" ? { marginRight: 16 } : undefined}
            />
          ),
        }}
      />
      <ScrollView
        style={[styles.scrollView, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.contentContainer}
        contentInsetAdjustmentBehavior="automatic"
      >
        <ThemedText>Menu</ThemedText>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
});
