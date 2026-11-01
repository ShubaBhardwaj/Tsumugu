import type { ComponentProps } from 'react';
import { Card, List, Surface, Text } from 'react-native-paper';

export function MaterialCard(props: ComponentProps<typeof Card>) {
  return <Card {...props} />;
}

export function MaterialListItem(props: ComponentProps<typeof List.Item>) {
  return <List.Item {...props} />;
}

export function MaterialSurface({ elevation = 0, ...props }: ComponentProps<typeof Surface>) {
  return <Surface elevation={elevation} {...props} />;
}

export function MaterialText(props: ComponentProps<typeof Text>) {
  return <Text {...props} />;
}

export { Divider as MaterialDivider } from 'react-native-paper';
