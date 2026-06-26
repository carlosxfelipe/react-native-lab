import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";

const PRODUCTS = [
  { id: "1", name: "Tênis Runner Pro", price: "R$ 299,90", tag: "Novo" },
  { id: "2", name: "Mochila Urban", price: "R$ 149,90", tag: "Oferta" },
  { id: "3", name: "Fone Bluetooth", price: "R$ 189,90", tag: null },
  { id: "4", name: "Camiseta Dry-Fit", price: "R$ 79,90", tag: "Oferta" },
  { id: "5", name: "Relógio Sport", price: "R$ 449,90", tag: "Novo" },
  { id: "6", name: "Garrafa Térmica", price: "R$ 59,90", tag: null },
  { id: "7", name: "Óculos UV400", price: "R$ 129,90", tag: null },
  { id: "8", name: "Boné Snapback", price: "R$ 69,90", tag: "Oferta" },
];

export function ProductGrid() {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <ThemedText style={styles.sectionTitle}>Destaques da semana</ThemedText>
      <View style={styles.grid}>
        {PRODUCTS.map((product) => (
          <Pressable
            key={product.id}
            style={({ pressed }) => [
              styles.card,
              {
                backgroundColor: theme.backgroundElement,
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          >
            <View
              style={[
                styles.cardImagePlaceholder,
                { backgroundColor: theme.backgroundSelected },
              ]}
            />
            {product.tag && (
              <View style={[styles.tag, { backgroundColor: theme.primary }]}>
                <ThemedText style={styles.tagText}>{product.tag}</ThemedText>
              </View>
            )}
            <View style={styles.cardBody}>
              <ThemedText style={styles.cardName} numberOfLines={2}>
                {product.name}
              </ThemedText>
              <ThemedText style={styles.cardPrice}>{product.price}</ThemedText>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    width: "47%",
    borderRadius: 12,
    overflow: "hidden",
  },
  cardImagePlaceholder: {
    width: "100%",
    aspectRatio: 1,
  },
  tag: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#ffffff",
  },
  cardBody: {
    padding: 10,
    gap: 4,
  },
  cardName: {
    fontSize: 13,
    fontWeight: "500",
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "700",
  },
});
