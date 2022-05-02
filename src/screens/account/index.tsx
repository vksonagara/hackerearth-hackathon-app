import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { withBottomNavigationBar } from '@components/hoc';
import { StyledText, StyledView } from '@components/styled';
import { Button } from 'react-native-paper';
import { UserService } from '@services';
import { NavigationConstants } from '@navigations/constants';

function AccountScreen() {
  const navigation = useNavigation();
  const [logoutButtonDisabled, setLogoutButtonDisabled] = useState(false);
  const [logoutButtonLoading, setLogoutButtonLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutButtonLoading(true);
    setLogoutButtonDisabled(true);
    console.log('Logging out...');
    await UserService.logout();

    navigation.navigate(NavigationConstants.RegisterLogin.EmailScreen as never);
  };

  return (
    <StyledView
      flex={1}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <StyledText>Account Screen</StyledText>
      <Button
        mode="contained"
        style={{ width: '90%' }}
        onPress={handleLogout}
        disabled={logoutButtonDisabled}
        loading={logoutButtonLoading}
      >
        Logout
      </Button>
    </StyledView>
  );
}

export default withBottomNavigationBar(AccountScreen);
