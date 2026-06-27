import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { useTheme } from "@/hooks/use-theme";
import { wizardStore } from "@/stores/wizard-store";

const MISSION = {
  id: "#2847",
  title: "Vistoria Técnica",
  priority: "ALTA",
  location: "Setor 3 — Galpão Principal",
  deadline: "27/06/2025 às 18:00",
  description:
    "Realizar vistoria técnica completa dos equipamentos do Setor 3, verificando condições de funcionamento e registrando eventuais não conformidades.",
};

export default function FlowMissaoScreen() {
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleAccept = () => setAccepted(true);

  const handleConfirm = () => {
    wizardStore.complete(2);
    router.back();
  };

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.content}>
        {!accepted ? (
          <>
            <View style={styles.iconRow}>
              <Icon name="flag" size={64} color={theme.primary} animated={false} />
              <View style={[styles.priorityBadge, { backgroundColor: "#FF3B3022" }]}>
                <Text style={[styles.priorityText, { color: "#FF3B30" }]}>
                  {MISSION.priority}
                </Text>
              </View>
            </View>

            <Text style={[styles.title, { color: theme.text }]}>
              Missão {MISSION.id}
            </Text>
            <Text style={[styles.missionTitle, { color: theme.primary }]}>
              {MISSION.title}
            </Text>

            <View
              style={[
                styles.card,
                { backgroundColor: theme.backgroundElement, borderColor: theme.border },
              ]}
            >
              <MissionRow
                icon="map-marker-outline"
                label="Local"
                value={MISSION.location}
                theme={theme}
              />
              <MissionRow
                icon="clock-outline"
                label="Prazo"
                value={MISSION.deadline}
                theme={theme}
              />
            </View>

            <Text style={[styles.description, { color: theme.textSecondary }]}>
              {MISSION.description}
            </Text>
          </>
        ) : (
          <>
            <Icon
              name="check-circle"
              size={72}
              color={theme.primary}
              animated={false}
            />
            <Text style={[styles.title, { color: theme.text }]}>
              Missão aceita!
            </Text>
            <Text style={[styles.description, { color: theme.textSecondary }]}>
              Missão {MISSION.id} registrada com sucesso. Dirija-se ao{" "}
              {MISSION.location} para iniciar a vistoria.
            </Text>
          </>
        )}
      </View>

      <View style={styles.footer}>
        {!accepted ? (
          <>
            <Button
              variant="filled"
              size="lg"
              shape="rounded"
              onPress={handleAccept}
            >
              Aceitar missão
            </Button>
            <Button
              variant="outline"
              size="lg"
              shape="rounded"
              onPress={() => router.back()}
            >
              Recusar
            </Button>
          </>
        ) : (
          <Button
            variant="filled"
            size="lg"
            shape="rounded"
            onPress={handleConfirm}
          >
            Concluir etapa
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
}

function MissionRow({
  icon,
  label,
  value,
  theme,
}: {
  icon: string;
  label: string;
  value: string;
  theme: ReturnType<typeof import("@/hooks/use-theme").useTheme>;
}) {
  return (
    <View style={styles.missionRow}>
      <Icon name={icon as any} size={18} color={theme.textSecondary} animated={false} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.rowLabel, { color: theme.textSecondary }]}>{label}</Text>
        <Text style={[styles.rowValue, { color: theme.text }]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 16,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  missionTitle: {
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
    marginTop: -8,
  },
  card: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 14,
  },
  missionRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  rowLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
  },
  footer: {
    padding: 24,
    gap: 12,
  },
});
