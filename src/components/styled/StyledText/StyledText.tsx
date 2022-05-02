import styled from 'styled-components/native';
import { TextProps } from 'react-native';

interface Props extends TextProps {
  fontSize?: number;
  fontWeight?: number | string;
  color?: string;
}

const StyledText: React.FC<Props> = styled.Text`
  font-size: ${props => props.fontSize || 14}px;
  font-weight: ${props => props.fontWeight || 'normal'};
  color: ${props => props.color || 'black'};
`;

export default StyledText;
