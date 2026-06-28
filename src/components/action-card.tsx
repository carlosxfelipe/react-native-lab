import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Icon, IconName } from "@/components/icon";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";

export interface ActionCardProps {
  title: string;
  description: string;
  iconName: IconName;
  onPress?: () => void;
}

export function ActionCard({
  title,
  description,
  iconName,
  onPress,
}: ActionCardProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.cardHeader}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: theme.primary + "20" },
          ]}
        >
          <Icon
            name={iconName}
            size={24}
            color={theme.primary}
            animated={false}
          />
        </View>
        <View style={styles.cardTextContainer}>
          <ThemedText style={styles.cardTitle}>{title}</ThemedText>
          <ThemedText type="small" style={styles.cardDescription}>
            {description}
          </ThemedText>
        </View>
        {onPress && (
          <Icon
            name="chevron-right"
            size={24}
            color={theme.text}
            style={{ opacity: 0.3 }}
            animated={false}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(150, 150, 150, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.15)",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTextContainer: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardDescription: {
    opacity: 0.7,
  },
});
