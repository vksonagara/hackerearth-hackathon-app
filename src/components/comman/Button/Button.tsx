import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyledText, StyledView } from '../../styled';

interface Props {
  onPress?: () => void;
  bgColor?: string;
  color?: string;
  children: string;
  px?: number;
  py?: number;
  borderRadius?: number;
  width?: number | string;
  height?: number | string;
}

export const Button = ({
  children,
  color,
  bgColor,
  px,
  py,
  borderRadius,
  width = 'auto',
  height = 'auto',
  onPress,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ width, height }}>
      <StyledView
        bgColor={bgColor}
        px={px}
        py={py}
        borderRadius={borderRadius}
        alignItems="center"
        justifyContent="center"
      >
        <StyledText color={color}>{children}</StyledText>
      </StyledView>
    </TouchableOpacity>
  );
};
