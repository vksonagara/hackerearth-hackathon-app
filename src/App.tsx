import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native';

import '@services/AxiosInterceptor/AxiosInterceptor';
import { CryptoMetaService, UserService, PortfolioService } from '@services';

import Navigation from '@navigations';
import { getAsyncStorage } from '@utils';
import { onboard } from '@store/auth';
import { updateCoinData } from '@store/coins';
import { setActivePortfolio, setPortfolios } from '@store/portfolio';

export const App = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const connectToCoinPriceWebSocket = async () => {
      const ws = await CryptoMetaService.connectWebSocket();
      ws.onopen = () => {
        console.log('Connected to WebSocket');
        CryptoMetaService.subscribeCoinPriceWebSocket();
        console.log("WebSocket subscribed to 'coin-price'");
      };
      ws.onclose = () => {
        console.log('WebSocket closed');
      };
      ws.onerror = err => {
        console.log('Error connecting WebSocket', err);
      };
      ws.onmessage = (event: WebSocketMessageEvent) => {
        const { data, event: eventType } = JSON.parse(event.data);
        if (eventType === 'stream@coin-price') {
          dispatch(updateCoinData(data));
        }
      };
    };

    connectToCoinPriceWebSocket();

    return () => {
      CryptoMetaService.unsubscribeCoinPriceWebSocket();
      CryptoMetaService.disconnectWebSocket();
    };
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);

    // Login User with OnBoarding
    const loginUser = async () => {
      await UserService.login();
      const isOnboarded = await getAsyncStorage('isOnboarded');
      if (isOnboarded) {
        dispatch(onboard());
      }
      setLoading(false);
    };

    loginUser();
  }, [dispatch]);

  useEffect(() => {
    const getPortfolios = async () => {
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
    };

    if (isAuthenticated) {
      getPortfolios();
    }
  }, [isAuthenticated, dispatch]);

  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      <Toast />
    </>
  );
};
