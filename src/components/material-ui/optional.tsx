import Slider from '@react-native-community/slider';
import type { ComponentProps, PropsWithChildren } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export function MaterialSlider(props: ComponentProps<typeof Slider>) {
  const { colors } = useTheme();
  return <Slider minimumTrackTintColor={colors.primary} maximumTrackTintColor={colors.outlineVariant} thumbTintColor={colors.primary} {...props} />;
}

export function MaterialCarousel({ children }: PropsWithChildren) {
  return <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 14, paddingVertical: 10, paddingHorizontal: 4 }}>{children}</ScrollView>;
}

export function MaterialThemeSwatches() {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
      {[['Primary', colors.primary], ['Container', colors.primaryContainer], ['Surface', colors.surface], ['Text', colors.onSurface]].map(([label, color]) => (
        <View key={label} style={{ flex: 1, minWidth: 60, gap: 7 }}>
          <View style={{ height: 42, backgroundColor: color, borderRadius: 12, borderWidth: 1, borderColor: colors.outlineVariant }} />
          <Text variant="labelSmall">{label}</Text><Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>{color}</Text>
        </View>
      ))}
    </View>
  );
}
