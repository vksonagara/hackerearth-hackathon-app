import React, { useEffect, useReducer } from 'react';

import { OrderService } from '@services';

import { withBottomNavigationBar, withHeader } from '@components/hoc';
import { StyledView } from '@components/styled';
import { useSelector } from 'react-redux';
import { OrderConstant } from '@lib/constants';
import { ChoosePortfolioHeader } from '@components/comman';
import { Order } from '@components/orders';
import { IRootState } from '@store';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

enum OrdersActionKind {
  UPDATE_ORDERS = 'UPDATE_ORDER',
  FILTER_CHANGE = 'FILTER_CHANGE',
}

interface IOrdersState {
  orders: any;
  filter: string;
}

interface IOrdersAction {
  type: string;
  payload: any;
}

const ordersReducer = (state: IOrdersState, action: IOrdersAction) => {
  const { type, payload } = action;
  switch (type) {
    case OrdersActionKind.UPDATE_ORDERS:
      return {
        ...state,
        orders: payload,
      };
      break;

    case OrdersActionKind.FILTER_CHANGE:
      return {
        ...state,
        filter: payload,
      };
    default:
      return state;
  }
};

function OrdersScreen() {
  const { activePortfolio } = useSelector(
    (state: IRootState) => state.portfolio,
  );
  const [orders, ordersDispatch] = useReducer(ordersReducer, {
    orders: [],
    filter: OrderConstant.FILTER.ALL,
  });

  useEffect(() => {
    const getPortfolioOrder = async () => {
      const { data, error } = await OrderService.getPortfolioOrders({
        portfolioId: activePortfolio._id,
        filter: orders.filter,
        page: 1,
        size: 100,
      });

      if (!error) {
        ordersDispatch({
          type: OrdersActionKind.UPDATE_ORDERS,
          payload: data.orders,
        });
      }
    };

    getPortfolioOrder();
  }, [orders.filter, activePortfolio._id]);

  const handleFilterChange = (filter: string) => {
    ordersDispatch({
      type: OrdersActionKind.FILTER_CHANGE,
      payload: filter,
    });
  };

  return (
    <StyledView flex={1} flexDirection="column">
      <ScrollView
        style={{
          width: '100%',
        }}
      >
        <StyledView
          display="flex"
          justifyContent="center"
          width={'100%'}
          py={5}
        >
          {Object.values(OrderConstant.FILTER).map((filter: string) => {
            return (
              <Button
                key={filter}
                mode={orders.filter === filter ? 'contained' : 'outlined'}
                onPress={() => handleFilterChange(filter)}
              >
                {filter}
              </Button>
            );
          })}
        </StyledView>

        <StyledView display="flex" flexDirection="column">
          {orders.orders.map((order: any) => {
            return <Order order={order} key={order._id} />;
          })}
        </StyledView>
      </ScrollView>
    </StyledView>
  );
}

export default withHeader(
  withBottomNavigationBar(OrdersScreen),
  ChoosePortfolioHeader,
);
