import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Icon, IconName } from "@/components/icon";
import { Stepper, StepperStep } from "@/components/stepper";
import { useTheme } from "@/hooks/use-theme";

type WizardStep = StepperStep & {
  icon: IconName;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel?: string;
};

const STEPS: WizardStep[] = [
  {
    label: "Equipamento",
    icon: "cellphone",
    title: "Equipamento",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel volutpat magna, ut fermentum ipsum duis dignissim mi vel.",
    primaryLabel: "Iniciar pesquisa",
    secondaryLabel: "Justificar não pesquisa",
  },
  {
    label: "Execução",
    icon: "lightning-bolt",
    title: "Execução",
    description:
      "Maecenas interdum laoreet diam, eu tempor odio dignissim id vivamus ut.",
    primaryLabel: "Iniciar execução",
    secondaryLabel: "Pular etapa",
  },
  {
    label: "Missão",
    icon: "flag",
    title: "Missão",
    description: "Curabitur lobortis auctor ligula nec laoreet.",
    primaryLabel: "Iniciar missão",
    secondaryLabel: "Pular etapa",
  },
  {
    label: "Venda",
    icon: "cart",
    title: "Venda",
    description:
      "Vestibulum id ligula porta felis euismod semper. Nulla vitae elit libero, a pharetra augue est non commodo luctus, nisi erat.",
    primaryLabel: "Iniciar venda",
    secondaryLabel: "Registrar não venda",
  },
];

export default function WizardScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [pagerHeight, setPagerHeight] = useState(0);
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const goTo = (index: number) => {
    setCurrentStep(index);
    translateX.value = withTiming(-index * width, {
      duration: 350,
    });
  };

  const handlePrimary = () => {
    if (currentStep < STEPS.length - 1) {
      goTo(currentStep + 1);
    } else {
      router.back();
    }
  };

  const handleSecondary = () => {
    if (currentStep < STEPS.length - 1) {
      goTo(currentStep + 1);
    } else {
      router.back();
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background, paddingTop: insets.top },
      ]}
    >
      {/* Stepper — parte do conteúdo, não um header */}
      <View style={styles.stepperContainer}>
        <Stepper steps={STEPS} currentStep={currentStep} onStepPress={goTo} />
      </View>

      {/* Pager com slide horizontal via Reanimated */}
      <View
        style={styles.pager}
        onLayout={(e) => setPagerHeight(e.nativeEvent.layout.height)}
      >
        <Animated.View
          style={[
            { flexDirection: "row", width: width * STEPS.length },
            animatedStyle,
          ]}
        >
          {STEPS.map((step, index) => (
            <View
              key={index}
              style={[styles.stepContent, { width, height: pagerHeight }]}
            >
              <View style={styles.stepMain}>
                <Icon
                  name={step.icon}
                  size={72}
                  color={theme.primary}
                  animated={false}
                />
                <Text style={[styles.stepTitle, { color: theme.text }]}>
                  {step.title}
                </Text>
                <Text style={[styles.stepDesc, { color: theme.textSecondary }]}>
                  {step.description}
                </Text>
              </View>
              <View style={styles.buttonsArea}>
                <Button
                  variant="filled"
                  size="lg"
                  shape="rounded"
                  onPress={handlePrimary}
                >
                  {index === STEPS.length - 1 ? "Concluir" : step.primaryLabel}
                </Button>
                {step.secondaryLabel && (
                  <Button
                    variant="outline"
                    size="lg"
                    shape="rounded"
                    onPress={handleSecondary}
                  >
                    {step.secondaryLabel}
                  </Button>
                )}
              </View>
            </View>
          ))}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepperContainer: {
    marginTop: 16,
  },
  pager: {
    flex: 1,
    overflow: "hidden",
  },
  stepContent: {
    padding: 24,
  },
  stepMain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  stepDesc: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  buttonsArea: {
    gap: 12,
  },
});
