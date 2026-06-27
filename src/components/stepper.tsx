import { useEffect, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { Icon } from "@/components/icon";
import { useTheme } from "@/hooks/use-theme";

const STEP_WIDTH = 72;
const CONNECTOR_WIDTH = 44;
const ICON_SIZE = 28;
// Compensate for the intrinsic whitespace padding inside the vector font glyph
const GLYPH_PADDING = 2;
const CONNECTOR_OVERLAP = (STEP_WIDTH - ICON_SIZE) / 2 + GLYPH_PADDING;

export type StepperStep = {
  label: string;
};

type StepperProps = {
  steps: StepperStep[];
  currentStep: number;
  onStepPress?: (step: number) => void;
};

function StepCircle({
  index,
  currentStep,
  onStepPress,
}: {
  index: number;
  currentStep: number;
  onStepPress?: (step: number) => void;
}) {
  const theme = useTheme();
  const done = index < currentStep;
  const active = index === currentStep;

  return (
    <View style={styles.circleWrapper}>
      {done ? (
        <Icon
          name="check-circle"
          size={ICON_SIZE + GLYPH_PADDING * 2} // 28 + 4 = 32 (compensates for font padding so the drawn circle is exactly 28)
          color={theme.primary}
          animated={!!onStepPress}
          onPress={onStepPress ? () => onStepPress(index) : undefined}
        />
      ) : (
        <View
          style={[
            styles.numberCircle,
            {
              backgroundColor: active ? theme.primary : theme.background,
              borderColor: active ? theme.primary : theme.border,
            },
          ]}
        >
          <Text
            style={[
              styles.numberText,
              { color: active ? theme.background : theme.textSecondary },
            ]}
          >
            {index + 1}
          </Text>
        </View>
      )}
    </View>
  );
}

function StepConnector({
  index,
  currentStep,
}: {
  index: number;
  currentStep: number;
}) {
  const theme = useTheme();
  const done = index < currentStep;

  return (
    <View
      style={[
        styles.connector,
        { backgroundColor: done ? theme.primary : theme.border },
      ]}
    />
  );
}

function StepLabel({
  step,
  index,
  currentStep,
}: {
  step: StepperStep;
  index: number;
  currentStep: number;
}) {
  const theme = useTheme();
  const done = index < currentStep;
  const active = index === currentStep;

  return (
    <Text
      style={[
        styles.label,
        { color: done || active ? theme.text : theme.textSecondary },
        active && styles.labelActive,
      ]}
      numberOfLines={1}
    >
      {step.label}
    </Text>
  );
}

export function Stepper({ steps, currentStep, onStepPress }: StepperProps) {
  const { width: screenWidth } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const centerX =
      16 + currentStep * (STEP_WIDTH + CONNECTOR_WIDTH) + STEP_WIDTH / 2;
    const targetX = centerX - screenWidth / 2;
    scrollRef.current?.scrollTo({ x: Math.max(0, targetX), animated: true });
  }, [currentStep, screenWidth]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={styles.content}
    >
      {/* Wrap both rows in a View so they stack vertically inside the horizontal ScrollView */}
      <View style={{ flexDirection: "column" }}>
        {/* Circles + connectors row */}
        <View style={styles.circlesRow}>
          {steps.map((_, i) => (
            <View key={i} style={styles.circleCell}>
              <StepCircle
                index={i}
                currentStep={currentStep}
                onStepPress={onStepPress}
              />
              {i < steps.length - 1 && (
                <StepConnector index={i} currentStep={currentStep} />
              )}
            </View>
          ))}
        </View>

        {/* Labels row */}
        <View style={styles.labelsRow}>
          {steps.map((step, i) => (
            <View key={i} style={styles.labelCell}>
              <StepLabel step={step} index={i} currentStep={currentStep} />
              {i < steps.length - 1 && <View style={styles.labelSpacer} />}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  circlesRow: {
    flexDirection: "row",
  },
  circleCell: {
    flexDirection: "row",
    alignItems: "center",
  },
  circleWrapper: {
    width: STEP_WIDTH,
    alignItems: "center",
  },
  connector: {
    width: CONNECTOR_WIDTH + CONNECTOR_OVERLAP * 2, // Automatically grows to fill the gap
    height: 2,
    marginLeft: -CONNECTOR_OVERLAP, // Dynamically pulls exactly to the icon edge
    marginRight: -CONNECTOR_OVERLAP,
    flexShrink: 0, // CRITICAL: prevents React Native from squishing the line!
    zIndex: -1,
  },
  numberCircle: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontSize: 13,
    fontWeight: "700",
  },
  labelsRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  labelCell: {
    flexDirection: "row",
  },
  label: {
    width: STEP_WIDTH,
    fontSize: 11,
    textAlign: "center",
  },
  labelActive: {
    fontWeight: "600",
  },
  labelSpacer: {
    width: CONNECTOR_WIDTH,
  },
});
