import { useState } from 'react';
import { View } from 'react-native';
import { Button, Chip, Icon, IconButton, ProgressBar, Surface, Text, TextInput, useTheme } from 'react-native-paper';

export function MaterialAIEntryCard({ signedIn, onPress }: { signedIn: boolean; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Surface elevation={0} style={{ padding: 18, borderRadius: 20, backgroundColor: colors.primaryContainer, gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Icon source={signedIn ? 'creation' : 'lock-outline'} size={28} color={colors.primary} />
        <View style={{ flex: 1, gap: 4 }}>
          <Text variant="titleMedium">{signedIn ? 'Study with AI' : 'AI study tools'}</Text>
          <Text variant="bodySmall">{signedIn ? 'Answers from your collection.' : 'Sign in for answers, quizzes & flashcards.'}</Text>
        </View>
      </View>
      <Button mode="contained-tonal" onPress={onPress}>{signedIn ? 'Ask AI' : 'Sign in'}</Button>
    </Surface>
  );
}

export function MaterialSourceCitation({ file, onPress }: { file: string; onPress: () => void }) {
  return <Chip compact icon="file-document-outline" onPress={onPress}>{file}</Chip>;
}

export function MaterialChatMessage({ role, children }: { role: 'user' | 'assistant'; children: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ alignSelf: role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '92%', padding: 16, borderRadius: 20,
      borderBottomRightRadius: role === 'user' ? 4 : 20, borderBottomLeftRadius: role === 'assistant' ? 4 : 20,
      backgroundColor: role === 'user' ? colors.primaryContainer : colors.elevation.level2 }}>
      <Text variant="labelSmall" style={{ color: colors.primary, marginBottom: 6 }}>{role === 'user' ? 'You' : 'DBMS assistant'}</Text>
      <Text variant="bodyMedium">{children}</Text>
    </View>
  );
}

export function MaterialChatComposer({ value, onChangeText, onSend, disabled = false }: {
  value: string; onChangeText: (value: string) => void; onSend: () => void; disabled?: boolean;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6 }}>
      <TextInput mode="outlined" multiline value={value} onChangeText={onChangeText} disabled={disabled}
        placeholder={disabled ? 'Sign in to ask AI' : 'Ask about DBMS…'} accessibilityLabel="Message for DBMS assistant"
        style={{ flex: 1, maxHeight: 160 }} outlineStyle={{ borderRadius: 24 }} />
      <IconButton icon="send" mode="contained" accessibilityLabel="Send message" disabled={disabled || !value.trim()} onPress={onSend} />
    </View>
  );
}

export function MaterialAIQuickActions({ onSelect }: { onSelect: (action: string) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      {[['Quiz', 'text-box-check-outline'], ['Flashcards', 'cards-outline'], ['Key points', 'format-list-bulleted'], ['PYQ answers', 'file-search-outline']].map(([label, icon]) => (
        <Chip key={label} icon={icon} onPress={() => onSelect(label)}>{label}</Chip>
      ))}
    </View>
  );
}

export function MaterialAnalysisStatus({ status, progress = 0 }: { status: 'idle' | 'analyzing' | 'ready' | 'outdated'; progress?: number }) {
  const { colors } = useTheme();
  const labels = { idle: 'Ready to analyze', analyzing: 'Analyzing DBMS…', ready: 'Collection analyzed', outdated: 'New documents · update analysis' };
  return (
    <View style={{ gap: 12 }}>
      <Chip icon={status === 'ready' ? 'check-circle-outline' : 'creation'} style={{ alignSelf: 'flex-start' }}>{labels[status]}</Chip>
      {status === 'analyzing' && <ProgressBar progress={progress} color={colors.primary} />}
    </View>
  );
}

export function MaterialFlashcard({ front, back }: { front: string; back: string }) {
  const [flipped, setFlipped] = useState(false);
  const { colors } = useTheme();
  return (
    <Surface style={{ padding: 24, borderRadius: 20, gap: 16, backgroundColor: colors.primaryContainer }} elevation={0}>
      <Text variant="labelMedium">{flipped ? 'ANSWER' : 'QUESTION'}</Text>
      <Text variant="titleMedium">{flipped ? back : front}</Text>
      <Button icon="rotate-3d-variant" onPress={() => setFlipped(value => !value)}>{flipped ? 'Show question' : 'Reveal answer'}</Button>
    </Surface>
  );
}
