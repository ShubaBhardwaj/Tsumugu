import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef, type PropsWithChildren } from 'react';
import { Keyboard, View } from 'react-native';
import { Button, Dialog, List, Portal, Text, useTheme } from 'react-native-paper';

export type MaterialSheetAction = { label: string; icon: string; onPress: () => void };

export function MaterialActionSheet({ title, actions, triggerLabel = 'Open bottom sheet' }: {
  title: string; actions: MaterialSheetAction[]; triggerLabel?: string;
}) {
  const ref = useRef<BottomSheetModal>(null);
  const { colors } = useTheme();
  return (
    <>
      <Button mode="contained-tonal" icon="tray-arrow-up" onPress={() => { Keyboard.dismiss(); ref.current?.present(); }}>
        {triggerLabel}
      </Button>
      <BottomSheetModal ref={ref} enablePanDownToClose
        backgroundStyle={{ backgroundColor: colors.elevation.level2 }}
        handleIndicatorStyle={{ backgroundColor: colors.outline }}
        backdropComponent={props => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />}>
        <BottomSheetView style={{ paddingHorizontal: 16, paddingBottom: 36 }}>
          <Text variant="titleLarge" style={{ margin: 16 }}>{title}</Text>
          {actions.map(action => (
            <List.Item key={action.label} title={action.label} accessibilityRole="button"
              left={props => <List.Icon {...props} icon={action.icon} />}
              onPress={() => { ref.current?.dismiss(); action.onPress(); }} />
          ))}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}

export function MaterialConfirmDialog({ visible, onDismiss, onConfirm, title, children, confirmLabel = 'Remove link' }: PropsWithChildren<{
  visible: boolean; onDismiss: () => void; onConfirm: () => void; title: string; confirmLabel?: string;
}>) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Icon icon="link-off" />
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content><View>{typeof children === 'string' ? <Text variant="bodyMedium">{children}</Text> : children}</View></Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={onConfirm}>{confirmLabel}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export { Menu as MaterialMenu, Portal as MaterialPortal } from 'react-native-paper';
