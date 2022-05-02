import React, { useEffect, useState } from 'react';

import { withBottomNavigationBar, withHeader } from '@components/hoc';
import { StyledText, StyledView } from '@components/styled';
import { useSelector } from 'react-redux';
import { IRootState } from '@store';
import { ChoosePortfolioHeader } from '@components/comman';
import { Colors } from '@styles';

function PortfolioScreen() {
  const { activePortfolio } = useSelector(
    (state: IRootState) => state.portfolio,
  );

  const [currentPortfolioValue, setCurrentPortfolioValue] = useState(0);

  const { coins } = useSelector((state: IRootState) => {
    return state.coins;
  });
  // const [pl, setPl] = useState(0);

  useEffect(() => {
    let portfolioValue = 0;

    activePortfolio.coins.forEach(({ qty, symbol }) => {
      portfolioValue += coins[symbol + 'USDT']?.close * qty;
    });

    portfolioValue += activePortfolio.freeQty;

    // const plValue = (currentPortfolioValue - 100).toFixed(2) as any;
    // setPl(plValue);

    setCurrentPortfolioValue(portfolioValue);
  }, []);

  return (
    <StyledView
      flex={1}
      px={20}
      py={10}
      bgColor={Colors.PRIMARY}
      flexDirection={'column'}
    >
      <StyledView flexDirection={'column'} width={'100%'} alignItems={'center'}>
        <StyledText color={Colors.GRAY_MEDIUM} fontSize={15} fontWeight={700}>
          Current Portfolio Value
        </StyledText>
        <StyledText
          color={currentPortfolioValue >= 100 ? Colors.SECONDARY : Colors.ALERT}
          fontWeight={600}
          fontSize={20}
        >
          {currentPortfolioValue.toFixed(3)} USDT
        </StyledText>
      </StyledView>

      <StyledView justifyContent="space-between" width={'100%'}>
        <StyledView flexDirection="column">
          <StyledText
            color={Colors.WHITE}
            fontSize={15}
            fontWeight={700}
            style={{
              opacity: 0.7,
            }}
          >
            Invested Value
          </StyledText>
          <StyledText
            color={Colors.WHITE}
            fontSize={15}
            fontWeight={700}
            style={{
              paddingTop: 1,
            }}
          >
            {(100 - activePortfolio.freeQty).toFixed(2)} USDT
          </StyledText>
        </StyledView>

        <StyledView flexDirection="column">
          <StyledText
            color={Colors.WHITE}
            fontSize={15}
            fontWeight={700}
            style={{
              opacity: 0.7,
            }}
          >
            Available
          </StyledText>
          <StyledText
            color={Colors.WHITE}
            fontSize={15}
            fontWeight={700}
            style={{
              paddingTop: 1,
            }}
          >
            {activePortfolio.freeQty.toFixed(2)} USDT
          </StyledText>
        </StyledView>

        {/* <StyledView flexDirection="column" alignItems="flex-end">
          <StyledText
            color={Colors.WHITE}
            fontSize={15}
            fontWeight={700}
            style={{
              opacity: 0.7,
            }}
          >
            Return (%)
          </StyledText>
          <StyledText
            fontSize={15}
            fontWeight={700}
            style={{
              paddingTop: 1,
            }}
            color={pl > 0 ? Colors.SECONDARY : Colors.ALERT}
          >
            {(currentPortfolioValue - 100).toFixed(2)} USDT ({pl}
            %)
          </StyledText>
        </StyledView> */}
      </StyledView>

      <StyledView flexDirection="column" paddingTop={20}>
        {activePortfolio.coins.map((coin, index) => {
          return (
            <StyledView
              key={index}
              justifyContent={'space-between'}
              width={'100%'}
            >
              <StyledText color={Colors.WHITE}>{coin.symbol}</StyledText>
              <StyledText color={Colors.WHITE}>
                {coin.qty.toFixed(4)}
              </StyledText>
            </StyledView>
          );
        })}
      </StyledView>
    </StyledView>
  );
}

export default withHeader(
  withBottomNavigationBar(PortfolioScreen),
  ChoosePortfolioHeader,
);
