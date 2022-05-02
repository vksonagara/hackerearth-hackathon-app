import React from 'react';

import { StyledView, StyledText } from '@components/styled';
import { Colors } from '@styles';
import { OrderConstant } from '@lib/constants';

const Order = ({ order }) => {
  const {
    orderSide,
    quoteSymbol,
    baseSymbol,
    priceExecuted,
    status,
    qty,
    limitPrice,
  } = order;
  return (
    <StyledView
      display="flex"
      justifyContent="space-between"
      width={'100%'}
      px={15}
      py={10}
    >
      <StyledView display="flex" flexDirection="column">
        <StyledView>
          <StyledText
            color={
              orderSide == OrderConstant.SIDE.BUY
                ? Colors.SUCCESS
                : Colors.ALERT
            }
          >
            {orderSide}
          </StyledText>
          <StyledText> ({qty})</StyledText>
        </StyledView>

        <StyledText>
          {quoteSymbol} • {baseSymbol}
        </StyledText>
      </StyledView>

      <StyledView display="flex" flexDirection="column" alignItems="flex-end">
        <StyledText>{status}</StyledText>
        <StyledText>
          {priceExecuted || limitPrice}{' '}
          {limitPrice ? '(Limit Price)' : '(Price Executed)'}
        </StyledText>
      </StyledView>
    </StyledView>
  );
};

export default Order;
