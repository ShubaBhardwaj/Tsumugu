import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Component, useState, type ErrorInfo, type PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Chip, Icon, IconButton, Searchbar, Surface, Switch, Text, useTheme } from 'react-native-paper';

import { galleryCategories, materialCatalog, type GalleryCategory, type GalleryEntry } from './catalog';
import { MaterialThemeSwatches } from './optional';
import { MaterialUIProvider } from './provider';

type Review = 'keep' | 'refine';

class PreviewBoundary extends Component<PropsWithChildren, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(_error: Error, _info: ErrorInfo) { /* Keep one unavailable native preview from hiding the gallery. */ }
  render() {
    if (this.state.failed) return <View style={{ padding: 12, gap: 12 }}>
      <Text>This preview is unavailable in this build. Native controls need an updated development build.</Text>
      <Button onPress={() => this.setState({ failed: false })}>Try again</Button>
    </View>;
    return this.props.children;
  }
}

function PreviewCard({ entry, review, onReview }: { entry: GalleryEntry; review?: Review; onReview: (review: Review) => void }) {
  const { colors } = useTheme();
  const Demo = entry.component;
  return (
    <Surface elevation={0} style={[styles.card, { borderColor: review === 'refine' ? colors.primary : colors.outlineVariant, backgroundColor: colors.surface }]}>
      <View style={styles.cardHeading}>
        <Text variant="labelSmall" style={{ color: colors.primary, letterSpacing: 0.8 }}>{entry.category.toUpperCase()} · {entry.source.toUpperCase()}</Text>
        <Text variant="titleLarge" style={{ fontWeight: '600' }}>{entry.title}</Text>
        <Text variant="bodyMedium" style={{ color: colors.onSurfaceVariant }}>{entry.description}</Text>
      </View>
      <View style={styles.preview}><PreviewBoundary><Demo /></PreviewBoundary></View>
      <View style={[styles.cardFooter, { borderColor: colors.outlineVariant }]}>
        <Text variant="labelSmall" style={{ color: colors.onSurfaceVariant, flexShrink: 1 }}>{entry.file}</Text>
        <View style={{ flexDirection: 'row', gap: 2 }}>
          <Button compact mode={review === 'keep' ? 'contained-tonal' : 'text'} icon={review === 'keep' ? 'check-circle' : 'check-outline'}
            accessibilityLabel={`Keep ${entry.title}`} onPress={() => onReview('keep')}>Keep</Button>
          <Button compact mode={review === 'refine' ? 'contained-tonal' : 'text'} icon="pencil-outline"
            accessibilityLabel={`Refine ${entry.title}`} onPress={() => onReview('refine')}>Refine</Button>
        </View>
      </View>
    </Surface>
  );
}

