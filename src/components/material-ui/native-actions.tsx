import { useState } from 'react';
import { Platform, Share, View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';

export function MaterialNativeAction({ action }: { action: 'document' | 'photo' | 'share' | 'permission' }) {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const labels = { document: 'Open document picker', photo: 'Open photo picker', share: 'Open share sheet', permission: 'Check photo permission' };
  const icons = { document: 'file-plus-outline', photo: 'image-plus', share: 'share-variant-outline', permission: 'shield-check-outline' };

  async function run() {
    setBusy(true); setError('');
    try {
      if (action === 'document') {
        const picker = await import('expo-document-picker');
        const response = await picker.getDocumentAsync({ multiple: true, copyToCacheDirectory: false });
        setResult(response.canceled ? 'Selection cancelled.' : response.assets.map(asset => asset.name).join(', '));
      } else if (action === 'photo') {
        const picker = await import('expo-image-picker');
        const response = await picker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsMultipleSelection: true });
        setResult(response.canceled ? 'Selection cancelled.' : `${response.assets.length} image(s) selected for preview.`);
      } else if (action === 'permission') {
        if (Platform.OS === 'web') setResult('The browser manages file access through its picker.');
        else {
          const picker = await import('expo-image-picker');
          const response = await picker.getMediaLibraryPermissionsAsync();
          setResult(`Photo permission: ${response.status}. The system photo picker can be used without broad library access.`);
        }
      } else if (Platform.OS === 'web') {
        await Share.share({ title: 'Tsumugu demo', message: 'Sample DBMS study notes from the Material UI gallery.' });
        setResult('Share flow closed.');
      } else {
        const sharing = await import('expo-sharing');
        if (!(await sharing.isAvailableAsync())) { setResult('Sharing is not available on this device.'); return; }
        const { File, Paths } = await import('expo-file-system');
        const file = new File(Paths.cache, 'tsumugu-material-demo.txt');
        file.create({ overwrite: true });
        file.write('Tsumugu UI demo\n\nA primary key uniquely identifies a record.\nThis is a generated sample, not a personal document.');
        await sharing.shareAsync(file.uri, { mimeType: 'text/plain', dialogTitle: 'Share demo study notes' });
        setResult('Sample share flow closed.');
      }
    } catch {
      setError('This action is unavailable here. On Android, use an updated development build with these native modules.');
    } finally { setBusy(false); }
  }

  return (
    <View style={{ gap: 12 }}>
      <Button mode="outlined" icon={icons[action]} onPress={run} loading={busy} disabled={busy}>{labels[action]}</Button>
      {Boolean(result) && <Text variant="bodyMedium" accessibilityLiveRegion="polite">{result}</Text>}
      {Boolean(error) && <HelperText type="error">{error}</HelperText>}
      {action === 'document' && <Text variant="bodySmall">Picker preview only. Selections are not saved or linked to a collection.</Text>}
    </View>
  );
}
