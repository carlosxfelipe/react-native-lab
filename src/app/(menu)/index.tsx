import { Stack } from "expo-router";
import { Linking, Platform, ScrollView, StyleSheet, View } from "react-native";

import { ActionCard } from "@/components/action-card";
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
        <View style={styles.header}>
          <ThemedText style={{ fontSize: 24, fontWeight: "bold" }}>
            Menu Principal
          </ThemedText>
          <ThemedText type="small" style={{ opacity: 0.7, marginTop: 4 }}>
            Visão geral e ajustes.
          </ThemedText>
        </View>

        <ActionCard
          title="Sobre o App"
          description="React Native 0.85.3 | Expo 56"
          iconName="information-outline"
        />

        <ActionCard
          title="Tema e Aparência"
          description="O modo claro e escuro é gerenciado automaticamente pelas definições do seu sistema operacional."
          iconName="cog-outline"
        />

        <ActionCard
          title="Código Fonte"
          description="Acessar repositório no GitHub"
          iconName="github"
          onPress={() =>
            Linking.openURL("https://github.com/carlosxfelipe/react-native-lab")
          }
        />
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
    gap: 16,
  },
  header: {
    marginBottom: 8,
  },
});
