import { Stack, useNavigation, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Icon, IconName } from "@/components/icon";
import { Stepper, StepperStep } from "@/components/stepper";
import { useTheme } from "@/hooks/use-theme";
import { wizardStore } from "@/stores/wizard-store";

type WizardStep = StepperStep & {
  icon: IconName;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel?: string;
  flowRoute: string;
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
    flowRoute: "/flow-equipamento",
  },
  {
    label: "Execução",
    icon: "lightning-bolt",
    title: "Execução",
    description:
      "Maecenas interdum laoreet diam, eu tempor odio dignissim id vivamus ut.",
    primaryLabel: "Iniciar execução",
    secondaryLabel: "Pular etapa",
    flowRoute: "/flow-execucao",
  },
  {
    label: "Missão",
    icon: "flag",
    title: "Missão",
    description: "Curabitur lobortis auctor ligula nec laoreet.",
    primaryLabel: "Iniciar missão",
    secondaryLabel: "Pular etapa",
    flowRoute: "/flow-missao",
  },
  {
    label: "Venda",
    icon: "cart",
    title: "Venda",
    description:
      "Vestibulum id ligula porta felis euismod semper. Nulla vitae elit libero, a pharetra augue est non commodo luctus, nisi erat.",
    primaryLabel: "Iniciar venda",
    secondaryLabel: "Registrar não venda",
    flowRoute: "/flow-venda",
  },
];

export default function WizardScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [pagerHeight, setPagerHeight] = useState(0);
  const router = useRouter();
  const navigation = useNavigation();
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const translateX = useSharedValue(0);
  const currentStepRef = useRef(currentStep);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const goTo = useCallback(
    (index: number) => {
      setCurrentStep(index);
      translateX.value = withTiming(-index * width, { duration: 350 });
    },
    [translateX, width],
  );

  useEffect(() => {
    const nav = navigation as any;
    const unsubscribe = nav.addListener("focus", () => {
      const completed = wizardStore.consume();
      if (completed !== null && completed === currentStepRef.current) {
        if (completed < STEPS.length - 1) {
          goTo(completed + 1);
        } else {
          router.back();
        }
      }
    });
    return unsubscribe;
  }, [navigation, goTo, router]);

  const handlePrimary = () => {
    router.push(STEPS[currentStep].flowRoute as any);
  };

  const handleSecondary = () => {
    if (currentStep < STEPS.length - 1) {
      goTo(currentStep + 1);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.headerSpacer} />

      <Stepper steps={STEPS} currentStep={currentStep} />

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
                  {step.primaryLabel}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSpacer: {
    height: 48,
  },
  pager: {
    flex: 1,
    overflow: "hidden",
  },
  stepContent: {
    padding: 24,
    justifyContent: "space-between",
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
