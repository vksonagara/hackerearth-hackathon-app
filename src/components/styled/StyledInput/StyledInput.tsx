import styled from 'styled-components/native';
import { TextInputProps } from 'react-native';

interface Props extends TextInputProps {}

const StyledTextInput: React.FC<Props> = styled.TextInput`
  font-size: ${props => props.fontSize || 14}px;
  font-weight: ${props => props.fontWeight || 'normal'};
  color: ${props => props.color || 'black'};
  border: ${props => props.borderWidth || 1}px;
`;

export default StyledTextInput;