function GalleryContent({ dark, setDark }: { dark: boolean; setDark: (value: boolean) => void }) {
  const { colors } = useTheme();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<GalleryCategory>('All');
  const [reviews, setReviews] = useState<Record<string, Review>>({});
  const [refineOnly, setRefineOnly] = useState(false);
  const visible = materialCatalog.filter(entry =>
    (category === 'All' || entry.category === category)
    && (!refineOnly || reviews[entry.id] === 'refine')
    && `${entry.title} ${entry.category} ${entry.description} ${entry.source}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const kept = Object.values(reviews).filter(value => value === 'keep').length;
  const refine = Object.values(reviews).filter(value => value === 'refine').length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top', 'bottom']}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style={dark ? 'light' : 'dark'} />
      <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <View style={styles.toolbar}>
            <IconButton icon="arrow-left" accessibilityLabel="Back to component previews" onPress={() => router.canGoBack() ? router.back() : router.replace('/')} />
            <Text variant="labelLarge" style={{ flex: 1 }}>Tsumugu / Component lab</Text>
            <Icon source={dark ? 'weather-night' : 'white-balance-sunny'} size={20} color={colors.onSurfaceVariant} />
            <Switch accessibilityLabel="Dark theme preview" value={dark} onValueChange={setDark} />
          </View>

          <View style={styles.hero}>
            <View style={[styles.eyebrow, { backgroundColor: colors.primaryContainer }]}>
              <Icon source="palette-outline" size={16} color={colors.primary} />
              <Text variant="labelMedium" style={{ color: colors.primary }}>MATERIAL 3 · ANDROID FIRST</Text>
            </View>
            <Text variant="headlineLarge" style={{ fontWeight: '700', letterSpacing: -1 }}>Choose the details.</Text>
            <Text variant="bodyLarge" style={{ color: colors.onSurfaceVariant, lineHeight: 26 }}>
              {materialCatalog.length} live previews. Tap, type, and try each component before choosing what belongs in Tsumugu.
            </Text>
          </View>

          <MaterialThemeSwatches />
          <Searchbar placeholder="Search components…" accessibilityLabel="Search components" value={query} onChangeText={setQuery}
            elevation={0} style={{ backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.outlineVariant }} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 4 }}>
            {galleryCategories.map(item => <Chip key={item} selected={category === item} showSelectedCheck={false} onPress={() => setCategory(item)}>{item}</Chip>)}
          </ScrollView>

          <View style={[styles.review, { backgroundColor: colors.elevation.level1, borderColor: colors.outlineVariant }]}>
            <View style={{ flex: 1, minWidth: 130, gap: 4 }}>
              <Text variant="labelLarge">{kept} to keep · {refine} to refine</Text>
              <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>Review marks last while this screen is open.</Text>
            </View>
            <Chip selected={refineOnly} onPress={() => setRefineOnly(value => !value)} icon="pencil-outline">To refine</Chip>
            {(kept + refine > 0 || refineOnly) && <Button compact onPress={() => { setReviews({}); setRefineOnly(false); }}>Reset</Button>}
          </View>

          <Text variant="labelMedium" style={{ color: colors.onSurfaceVariant }}>{visible.length} OF {materialCatalog.length} PREVIEWS</Text>
          {visible.map(entry => <PreviewCard key={entry.id} entry={entry} review={reviews[entry.id]} onReview={value =>
            setReviews(current => { const next = { ...current }; if (next[entry.id] === value) delete next[entry.id]; else next[entry.id] = value; return next; })} />)}
          {!visible.length && <Surface elevation={0} style={[styles.noResults, { backgroundColor: colors.surface }]}>
            <Icon source="magnify" size={32} color={colors.primary} />
            <Text variant="titleMedium">No matching components</Text>
            <Text style={{ color: colors.onSurfaceVariant }}>Try another term, category, or review filter.</Text>
            <Button onPress={() => { setQuery(''); setCategory('All'); setRefineOnly(false); }}>Show all components</Button>
          </Surface>}
          <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant, textAlign: 'center', paddingVertical: 20 }}>
            Appearance playground · sample data · no collection changes or AI requests
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function MaterialUIGallery() {
  const [dark, setDark] = useState(false);
  return <MaterialUIProvider dark={dark}><GalleryContent dark={dark} setDark={setDark} /></MaterialUIProvider>;
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 16, paddingBottom: 32 },
  content: { width: '100%', maxWidth: 820, alignSelf: 'center', gap: 22 },
  toolbar: { flexDirection: 'row', alignItems: 'center', gap: 6, marginHorizontal: -8 },
  hero: { gap: 14, paddingTop: 8, paddingBottom: 6 },
  eyebrow: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', borderRadius: 24, paddingHorizontal: 12, paddingVertical: 7, gap: 7 },
  review: { padding: 14, borderRadius: 18, borderWidth: 1, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 10 },
  card: { borderWidth: 1, borderRadius: 24 },
  cardHeading: { padding: 20, gap: 8 },
  preview: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 24 },
  cardFooter: { padding: 12, borderTopWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' },
  noResults: { padding: 24, gap: 14, alignItems: 'center', borderRadius: 20 },
});
