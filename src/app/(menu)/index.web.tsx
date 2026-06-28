import { Stack } from "expo-router";
import {
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Icon } from "@/components/icon";
import { ThemedText } from "@/components/themed-text";
import { useResponsive } from "@/hooks/use-responsive";
import { useTheme } from "@/hooks/use-theme";

export default function MenuScreen() {
  const theme = useTheme();
  const { isDesktop } = useResponsive();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: !isDesktop,
          headerRight: () => (
            <Icon
              name="magnify"
              size={22}
              color={theme.text}
              onPress={() => console.log("Search pressed!")}
              style={{ marginRight: 16 }}
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

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon
              name="information-outline"
              size={24}
              color={theme.text}
              animated={false}
            />
            <ThemedText type="smallBold">Sobre o App</ThemedText>
          </View>
          <ThemedText type="small">React Native 0.85.3 | Expo 56</ThemedText>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon
              name="cog-outline"
              size={24}
              color={theme.text}
              animated={false}
            />
            <ThemedText type="smallBold">Tema e Aparência</ThemedText>
          </View>
          <ThemedText type="small">
            O modo claro e escuro é gerenciado automaticamente pelas definições
            do seu sistema operacional.
          </ThemedText>
        </View>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            Linking.openURL("https://github.com/carlosxfelipe/react-native-lab")
          }
        >
          <View style={styles.cardHeader}>
            <Icon name="github" size={24} color={theme.text} animated={false} />
            <ThemedText type="smallBold">Código Fonte</ThemedText>
          </View>
          <ThemedText type="small">Acessar repositório no GitHub</ThemedText>
        </TouchableOpacity>
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
  card: {
    padding: 16,
    borderRadius: 12,
    gap: 8,
    backgroundColor: "rgba(150, 150, 150, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.2)",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
