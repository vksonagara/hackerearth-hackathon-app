import styled from 'styled-components/native';
import { TouchableHighlightProps } from 'react-native';

interface Props extends TouchableHighlightProps {
  width?: number | string;
}

const StyledTouchableHighlight: React.FC<Props> = styled.TouchableHighlight`
  width: ${(props: Props) => props.width || 'auto'};
`;

export default StyledTouchableHighlight;
