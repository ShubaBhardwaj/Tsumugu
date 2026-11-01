import { useId } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Svg, {
  Defs,
  FeDropShadow,
  Filter,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";

export type FolderIconProps = {
  name: string;
  fileCount: number;
  /** Base folder color in #RGB or #RRGGBB format. */
  color?: string;
  /** Scales the entire 310 × 288 reference design proportionally. */
  width?: number;
  style?: StyleProp<ViewStyle>;
};

const BACK_PATH =
  "M 0 28 C 0 11 11 0 28 0 L 116 0 C 144 0 134 24 165 24 L 282 24 C 299 24 310 35 310 52 L 310 202 L 0 202 Z";
const FRONT_PATH =
  "M 0 52 C 0 34 14 26 36 26 L 124 26 C 150 26 153 2 184 2 L 266 2 C 293 2 310 19 310 46 L 310 150 C 310 174 294 190 270 190 L 40 190 C 15 190 0 174 0 150 Z";
const REFERENCE_COLOR = [96, 211, 114]; // #60d372 in the supplied CSS.

function parseHex(color: string): number[] {
  const hex = color.trim().replace(/^#/, "");
  if (!/^(?:[\da-f]{3}|[\da-f]{6})$/i.test(hex)) {
    throw new Error("FolderIcon color must be a #RGB or #RRGGBB hex color.");
  }
  const fullHex = hex.length === 3 ? [...hex].map((digit) => digit + digit).join("") : hex;
  return [0, 2, 4].map((offset) => parseInt(fullHex.slice(offset, offset + 2), 16));
}

function toHsl(rgb: number[]) {
  const [r, g, b] = rgb.map((channel) => channel / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const lightness = (max + min) / 2;
  if (delta === 0) return { hue: 0, saturation: 0, lightness };
  const sector = max === r
    ? (g - b) / delta
    : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
  return {
    hue: (sector * 60 + 360) % 360,
    saturation: delta / (1 - Math.abs(2 * lightness - 1)),
    lightness,
  };
}

const original = toHsl(REFERENCE_COLOR);

// Keep the reference tints and shadows while matching the selected color's hue.
function tint(reference: string, base: number[]): string {
  const target = toHsl(parseHex(reference));
  const selected = toHsl(base);
  const hue = (target.hue + selected.hue - original.hue + 360) % 360;
  const saturation = Math.min(1, target.saturation * selected.saturation / original.saturation);
  const lightness = target.lightness >= original.lightness
    ? selected.lightness + (1 - selected.lightness) *
      (target.lightness - original.lightness) / (1 - original.lightness)
    : selected.lightness * target.lightness / original.lightness;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = chroma * (1 - Math.abs((hue / 60) % 2 - 1));
  const offset = lightness - chroma / 2;
  const sectors = [
    [chroma, x, 0], [x, chroma, 0], [0, chroma, x],
    [0, x, chroma], [x, 0, chroma], [chroma, 0, x],
  ];
  const channels = sectors[Math.floor(hue / 60)]
    .map((channel) => Math.round((channel + offset) * 255));
  return `rgb(${channels.join(", ")})`;
}

export function FolderIcon({
  name,
  fileCount,
  color = "#60d372",
  width = 310,
  style,
}: FolderIconProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const base = parseHex(color);
  const scale = width / 310;
  const countLabel = `${fileCount} ${fileCount === 1 ? "File" : "Files"}`;
  const gradient = (part: string) => `url(#folder-${id}-${part})`;

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={`${name} collection, ${countLabel}`}
      style={[styles.container, { width, height: 288 * scale }, style]}
    >
      <Svg
        pointerEvents="none"
        accessible={false}
        width={390 * scale}
        height={368 * scale}
        viewBox="-40 -20 390 368"
        style={{ position: "absolute", left: -40 * scale, top: -20 * scale }}
      >
        <Defs>
          <LinearGradient
            id={`folder-${id}-back`}
            gradientUnits="userSpaceOnUse"
            x1={27} y1={-27} x2={283} y2={229}
          >
            <Stop offset={0} stopColor={tint("#60d372", base)} />
            <Stop offset={1} stopColor={tint("#8de99b", base)} />
          </LinearGradient>
          <LinearGradient
            id={`folder-${id}-back-shine`}
            gradientUnits="userSpaceOnUse"
            x1={27} y1={-27} x2={283} y2={229}
          >
            <Stop offset={0} stopColor="#fff" stopOpacity={0.1} />
            <Stop offset={0.36} stopColor="#fff" stopOpacity={0} />
          </LinearGradient>
          <LinearGradient
            id={`folder-${id}-paper`}
            x1="20%" y1="-24%" x2="80%" y2="124%"
          >
            <Stop offset={0} stopColor="#ffffff" />
            <Stop offset={1} stopColor="#f6f8f7" />
          </LinearGradient>
          <LinearGradient
            id={`folder-${id}-front`}
            gradientUnits="userSpaceOnUse"
            x1={6.35} y1={-9.09} x2={303.65} y2={199.09}
          >
            <Stop offset={0} stopColor={tint("#c7f8cb", base)} />
            <Stop offset={1} stopColor={tint("#a8f3b6", base)} />
          </LinearGradient>
          <RadialGradient
            id={`folder-${id}-front-shine`}
            gradientUnits="userSpaceOnUse"
            cx={235.6} cy={41.8} rx={278.32} ry={278.32}
          >
            <Stop offset={0} stopColor="#fff" stopOpacity={0.5} />
            <Stop offset={0.31} stopColor="#fff" stopOpacity={0} />
          </RadialGradient>
          <Filter
            id={`folder-${id}-shadow`}
            filterUnits="userSpaceOnUse"
            x={-40} y={-20} width={390} height={368}
          >
            <FeDropShadow
              dx={0} dy={18} stdDeviation={20}
              floodColor={tint("#2ca848", base)} floodOpacity={0.15}
            />
          </Filter>
          <Filter id={`folder-${id}-paper-shadow`} x="-30%" y="-40%" width="160%" height="180%">
            <FeDropShadow
              dx={0} dy={8} stdDeviation={8}
              floodColor={tint("#2d6b36", base)} floodOpacity={0.08}
            />
          </Filter>
        </Defs>

        <G filter={gradient("shadow")}>
          <G transform="translate(0 10)">
            <Path d={BACK_PATH} fill={gradient("back")} />
            <Path d={BACK_PATH} fill={gradient("back-shine")} />
          </G>
          <G transform="rotate(-1 139 144)" opacity={0.78}>
            <Rect x={25} y={78} width={228} height={132} rx={12}
              fill={gradient("paper")} filter={gradient("paper-shadow")} />
          </G>
          <G transform="rotate(4 156.5 129)" opacity={0.88}>
            <Rect x={39} y={61} width={235} height={136} rx={12}
              fill={gradient("paper")} filter={gradient("paper-shadow")} />
          </G>
          <G transform="rotate(11 170 116)">
            <Rect x={55} y={50} width={230} height={132} rx={12}
              fill={gradient("paper")} filter={gradient("paper-shadow")} />
            <Rect x={75} y={67} width={76} height={12} rx={6} fill="#e5e7e7" />
            <Rect x={75} y={91} width={155} height={12} rx={6} fill="#e5e7e7" />
            <Rect x={75} y={115} width={130} height={12} rx={6} fill="#e5e7e7" />
          </G>
          <G transform="translate(0 98)">
            <Path d={FRONT_PATH} fill={gradient("front")} />
            <Path d={FRONT_PATH} fill={gradient("front-shine")} />
          </G>
        </G>
      </Svg>

      <View
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{ position: "absolute", left: 28 * scale, right: 28 * scale, top: 140 * scale }}
      >
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.65}
          style={[styles.name, { fontSize: 28 * scale, lineHeight: 28 * scale, marginBottom: 10 * scale }]}
        >
          {name}
        </Text>
        <View style={[styles.fileCount, { gap: 12 * scale }]}>
          <Svg width={29 * scale} height={29 * scale} viewBox="0 0 24 24" accessible={false}>
            <Path
              d="M6 3h8l4 4v14H6z M14 3v5h5 M9 13h6 M9 17h6"
              fill="none" stroke="#050505" strokeWidth={2.1}
              strokeLinecap="round" strokeLinejoin="round"
            />
          </Svg>
          <Text numberOfLines={1} style={[styles.count, { fontSize: 21 * scale }]}>
            {countLabel}
          </Text>
        </View>
      </View>
    </View>
  );
}

const fontFamily = Platform.select({ ios: "Arial", android: "sans-serif", default: "Arial" });
const styles = StyleSheet.create({
  container: { position: "relative", overflow: "visible" },
  name: { color: "#050505", fontFamily, fontWeight: "800", includeFontPadding: false },
  fileCount: { flexDirection: "row", alignItems: "center" },
  count: { color: "#050505", fontFamily, includeFontPadding: false, flexShrink: 1 },
});
