import { Stack, useRouter } from "expo-router";
import { Platform, ScrollView, StyleSheet, View } from "react-native";

import { ActionCard } from "@/components/action-card";
import { Icon } from "@/components/icon";
import { ThemedText } from "@/components/themed-text";

import { useTheme } from "@/hooks/use-theme";

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Icon
              name="bell-outline"
              size={22}
              color={theme.text}
              onPress={() => console.log("Bell pressed!")}
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
            Bem-vindo ao App
          </ThemedText>
          <ThemedText type="small" style={{ opacity: 0.7, marginTop: 4 }}>
            Explore as funcionalidades abaixo
          </ThemedText>
        </View>

        <ActionCard
          title="Banner Dinâmico"
          description="Veja um exemplo de cabeçalho animado e interativo."
          iconName="image-outline"
          onPress={() => router.push("/promo")}
        />

        <ActionCard
          title="Iniciar Novo Fluxo"
          description="Navegue por um fluxo passo a passo estilo wizard."
          iconName="play-circle-outline"
          onPress={() => router.push("/wizard")}
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
