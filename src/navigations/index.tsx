import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationConstants } from '@navigations/constants';
import MarketsScreen from '@screens/markets';
import CoinChartScreen from '@screens/coin-chart';
import AccountScreen from '@screens/account';
import OrderScreen from '@screens/order';
import PortfolioScreen from '@screens/portfolio';
import EmailScreen from '@screens/register-login/email';
import OtpScreen from '@screens/register-login/otp';
import NameScreen from '@screens/register-login/name';
import OnboardingScreens from '@screens/onboarding';
import BuySellScreen from '@screens/buy-sell/BuySellScreen';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { isAuthenticated, isOnboarded } = useSelector(
    (state: any) => state.auth,
  );

  return (
    <Stack.Navigator
      initialRouteName={
        !isOnboarded
          ? NavigationConstants.Onboarding.OnboardingScreens
          : isAuthenticated
          ? NavigationConstants.Coin.MarketsScreen
          : NavigationConstants.RegisterLogin.EmailScreen
      }
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name={NavigationConstants.Coin.MarketsScreen}
            component={MarketsScreen}
          />
          <Stack.Screen
            name={NavigationConstants.Coin.CoinChartScreen}
            component={CoinChartScreen}
          />
          <Stack.Screen
            name={NavigationConstants.Portfolio.OrderScreen}
            component={OrderScreen}
          />
          <Stack.Screen
            name={NavigationConstants.Portfolio.PortfolioScreen}
            component={PortfolioScreen}
          />
          <Stack.Screen
            name={NavigationConstants.User.AccountScreen}
            component={AccountScreen}
          />
          <Stack.Screen
            name={NavigationConstants.RegisterLogin.NameScreen}
            component={NameScreen}
          />
          <Stack.Screen
            name={NavigationConstants.Coin.BuySellScreen}
            component={BuySellScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={NavigationConstants.RegisterLogin.EmailScreen}
            component={EmailScreen}
          />
          <Stack.Screen
            name={NavigationConstants.RegisterLogin.OtpScreen}
            component={OtpScreen}
          />
        </>
      )}

      {!isOnboarded && (
        <Stack.Screen
          name={NavigationConstants.Onboarding.OnboardingScreens}
          component={OnboardingScreens}
        />
      )}
    </Stack.Navigator>
  );
}
