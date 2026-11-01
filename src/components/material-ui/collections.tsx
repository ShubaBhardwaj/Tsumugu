import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Button, Chip, Icon, IconButton, List, Text, TouchableRipple, useTheme } from 'react-native-paper';

import { FolderIcon } from '../folder-icon';

export type PreviewCollection = { id: string; name: string; fileCount: number; color: string };

export function MaterialCollectionCard({ collection, width = 156, onPress, onMenu }: {
  collection: PreviewCollection; width?: number; onPress?: () => void; onMenu?: () => void;
}) {
  return (
    <View style={{ width }}>
      <TouchableRipple onPress={onPress} disabled={!onPress} accessibilityRole="button"
        accessibilityLabel={`Open ${collection.name}, ${collection.fileCount} files`} style={{ borderRadius: 20 }}>
        <View><FolderIcon name={collection.name} fileCount={collection.fileCount} color={collection.color} width={width} /></View>
      </TouchableRipple>
      {onMenu && <IconButton icon="dots-vertical" size={18} accessibilityLabel={`Actions for ${collection.name}`}
        onPress={onMenu} style={{ position: 'absolute', top: width * 0.4, right: 0 }} />}
    </View>
  );
}

export function MaterialPinnedCollection({ name, count, color, onPress }: {
  name: string; count: number; color: string; onPress: () => void;
}) {
  return <Chip icon={() => <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: color }} />}
    onPress={onPress}>{name} · {count}</Chip>;
}

export function MaterialNewCollectionTile({ onPress, style }: { onPress: () => void; style?: StyleProp<ViewStyle> }) {
  const { colors } = useTheme();
  return (
    <TouchableRipple onPress={onPress} accessibilityRole="button" accessibilityLabel="Create collection"
      style={[{ minHeight: 140, borderRadius: 20, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.outline }, style]}>
      <View style={{ flex: 1, minHeight: 140, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <Icon source="plus" size={32} color={colors.primary} /><Text>New collection</Text>
      </View>
    </TouchableRipple>
  );
}

export function MaterialBreadcrumbs({ items }: { items: { label: string; onPress?: () => void }[] }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
      {items.map((item, index) => (
        <View key={`${item.label}-${index}`} style={{ flexDirection: 'row', alignItems: 'center' }}>
          {index > 0 && <Icon source="chevron-right" size={18} />}
          <Button compact mode="text" disabled={!item.onPress} onPress={item.onPress}>{item.label}</Button>
        </View>
      ))}
    </View>
  );
}

export function MaterialDocumentRow({ name, description, type = 'pdf', selected, onPress, onLongPress, onMenu }: {
  name: string; description: string; type?: 'pdf' | 'image' | 'link' | 'document';
  selected?: boolean; onPress?: () => void; onLongPress?: () => void; onMenu?: () => void;
}) {
  const { colors } = useTheme();
  const icons = { pdf: 'file-pdf-box', image: 'image-outline', link: 'link-variant', document: 'file-document-outline' };
  return (
    <List.Item title={name} description={description} onPress={onPress} onLongPress={onLongPress}
      accessibilityLabel={`${name}, ${description}`} accessibilityState={{ selected: Boolean(selected) }}
      style={{ borderRadius: 16, backgroundColor: selected ? colors.primaryContainer : colors.surface }}
      left={props => <List.Icon {...props} color={selected ? colors.primary : type === 'pdf' ? colors.error : colors.primary}
        icon={selected ? 'checkbox-marked-circle' : icons[type]} />}
      right={props => onMenu
        ? <IconButton {...props} icon="dots-vertical" accessibilityLabel={`Actions for ${name}`} onPress={onMenu} />
        : <List.Icon {...props} icon="chevron-right" />}
    />
  );
}

export function MaterialEmptyState({ title = 'No documents yet', description = 'Tap + to add your first file.', onAdd }: {
  title?: string; description?: string; onAdd?: () => void;
}) {
  const { colors } = useTheme();
  return (
    <View style={{ alignItems: 'center', padding: 24, gap: 12 }}>
      <View style={{ backgroundColor: colors.primaryContainer, padding: 20, borderRadius: 28 }}>
        <Icon source="folder-open-outline" size={36} color={colors.primary} />
      </View>
      <Text variant="titleMedium">{title}</Text>
      <Text variant="bodyMedium" style={{ textAlign: 'center', color: colors.onSurfaceVariant }}>{description}</Text>
      {onAdd && <Button mode="contained-tonal" icon="plus" onPress={onAdd}>Add document</Button>}
    </View>
  );
}
