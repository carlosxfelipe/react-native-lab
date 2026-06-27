import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { useTheme } from "@/hooks/use-theme";
import { wizardStore } from "@/stores/wizard-store";

type ScanState = "idle" | "scanning" | "found";

const EQUIPMENT = {
  id: "BRT-042",
  name: "Coletor de Dados Zebra TC52",
  sector: "Almoxarifado B",
  status: "Disponível",
};

export default function FlowEquipamentoScreen() {
  const [state, setState] = useState<ScanState>("idle");
  const router = useRouter();
  const theme = useTheme();
  const opacity = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  useEffect(() => {
    if (state === "scanning") {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.2, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        false
      );
      const timer = setTimeout(() => {
        cancelAnimation(opacity);
        opacity.value = 1;
        setState("found");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const handleConfirm = () => {
    wizardStore.complete(0);
    router.back();
  };

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.content}>
        {state === "idle" && (
          <>
            <Icon
              name="qrcode-scan"
              size={96}
              color={theme.primary}
              animated={false}
            />
            <Text style={[styles.title, { color: theme.text }]}>
              Verificar Equipamento
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Aponte a câmera para o QR Code do equipamento a ser verificado
              neste setor.
            </Text>
          </>
        )}

        {state === "scanning" && (
          <>
            <Animated.View style={animStyle}>
              <Icon
                name="qrcode-scan"
                size={96}
                color={theme.primary}
                animated={false}
              />
            </Animated.View>
            <Text style={[styles.title, { color: theme.text }]}>
              Escaneando...
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Aguarde enquanto o QR Code é processado.
            </Text>
          </>
        )}

        {state === "found" && (
          <>
            <Icon
              name="check-circle"
              size={72}
              color={theme.primary}
              animated={false}
            />
            <Text style={[styles.title, { color: theme.text }]}>
              Equipamento encontrado
            </Text>
            <View
              style={[
                styles.card,
                {
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.border,
                },
              ]}
            >
              <InfoRow label="ID" value={EQUIPMENT.id} theme={theme} />
              <InfoRow label="Nome" value={EQUIPMENT.name} theme={theme} />
              <InfoRow label="Setor" value={EQUIPMENT.sector} theme={theme} />
              <View style={styles.row}>
                <Text style={[styles.label, { color: theme.textSecondary }]}>
                  Status
                </Text>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: "#34C759" + "22" },
                  ]}
                >
                  <Text style={[styles.badgeText, { color: "#34C759" }]}>
                    {EQUIPMENT.status}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </View>

      <View style={styles.footer}>
        {state === "idle" && (
          <Button
            variant="filled"
            size="lg"
            shape="rounded"
            onPress={() => setState("scanning")}
          >
            Iniciar leitura
          </Button>
        )}
        {state === "scanning" && (
          <Button variant="outline" size="lg" shape="rounded" onPress={() => setState("idle")}>
            Cancelar
          </Button>
        )}
        {state === "found" && (
          <Button
            variant="filled"
            size="lg"
            shape="rounded"
            onPress={handleConfirm}
          >
            Confirmar equipamento
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
}

function InfoRow({
  label,
  value,
  theme,
}: {
  label: string;
  value: string;
  theme: ReturnType<typeof import("@/hooks/use-theme").useTheme>;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
      <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
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
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  card: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  footer: {
    padding: 24,
    gap: 12,
  },
});
