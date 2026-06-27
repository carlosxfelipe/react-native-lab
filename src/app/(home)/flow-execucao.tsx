import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { useTheme } from "@/hooks/use-theme";
import { wizardStore } from "@/stores/wizard-store";

const CHECKLIST = [
  { id: 0, label: "Verificar nível de bateria do dispositivo" },
  { id: 1, label: "Confirmar conexão com o servidor" },
  { id: 2, label: "Validar permissões de acesso ao setor" },
  { id: 3, label: "Sincronizar dados pendentes" },
];

export default function FlowExecucaoScreen() {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const router = useRouter();
  const theme = useTheme();

  const toggle = (id: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allChecked = checked.size === CHECKLIST.length;

  const handleConfirm = () => {
    wizardStore.complete(1);
    router.back();
  };

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.content}>
        <Icon
          name="clipboard-check-outline"
          size={64}
          color={theme.primary}
          animated={false}
        />
        <Text style={[styles.title, { color: theme.text }]}>
          Checklist de Execução
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Confirme todos os itens antes de iniciar a execução.
        </Text>

        <View
          style={[
            styles.list,
            { backgroundColor: theme.backgroundElement, borderColor: theme.border },
          ]}
        >
          {CHECKLIST.map((item, index) => {
            const isChecked = checked.has(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.checkItem,
                  index < CHECKLIST.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border,
                  },
                ]}
                onPress={() => toggle(item.id)}
                activeOpacity={0.7}
              >
                <Icon
                  name={isChecked ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"}
                  size={22}
                  color={isChecked ? theme.primary : theme.border}
                  animated={false}
                />
                <Text
                  style={[
                    styles.checkLabel,
                    {
                      color: isChecked ? theme.text : theme.textSecondary,
                      textDecorationLine: isChecked ? "line-through" : "none",
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.counter, { color: theme.textSecondary }]}>
          {checked.size} de {CHECKLIST.length} itens confirmados
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          variant="filled"
          size="lg"
          shape="rounded"
          disabled={!allChecked}
          onPress={handleConfirm}
        >
          Confirmar execução
        </Button>
      </View>
    </SafeAreaView>
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
  list: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  checkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  checkLabel: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  counter: {
    fontSize: 13,
  },
  footer: {
    padding: 24,
  },
});
