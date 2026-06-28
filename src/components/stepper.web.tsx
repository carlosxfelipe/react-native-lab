import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, Text, View } from "react-native";

export type StepperStep = {
  label: string;
};

type StepperProps = {
  steps: StepperStep[];
  currentStep: number;
  onStepPress?: (step: number) => void;
};

export function Stepper({ steps, currentStep }: StepperProps) {
  const theme = useTheme();

  // Calculate progress percentage (0 to 100)
  // If there's only 1 step, it's 100%. Otherwise, base it on current index.
  const progressPercentage =
    steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 100;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header Text: Etapa X de Y - Nome */}
        <View style={styles.headerRow}>
          <Text style={[styles.stepCounter, { color: theme.textSecondary }]}>
            Etapa {currentStep + 1} de {steps.length}
          </Text>
          <Text style={[styles.stepLabel, { color: theme.text }]}>
            {steps[currentStep]?.label}
          </Text>
        </View>

        {/* Progress Bar Background */}
        <View style={[styles.track, { backgroundColor: theme.border }]}>
          {/* Active Progress Fill */}
          <View
            style={[
              styles.fill,
              {
                backgroundColor: theme.primary,
                width: `${progressPercentage}%`,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 16,
  },
  content: {
    width: "100%",
    maxWidth: 600,
    paddingHorizontal: 24,
    gap: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  stepCounter: {
    fontSize: 13,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  stepLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
  track: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 3,
    // Add CSS transition for smooth progress animation on web
    ...({
      transitionProperty: "width",
      transitionDuration: "300ms",
      transitionTimingFunction: "ease-in-out",
    } as any),
  },
});
