import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

import { StyledView, StyledText } from '@components/styled';
import { Colors, Spacing, Typography } from '@styles';
import { NavigationConstants } from '@navigations/constants';

const NAVIGATIONS = [
  {
    displayName: 'Markets',
    icon: 'bar-chart',
    screenName: NavigationConstants.Coin.MarketsScreen,
  },
  {
    displayName: 'Order',
    icon: 'format-list-bulleted',
    screenName: NavigationConstants.Portfolio.OrderScreen,
  },
  {
    displayName: 'Portfolio',
    icon: 'account-balance-wallet',
    screenName: NavigationConstants.Portfolio.PortfolioScreen,
  },
  {
    displayName: 'Account',
    icon: 'person-outline',
    screenName: NavigationConstants.User.AccountScreen,
  },
];

function NavigationBar() {
  const navigation = useNavigation();
  const route = useRoute();

  const handleTabChange = (screenName: string) => {
    navigation.navigate(screenName as never);
  };

  return (
    <StyledView
      display={'flex'}
      flexDirection={'row'}
      justifyContent="space-between"
      alignItems="center"
      bgColor={Colors.PRIMARY}
      px={15}
      py={15}
    >
      {NAVIGATIONS.map(({ displayName, icon, screenName }, index) => (
        <TouchableOpacity
          onPress={() => handleTabChange(screenName)}
          key={index}
        >
          <StyledView display="flex" alignItems="center" flexDirection="column">
            <Icon
              name={icon}
              size={Spacing.SCALE_28}
              color={
                route.name === screenName ? Colors.SECONDARY : Colors.WHITE
              }
              fontSize={400}
            />
            <StyledText
              fontSize={Typography.FONT_SIZE_12}
              fontWeight={Typography.FONT_WEIGHT_BOLD}
              color={
                route.name === screenName ? Colors.SECONDARY : Colors.WHITE
              }
            >
              {displayName}
            </StyledText>
          </StyledView>
        </TouchableOpacity>
      ))}
    </StyledView>
  );
}

export default NavigationBar;
