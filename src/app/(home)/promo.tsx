import { useRef } from "react";
import { Animated, Image, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ProductGrid } from "@/components/product-grid";
import { ScrollHeader } from "@/components/scroll-header";
import { useTheme } from "@/hooks/use-theme";

const BANNER_HEIGHT = 180;

export default function PromoScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const bannerOpacity = scrollY.interpolate({
    inputRange: [0, BANNER_HEIGHT * 0.8],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View
        style={[styles.bannerWrapper, { opacity: bannerOpacity }]}
        pointerEvents="none"
      >
        <Image
          source={require("@/../assets/images/banner1.png")}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: Platform.OS !== "web" },
        )}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={{ height: BANNER_HEIGHT }} />

        <View style={[styles.content, { backgroundColor: theme.background }]}>
          <ProductGrid />
        </View>
      </Animated.ScrollView>

      <View
        style={[
          styles.statusBarFill,
          { height: insets.top, backgroundColor: theme.background },
        ]}
      />
      <ScrollHeader
        scrollY={scrollY}
        title="Promos"
        bannerHeight={BANNER_HEIGHT}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: BANNER_HEIGHT,
    zIndex: 0,
  },
  bannerImage: {
    width: "100%",
    height: BANNER_HEIGHT,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  statusBarFill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 3,
  },
});
