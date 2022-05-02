import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WebView } from 'react-native-webview';

import { Colors, Spacing } from '../../styles';
import { Button } from '@components/comman/Button/Button';
import { StyledText, StyledView } from '@components/styled';
import { NavigationConstants } from '@navigations/constants';
import { OrderConstant } from '@lib/constants';

export default function CoinChartScreen({ route }) {
  const { coinPairSymbol, coinPairDisplayName } = route.params;
  const navigation = useNavigation();

  const html = `<!-- TradingView Widget BEGIN -->
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
  <body style="margin: 0 !important; padding: 0 !important;">
  <div class="tradingview-widget-container">
  <div id="basic-area-chart"></div>
  <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
  <script type="text/javascript">
  new TradingView.widget(
  {
  "container_id": "tradingview",
  "autosize": true,
  "symbol": "${coinPairSymbol}",
  "interval": "D",
  "timezone": "exchange",
  "theme": "dark",
  "style": "3",
  "toolbar_bg": "#f1f3f6",
  "hide_top_toolbar": false,
  "hide_side_toolbar": true,
  "locale": "in",
  "withdateranges": true,
}
  );
  </script>
</div>
  </body>
  <!-- TradingView Widget END -->`;

  const handleBuySell = (orderSide: string) => {
    navigation.navigate(
      NavigationConstants.Coin.BuySellScreen as never,
      {
        coinPairSymbol,
        orderSide,
      } as never,
    );
  };

  return (
    <>
      <StyledView
        flexDirection="row"
        px={15}
        py={15}
        bgColor={Colors.PRIMARY}
        alignItems="center"
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <StyledView alignItems="center">
            <Icon name="arrow-back-ios" size={Spacing.SCALE_16} />
            <StyledText color={Colors.WHITE}>{coinPairDisplayName}</StyledText>
          </StyledView>
        </TouchableOpacity>
      </StyledView>
      <WebView source={{ html }} />
      <StyledView
        flexDirection="row"
        px={15}
        py={10}
        bgColor={Colors.PRIMARY}
        justifyContent="space-around"
      >
        <Button
          color={Colors.WHITE}
          bgColor={Colors.SUCCESS}
          borderRadius={5}
          px={15}
          py={5}
          width="45%"
          onPress={() => handleBuySell(OrderConstant.SIDE.BUY)}
        >
          Buy
        </Button>
        <Button
          color={Colors.WHITE}
          bgColor={Colors.ALERT}
          borderRadius={5}
          px={15}
          py={5}
          width="45%"
          onPress={() => handleBuySell(OrderConstant.SIDE.SELL)}
        >
          Sell
        </Button>
      </StyledView>
    </>
  );
}
