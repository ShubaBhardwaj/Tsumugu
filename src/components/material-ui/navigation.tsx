import { View } from 'react-native';
import { Appbar, BottomNavigation, Drawer, Icon, Text, TouchableRipple, useTheme } from 'react-native-paper';

export const materialDestinations = [
  { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
  { key: 'inbox', title: 'Inbox', focusedIcon: 'inbox', unfocusedIcon: 'inbox-outline', badge: 3 },
  { key: 'ai', title: 'Ask AI', focusedIcon: 'creation', unfocusedIcon: 'creation' },
  { key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
];

export function MaterialAppBar({ title, subtitle, onBack, onAction }: {
  title: string; subtitle?: string; onBack?: () => void; onAction?: () => void;
}) {
  return (
    <Appbar.Header elevated statusBarHeight={0}>
      {onBack && <Appbar.BackAction onPress={onBack} />}
      <Appbar.Content title={title} subtitle={subtitle} />
      {onAction && <Appbar.Action icon="dots-vertical" accessibilityLabel="More actions" onPress={onAction} />}
    </Appbar.Header>
  );
}

// A presentation component. The app's real navigation remains owned by Expo Router.
export function MaterialNavigationBar({ index, onIndexChange }: {
  index: number; onIndexChange: (index: number) => void;
}) {
  return (
    <BottomNavigation.Bar
      navigationState={{ index, routes: materialDestinations }}
      onTabPress={({ route }) => onIndexChange(materialDestinations.findIndex(item => item.key === route.key))}
      renderIcon={({ route, focused, color }) => (
        <Icon source={focused ? route.focusedIcon : route.unfocusedIcon} size={24} color={color} />
      )}
      getLabelText={({ route }) => route.title}
      safeAreaInsets={{ bottom: 0 }}
    />
  );
}

export function MaterialSelectionBar({ count, onClose, onMove, onRemove, onShare }: {
  count: number; onClose: () => void; onMove: () => void; onRemove: () => void; onShare: () => void;
}) {
  return (
    <Appbar style={{ borderRadius: 16 }}>
      <Appbar.Action icon="close" accessibilityLabel="Exit selection" onPress={onClose} />
      <Appbar.Content title={`${count} selected`} />
      <Appbar.Action icon="folder-move-outline" accessibilityLabel="Move selected files" onPress={onMove} />
      <Appbar.Action icon="share-variant-outline" accessibilityLabel="Share selected files" onPress={onShare} />
      <Appbar.Action icon="link-off" accessibilityLabel="Remove selected links" onPress={onRemove} />
    </Appbar>
  );
}

export function MaterialTabs({ items, value, onChange }: {
  items: string[]; value: string; onChange: (value: string) => void;
}) {
  const { colors } = useTheme();
  return (
    <View accessibilityRole="tablist" style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: colors.outlineVariant }}>
      {items.map(item => (
        <TouchableRipple
          key={item} onPress={() => onChange(item)} accessibilityRole="tab"
          accessibilityState={{ selected: value === item }}
          style={{ flex: 1, borderBottomWidth: value === item ? 3 : 0, borderColor: colors.primary }}
        >
          <Text style={{ paddingVertical: 16, textAlign: 'center', color: value === item ? colors.primary : colors.onSurfaceVariant }}>
            {item}
          </Text>
        </TouchableRipple>
      ))}
    </View>
  );
}

export function MaterialNavigationRail({ index, onIndexChange }: {
  index: number; onIndexChange: (index: number) => void;
}) {
  const { colors } = useTheme();
  return (
    <View style={{ width: 88, paddingVertical: 12, gap: 8, backgroundColor: colors.elevation.level2, borderRadius: 24 }}>
      {materialDestinations.map((item, itemIndex) => (
        <TouchableRipple key={item.key} onPress={() => onIndexChange(itemIndex)} accessibilityRole="tab" accessibilityLabel={item.title}
          accessibilityState={{ selected: itemIndex === index }} style={{ borderRadius: 16 }}>
          <View style={{ alignItems: 'center', paddingVertical: 10, gap: 5 }}>
            <View style={{ paddingHorizontal: 16, paddingVertical: 5, borderRadius: 20, backgroundColor: index === itemIndex ? colors.secondaryContainer : 'transparent' }}>
              <Icon source={item.focusedIcon} size={24} color={colors.onSurface} />
            </View>
            <Text variant="labelSmall">{item.title}</Text>
          </View>
        </TouchableRipple>
      ))}
    </View>
  );
}

export function MaterialNavigationDrawer({ index, onIndexChange }: {
  index: number; onIndexChange: (index: number) => void;
}) {
  return (
    <Drawer.Section title="Tsumugu">
      {materialDestinations.map((item, itemIndex) => (
        <Drawer.Item key={item.key} label={item.title} icon={item.focusedIcon}
          active={index === itemIndex} onPress={() => onIndexChange(itemIndex)} />
      ))}
    </Drawer.Section>
  );
}
