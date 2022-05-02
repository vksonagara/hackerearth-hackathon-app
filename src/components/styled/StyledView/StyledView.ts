import styled from 'styled-components/native';
import { ViewProps } from 'react-native';

interface Props extends ViewProps {
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  bgColor?: string;
  paddingRight?: number;
  paddingLeft?: number;
  paddingTop?: number;
  paddingBottom?: number;
  px?: number;
  py?: number;
  flex?: number | string;
  borderRadius?: number;
  width?: number | string;
  height?: number | string;
  flexWrap?: string;
  position?: string;
}

const StyledView: React.FC<Props> = styled.View`
  ${({ display }) => display && `display: ${display};`}
  flex-direction: ${props => props.flexDirection || 'row'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'flex-start'}
  background-color: ${props => props.bgColor || 'transparent'};
  padding-right: ${props => props.paddingRight || props.px || 0}px;
  padding-left: ${props => props.paddingLeft || props.px || 0}px;
  padding-top: ${props => props.paddingTop || props.py || 0}px;
  padding-bottom: ${props => props.paddingBottom || props.py || 0}px;
  flex: ${props => props.flex || '0 1 auto'};
  border-radius: ${props => props.borderRadius || 0}px;
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  flex-wrap: ${props => props.flexWrap || 'nowrap'};
  position: ${props => props.position || 'static'};
  px: ${props => props.px || 0}px;
  py: ${props => props.py || 0}px;
`;

export default StyledView;
