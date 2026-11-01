import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import type { ComponentProps, PropsWithChildren } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';

import { materialDarkTheme, materialLightTheme } from './theme';

export function MaterialUIProvider({ children, dark = false }: PropsWithChildren<{ dark?: boolean }>) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider
        theme={dark ? materialDarkTheme : materialLightTheme}
        settings={{
          icon: ({ name, color, size }) => (
            <MaterialCommunityIcons
              name={name as ComponentProps<typeof MaterialCommunityIcons>['name']}
              color={color}
              size={size}
            />
          ),
        }}
      >
        <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
