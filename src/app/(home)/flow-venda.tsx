import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { useTheme } from "@/hooks/use-theme";
import { wizardStore } from "@/stores/wizard-store";

const PRODUCTS = [
  { id: 0, name: "Filtro de Ar Industrial", sku: "FAI-001", price: 89.9 },
  { id: 1, name: "Lubrificante 5W-30 (1L)", sku: "LUB-030", price: 49.9 },
  { id: 2, name: "Correia Dentada V8", sku: "COR-V8X", price: 34.5 },
  { id: 3, name: "Parafuso Sextavado M10", sku: "PAR-M10", price: 8.9 },
];

export default function FlowVendaScreen() {
  const [quantities, setQuantities] = useState<number[]>(PRODUCTS.map(() => 0));
  const router = useRouter();
  const theme = useTheme();

  const update = (index: number, delta: number) => {
    setQuantities((prev) => {
      const next = [...prev];
      next[index] = Math.max(0, next[index] + delta);
      return next;
    });
  };

  const total = quantities.reduce(
    (acc, qty, i) => acc + qty * PRODUCTS[i].price,
    0
  );
  const hasItems = quantities.some((q) => q > 0);

  const handleConfirm = () => {
    wizardStore.complete(3);
    router.back();
  };

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <Icon
          name="cart-outline"
          size={28}
          color={theme.primary}
          animated={false}
        />
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Selecione os produtos
        </Text>
      </View>

      <View style={styles.list}>
        {PRODUCTS.map((product, index) => (
          <View
            key={product.id}
            style={[
              styles.productItem,
              {
                backgroundColor: theme.backgroundElement,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.productInfo}>
              <Text style={[styles.productName, { color: theme.text }]}>
                {product.name}
              </Text>
              <Text style={[styles.productSku, { color: theme.textSecondary }]}>
                {product.sku} · R$ {product.price.toFixed(2)}
              </Text>
            </View>

            <View style={styles.qtyControl}>
              <TouchableOpacity
                onPress={() => update(index, -1)}
                style={[styles.qtyButton, { borderColor: theme.border }]}
                disabled={quantities[index] === 0}
              >
                <Icon
                  name="minus"
                  size={16}
                  color={quantities[index] === 0 ? theme.border : theme.primary}
                  animated={false}
                />
              </TouchableOpacity>
              <Text style={[styles.qtyValue, { color: theme.text }]}>
                {quantities[index]}
              </Text>
              <TouchableOpacity
                onPress={() => update(index, 1)}
                style={[styles.qtyButton, { borderColor: theme.border }]}
              >
                <Icon
                  name="plus"
                  size={16}
                  color={theme.primary}
                  animated={false}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View
        style={[
          styles.totalRow,
          { borderTopColor: theme.border },
        ]}
      >
        <Text style={[styles.totalLabel, { color: theme.textSecondary }]}>
          Total
        </Text>
        <Text style={[styles.totalValue, { color: theme.text }]}>
          R$ {total.toFixed(2)}
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          variant="filled"
          size="lg"
          shape="rounded"
          disabled={!hasItems}
          onPress={handleConfirm}
        >
          Confirmar venda
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  list: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 10,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  productInfo: {
    flex: 1,
    gap: 3,
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
  },
  productSku: {
    fontSize: 12,
  },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyValue: {
    fontSize: 15,
    fontWeight: "600",
    minWidth: 20,
    textAlign: "center",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  totalLabel: {
    fontSize: 15,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
});
