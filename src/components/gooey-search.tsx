import { useCallback, useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export type GooeySearchProps = Omit<
  TextInputProps,
  "style" | "editable" | "autoFocus" | "multiline"
> & {
  collapsedLabel?: string;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSearch?: (query: string) => void;
  style?: StyleProp<ViewStyle>;
};

const HEIGHT = 54;
const OFFSET = HEIGHT + 12;
const COLLAPSED_WIDTH = 132;
const EXPANDED_WIDTH = 320;

/** Native adaptation of Aceternity's expanding search input. */
export function GooeySearch({
  collapsedLabel = "Search",
  placeholder = "Search...",
  disabled = false,
  value,
  defaultValue = "",
  onChangeText,
  onOpenChange,
  onSearch,
  onBlur,
  onSubmitEditing,
  style,
  ...inputProps
}: GooeySearchProps) {
  const inputRef = useRef<TextInput>(null);
  const openRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [availableWidth, setAvailableWidth] = useState(EXPANDED_WIDTH);
  const progress = useSharedValue(0);
  const query = value ?? internalValue;
  const expandedWidth = Math.min(EXPANDED_WIDTH, availableWidth);
  const collapsedWidth = Math.min(COLLAPSED_WIDTH, availableWidth);

  const changeOpen = useCallback(
    (nextOpen: boolean) => {
      if ((disabled && nextOpen) || openRef.current === nextOpen) return;
      openRef.current = nextOpen;
      setIsOpen(nextOpen);
      onOpenChange?.(nextOpen);
      if (!nextOpen) inputRef.current?.blur();
    },
    [disabled, onOpenChange],
  );

  useEffect(() => {
    progress.value = withSpring(isOpen ? 1 : 0, {
      damping: 22,
      stiffness: 240,
      mass: 0.8,
      overshootClamping: true,
    });
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [isOpen, progress]);

  useEffect(() => {
    if (disabled) changeOpen(false);
  }, [disabled, changeOpen]);

  const containerAnimation = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [collapsedWidth, expandedWidth]),
  }));
  const fieldAnimation = useAnimatedStyle(() => ({
    left: OFFSET * progress.value,
    width: interpolate(
      progress.value,
      [0, 1],
      [collapsedWidth, Math.max(0, expandedWidth - OFFSET)],
    ),
  }));
  const labelAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.25], [1, 0], Extrapolation.CLAMP),
  }));
  const inputAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.45, 1], [0, 1], Extrapolation.CLAMP),
  }));
  // A shrinking connection approximates the web SVG goo filter with native views.
  const bridgeAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0, 0.6, 0.9, 1],
      [0, 1, 1, 0],
      Extrapolation.CLAMP,
    ),
    transform: [{ scaleY: 1 - progress.value }],
  }));

  return (
    <View
      style={[styles.wrapper, style, disabled && styles.disabled]}
      onLayout={(event) => setAvailableWidth(event.nativeEvent.layout.width)}
    >
      <Animated.View style={[styles.container, containerAnimation]}>
        <Animated.View
          pointerEvents="none"
          style={[styles.bridge, bridgeAnimation]}
        />
        <Animated.View style={[styles.field, fieldAnimation]}>
          <Animated.View
            pointerEvents={isOpen ? "auto" : "none"}
            style={[styles.inputContainer, inputAnimation]}
            accessibilityElementsHidden={!isOpen}
            importantForAccessibility={isOpen ? "auto" : "no-hide-descendants"}
          >
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
              submitBehavior="blurAndSubmit"
              selectionColor="#1f1f1f"
              placeholderTextColor="#898989"
              accessibilityLabel="Search"
              {...inputProps}
              ref={inputRef}
              style={styles.input}
              placeholder={placeholder}
              value={query}
              editable={isOpen && !disabled}
              underlineColorAndroid="transparent"
              onChangeText={(text) => {
                if (value === undefined) setInternalValue(text);
                onChangeText?.(text);
              }}
              onBlur={(event) => {
                if (!query.trim()) changeOpen(false);
                onBlur?.(event);
              }}
              onSubmitEditing={(event) => {
                onSearch?.(event.nativeEvent.text.trim());
                onSubmitEditing?.(event);
              }}
            />
          </Animated.View>
        </Animated.View>
        <View pointerEvents="none" style={styles.iconBubble}>
          <View style={styles.searchIcon}>
            <View style={styles.searchRing} />
            <View style={styles.searchHandle} />
          </View>
        </View>
        <Animated.Text
          pointerEvents="none"
          numberOfLines={1}
          style={[styles.label, labelAnimation]}
          accessibilityElementsHidden
          importantForAccessibility="no"
        >
          {query || collapsedLabel}
        </Animated.Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isOpen ? "Close search" : "Open search"}
          accessibilityHint={isOpen ? "Collapses the search field" : "Opens the search field and keyboard"}
          accessibilityState={{ expanded: isOpen, disabled }}
          disabled={disabled}
          onPress={() => changeOpen(!openRef.current)}
          style={[styles.trigger, { width: isOpen ? HEIGHT : collapsedWidth }]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: "100%", alignItems: "center" },
  disabled: { opacity: 0.45 },
  container: { height: HEIGHT },
  field: {
    position: "absolute",
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    backgroundColor: "#fafafa",
    overflow: "hidden",
  },
  bridge: {
    position: "absolute",
    left: HEIGHT - 12,
    width: 36,
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    backgroundColor: "#fafafa",
  },
  inputContainer: { flex: 1 },
  input: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 0,
    color: "#262626",
    fontSize: 16,
  },
  iconBubble: {
    position: "absolute",
    left: 0,
    height: HEIGHT,
    width: HEIGHT,
    borderRadius: HEIGHT / 2,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: { width: 22, height: 22 },
  searchRing: {
    position: "absolute",
    top: 2,
    left: 2,
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 1.8,
    borderColor: "#262626",
  },
  searchHandle: {
    position: "absolute",
    top: 16,
    left: 14,
    height: 1.8,
    width: 7,
    borderRadius: 1,
    backgroundColor: "#262626",
    transform: [{ rotate: "45deg" }],
  },
  label: {
    position: "absolute",
    left: 48,
    right: 16,
    height: HEIGHT,
    lineHeight: HEIGHT,
    color: "#404040",
    fontSize: 16,
  },
  trigger: { position: "absolute", left: 0, height: HEIGHT, borderRadius: HEIGHT / 2 },
});
