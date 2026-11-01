import type { ComponentProps } from 'react';
import { Searchbar, TextInput } from 'react-native-paper';

export function MaterialSearchbar(props: ComponentProps<typeof Searchbar>) {
  return <Searchbar elevation={0} {...props} />;
}

export function MaterialTextField({ mode = 'outlined', ...props }: ComponentProps<typeof TextInput>) {
  return <TextInput mode={mode} {...props} />;
}

export {
  Checkbox as MaterialCheckbox,
  Chip as MaterialChip,
  HelperText as MaterialHelperText,
  RadioButton as MaterialRadioButton,
  SegmentedButtons as MaterialSegmentedButtons,
  Switch as MaterialSwitch,
} from 'react-native-paper';
