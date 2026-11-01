import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

export const folderColors = {
  mint: '#60D372',
  blue: '#57B8F8',
  cyan: '#50CCE8',
  lavender: '#B780ED',
  peach: '#F0B784',
};

export const materialLightTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 5,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#7057D9',
    onPrimary: '#FFFFFF',
    primaryContainer: '#F4F1FD',
    onPrimaryContainer: '#49328C',
    secondary: '#5D677B',
    secondaryContainer: '#E9E6F7',
    onSecondaryContainer: '#302643',
    tertiary: '#237A57',
    background: '#F8F9FC',
    onBackground: '#1C2233',
    surface: '#FFFFFF',
    onSurface: '#1C2233',
    surfaceVariant: '#F0EDF5',
    onSurfaceVariant: '#667085',
    outline: '#767B8B',
    outlineVariant: '#E5E7EF',
    error: '#C43D4B',
    elevation: {
      level0: 'transparent',
      level1: '#F9F7FE',
      level2: '#F4F1FC',
      level3: '#EFEAFB',
      level4: '#EDE7FA',
      level5: '#E8E1F8',
    },
  },
};

export const materialDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  roundness: 5,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#C9B8FF',
    onPrimary: '#30205E',
    primaryContainer: '#493583',
    onPrimaryContainer: '#E9DFFF',
    background: '#12131B',
    onBackground: '#E8E7EF',
    surface: '#1B1C26',
    onSurface: '#E8E7EF',
    surfaceVariant: '#343342',
    onSurfaceVariant: '#C5C2D2',
    outlineVariant: '#41404E',
  },
};
