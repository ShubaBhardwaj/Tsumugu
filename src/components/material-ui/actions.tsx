import type { ComponentProps } from 'react';
import { Button, FAB, IconButton, TouchableRipple } from 'react-native-paper';

export function MaterialButton({ mode = 'contained', ...props }: ComponentProps<typeof Button>) {
  return <Button mode={mode} {...props} />;
}

export function MaterialIconButton(props: ComponentProps<typeof IconButton>) {
  return <IconButton {...props} />;
}

export function MaterialFAB(props: ComponentProps<typeof FAB>) {
  return <FAB {...props} />;
}

export { TouchableRipple as MaterialRipple };
