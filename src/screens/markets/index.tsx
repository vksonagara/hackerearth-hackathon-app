import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CryptoMetaService } from '@services';

import { withBottomNavigationBar, withHeader } from '@components/hoc';
import {
  StyledText,
  StyledTouchableHighlight,
  StyledView,
} from '@components/styled';
import { setCoins } from '@store/coins';
import { ChoosePortfolioHeader } from '@components/comman';
import { CoinDetailModal } from '@components/modal';

function MarketsScreen() {
  const dispatch = useDispatch();
  const [coinDetailModalOpen, setCoinDetailModalOpen] = useState(false);
  const [coinDetail, setCoinDetail] = useState({
    symbol: '',
  });

  // Getting coins from store
  const { coins } = useSelector((state: any) => state.coins);

  // Getting coins from API

  useEffect(() => {
    const getActiveCoins = async () => {
      const { data, error } = await CryptoMetaService.getCoins();
      if (!error) {
        dispatch(setCoins(data?.coins));
      }
    };
    getActiveCoins();
  }, [dispatch]);

  return (
    <>
      <ScrollView>
        {/* Coins List */}
        <StyledView display="flex" flexWrap="wrap">
          {Object.values(coins)?.map((coin: any, index) => {
            const { symbol, close, percentChange } = coin;
            return (
              <StyledTouchableHighlight
                width={'100%'}
                onPress={() => {
                  setCoinDetail(prevState => ({
                    ...prevState,
                    symbol,
                  }));
                  setCoinDetailModalOpen(true);
                }}
                key={index}
              >
                <StyledView
                  py={10}
                  justifyContent="space-between"
                  px={4}
                  display="flex"
                >
                  <StyledText>{symbol}</StyledText>
                  <StyledText>{Number(close)}</StyledText>
                  <StyledText>{Number(percentChange)}</StyledText>
                </StyledView>
              </StyledTouchableHighlight>
            );
          })}
        </StyledView>
      </ScrollView>

      {/* Coin Detail Modal */}
      {coinDetailModalOpen && (
        <CoinDetailModal
          visible={coinDetailModalOpen}
          hideModal={() => setCoinDetailModalOpen(false)}
          coinDetail={coinDetail}
        />
      )}
    </>
  );
}

export default withHeader(
  withBottomNavigationBar(MarketsScreen),
  ChoosePortfolioHeader,
);
