import React from 'react';
import { Button, Modal, Portal } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { StyledText, StyledView } from '@components/styled';
import { NavigationConstants } from '@navigations/constants';
import { OrderConstant } from '@lib/constants';

const CoinDetailModal = ({ visible, hideModal, coinDetail }) => {
  const { coins } = useSelector((state: any) => state.coins);
  const navigation = useNavigation();

  const { close, percentChange } = coins[coinDetail?.symbol];

  const handleViewChart = () => {
    hideModal();
    navigation.navigate(
      NavigationConstants.Coin.CoinChartScreen as never,
      {
        coinPairSymbol: coinDetail?.symbol,
        coinPairDisplayName: coinDetail?.symbol,
      } as never,
    );
  };

  const handleBuySell = (orderSide: any) => {
    hideModal();
    navigation.navigate(
      NavigationConstants.Coin.BuySellScreen as never,
      {
        coinPairSymbol: coinDetail?.symbol,
        orderSide,
      } as never,
    );
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}
      >
        <StyledText>{coinDetail?.symbol}</StyledText>
        <StyledView>
          <StyledText>{close}</StyledText>
          <StyledText>{percentChange}</StyledText>
        </StyledView>

        <Button icon={'trending-up'} onPress={handleViewChart}>
          View Chart
        </Button>
        <StyledView>
          <Button onPress={() => handleBuySell(OrderConstant.SIDE.BUY)}>
            Buy
          </Button>
          <Button onPress={() => handleBuySell(OrderConstant.SIDE.SELL)}>
            Sell
          </Button>
        </StyledView>
      </Modal>
    </Portal>
  );
};

export default CoinDetailModal;
