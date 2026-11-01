import { useState } from 'react';
import { Platform, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';

// Native code is loaded only when requested. Web gets an explicitly labelled input preview.
export function MaterialDateTimePicker({ mode }: { mode: 'date' | 'time' }) {
  const [value, setValue] = useState(new Date(2026, 10, 15, 9, 30));
  const [draft, setDraft] = useState(mode === 'date' ? '2026-11-15' : '09:30');
  const [error, setError] = useState('');
  const [IOSPicker, setIOSPicker] = useState<typeof import('@react-native-community/datetimepicker').default | null>(null);
  const label = mode === 'date' ? value.toLocaleDateString() : value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  async function open() {
    try {
      const picker = await import('@react-native-community/datetimepicker');
      if (Platform.OS === 'android') {
        picker.DateTimePickerAndroid.open({ value, mode, onChange: (_, date) => { if (date) setValue(date); } });
      } else {
        setIOSPicker(() => picker.default);
      }
      setError('');
    } catch {
      setError('This picker needs a development build that includes the new native packages.');
    }
  }

  return (
    <View style={{ gap: 12 }}>
      <Text variant="titleMedium">{label}</Text>
      {Platform.OS === 'web' ? (
        <>
          <TextInput mode="outlined" label={mode === 'date' ? 'Date (YYYY-MM-DD)' : 'Time (HH:MM)'} value={draft} onChangeText={setDraft} />
          <Button mode="outlined" onPress={() => {
            const date = new Date(mode === 'date' ? `${draft}T09:30:00` : `2026-11-15T${draft}:00`);
            if (Number.isNaN(date.getTime())) setError('Enter a valid date or time.');
            else { setValue(date); setError(''); }
          }}>Apply preview value</Button>
          <Text variant="bodySmall">Browser input preview. On Android, this opens the system picker.</Text>
        </>
      ) : <Button icon={mode === 'date' ? 'calendar-outline' : 'clock-outline'} mode="outlined" onPress={open}>Choose {mode}</Button>}
      {IOSPicker && <IOSPicker value={value} mode={mode} onChange={(_, date) => { setIOSPicker(null); if (date) setValue(date); }} />}
      {Boolean(error) && <HelperText type="error">{error}</HelperText>}
    </View>
  );
}
