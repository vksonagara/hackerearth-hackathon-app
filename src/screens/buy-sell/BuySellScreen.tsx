import React, { useMemo, useReducer } from 'react';
import { Appbar, Button, Switch, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { StyledText, StyledView } from '@components/styled';
import { OrderConstant } from '@lib/constants';
import { Colors } from '@styles';
import { IRootState } from '@store';
import { CommandUtils } from '@utils';
import { OrderService, PortfolioService } from '@services';
import { setActivePortfolio, setPortfolios } from '@store/portfolio';

enum OrderActionKind {
  SIDE_CHANGE = 'SIDE_CHANGE',
  TYPE_CHANGE = 'TYPE_CHANGE',
  QTY_CHANGE = 'QTY_CHANGE',
  PRICE_CHANGE = 'PRICE_CHANGE',
}

interface IOrderState {
  type: string;
  side: string;
  qty: string;
  price: string;
}

interface IOrderAction {
  type: string;
  payload: any;
}

const orderReducer = (state: IOrderState, action: IOrderAction) => {
  const { type, payload } = action;
  switch (type) {
    case OrderActionKind.SIDE_CHANGE:
      return {
        ...state,
        side: payload,
      };
      break;

    case OrderActionKind.TYPE_CHANGE:
      return {
        ...state,
        type: payload,
      };
      break;

    case OrderActionKind.QTY_CHANGE:
      return {
        ...state,
        qty: payload,
      };
      break;

    case OrderActionKind.PRICE_CHANGE:
      return {
        ...state,
        price: payload,
      };
      break;

    default:
      return state;
  }
};

const BuySellScreen = ({ route }) => {
  const navigation = useNavigation();
  const { coinPairSymbol, orderSide } = route.params;
  const quoteSymbol = coinPairSymbol.slice(0, coinPairSymbol.length - 4);

  const dispatch = useDispatch();

  const { coins } = useSelector((state: IRootState) => state.coins);
  const { activePortfolio } = useSelector(
    (state: IRootState) => state.portfolio,
  );

  let availableQtyforSell;

  activePortfolio.coins.every(({ symbol, qty }, index) => {
    if (symbol === quoteSymbol) {
      availableQtyforSell = Number(qty).toFixed(2);
      return false;
    } else if (index === activePortfolio.coins.length - 1) {
      availableQtyforSell = 0;
      return false;
    }
    return true;
  });
  const { close, bestBid, bestAsk } = coins[coinPairSymbol];

  const [order, orderDispatch] = useReducer(orderReducer, {
    type: OrderConstant.TYPE.MARKET,
    side: orderSide,
    qty: '',
    price: Number(close).toFixed(2),
  });

  const orderValue = useMemo(() => {
    const { type, qty, price } = order;
    const value =
      type === OrderConstant.TYPE.MARKET
        ? (Number(qty) * Number(close)).toFixed(2)
        : (Number(qty) * Number(price)).toFixed(2);
    return value;
  }, [order, close]);

  const handleOrderSideChange = () => {
    orderDispatch({
      type: OrderActionKind.SIDE_CHANGE,
      payload:
        order.side === OrderConstant.SIDE.SELL
          ? OrderConstant.SIDE.BUY
          : OrderConstant.SIDE.SELL,
    });
  };

  const handleOrderQtyChange = (orderQty: string) => {
    if (CommandUtils.isValidNumber(orderQty)) {
      orderDispatch({
        type: OrderActionKind.QTY_CHANGE,
        payload: orderQty,
      });
    } else {
      return;
    }
  };

  const handleOrderPriceChange = (orderPrice: string) => {
    if (CommandUtils.isValidNumber(orderPrice)) {
      orderDispatch({
        type: OrderActionKind.PRICE_CHANGE,
        payload: orderPrice,
      });
    } else {
      return;
    }
  };

  const handleOrderTypeChange = (type: string) => {
    orderDispatch({
      type: OrderActionKind.TYPE_CHANGE,
      payload: type,
    });
  };

  const handlePlaceOrder = async () => {
    const { side, type, qty, price } = order;

    const { data, error } = await OrderService.createOrder({
      baseSymbol: 'USDT',
      quoteSymbol,
      orderSide: side,
      orderType: type,
      quantity: Number(qty),
      portfolioId: activePortfolio._id,
      limitPrice: Number(price),
    });

    console.log({ data, error });

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to place order',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Order placed successfully',
      });

      console.log('Getting All Portfolios');
      const { data, error } = await PortfolioService.getPortfolios();
      if (error) {
        console.log({ error }, 'portfolio error');
      } else {
        dispatch(setPortfolios(data));
        const { data: portfolioData } = await PortfolioService.getPortfolio(
          data[0]._id,
        );
        dispatch(setActivePortfolio(portfolioData[0]));
      }
    }

    return navigation.goBack();
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon={'arrow-back-ios'}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={coinPairSymbol} />
        <StyledView display="flex" alignItems="center" justifyContent="center">
          <StyledText color={Colors.WHITE}>Buy</StyledText>
          <Switch
            value={order.side === OrderConstant.SIDE.SELL}
            onValueChange={handleOrderSideChange}
            color={Colors.PRIMARY}
            thumbColor={Colors.PRIMARY}
            style={{
              marginHorizontal: 10,
            }}
          />
          <StyledText color={Colors.WHITE}>Sell</StyledText>
        </StyledView>
      </Appbar.Header>

      <StyledView display="flex" justifyContent="space-between">
        <StyledView>
          <StyledText>Best bid</StyledText>
          <StyledText>{Number(bestBid).toFixed(2)}</StyledText>
        </StyledView>
        <StyledText>{Number(close).toFixed(2)}</StyledText>
        <StyledView>
          <StyledText>Best ask</StyledText>
          <StyledText>{Number(bestAsk).toFixed(2)}</StyledText>
        </StyledView>
      </StyledView>

      <StyledView
        paddingTop={10}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <TextInput
          label="Enter Price"
          mode="outlined"
          disabled={order.type === OrderConstant.TYPE.MARKET}
          style={{
            width: '45%',
          }}
          value={
            order.type === OrderConstant.TYPE.MARKET
              ? Number(close).toFixed(2)
              : order.price
          }
          onChangeText={handleOrderPriceChange}
        />
        <TextInput
          label="Enter Qty"
          mode="outlined"
          style={{
            width: '45%',
          }}
          value={order.qty}
          onChangeText={handleOrderQtyChange}
        />
      </StyledView>

      <StyledView
        display="flex"
        justifyContent="space-between"
        py={10}
        alignItems="center"
      >
        <StyledText>Order Type</StyledText>
        <StyledView>
          {Object.values(OrderConstant.TYPE).map(type => {
            return (
              <Button
                key={type}
                mode={type === order.type ? 'contained' : 'outlined'}
                onPress={() => handleOrderTypeChange(type)}
              >
                {type}
              </Button>
            );
          })}
        </StyledView>
      </StyledView>

      <StyledView display="flex" justifyContent="space-between" py={10}>
        <StyledView>
          <StyledText>Order Value</StyledText>
          <StyledText>{orderValue}USDT</StyledText>
        </StyledView>
        <StyledView>
          <StyledText>Available Bal.</StyledText>
          <StyledText>
            {order.side === OrderConstant.SIDE.BUY
              ? activePortfolio.freeQty.toFixed(2) + 'USDT'
              : availableQtyforSell + quoteSymbol}
          </StyledText>
        </StyledView>
      </StyledView>

      <Button
        mode="contained"
        disabled={
          order.side === OrderConstant.SIDE.BUY
            ? Number(orderValue) > activePortfolio.freeQty ||
              Number(orderValue) <= 0
            : order.qty > availableQtyforSell || Number(orderValue) <= 0
        }
        onPress={handlePlaceOrder}
      >
        {order.side}
      </Button>
    </>
  );
};

export default BuySellScreen;
