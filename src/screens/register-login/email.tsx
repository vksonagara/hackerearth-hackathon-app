import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button, Title } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { UserService } from '@services';

import { scaleSize } from '@styles/mixins';
import { StyledView } from '@components/styled';
import { emailSchema } from '@lib/schemas';
import { validateSchema } from '@utils';
import { NavigationConstants } from '@navigations/constants';
import { Colors } from '@styles';

function EmailScreen() {
  const navigation = useNavigation();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const { isValid } = validateSchema(emailSchema, { email: text });
    setButtonDisabled(!isValid);
  };

  /**
   * Send OTP to user's email
   * Navigate to OTP screen if OTP is sent successfully with user's data
   */
  const handleRegister = async () => {
    console.log('Registering user with email: ', email);
    setLoading(true);
    setButtonDisabled(true);
    const { data, error } = await UserService.RegisterOrLogin(email);
    console.log({ data, error });
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong :(',
      });
    } else {
      navigation.navigate(
        NavigationConstants.RegisterLogin.OtpScreen as never,
        {
          registerData: data,
        } as never,
      );
    }
    setButtonDisabled(false);
    setLoading(false);
  };

  return (
    <StyledView
      display="flex"
      flexDirection="column"
      bgColor={Colors.PRIMARY}
      flex={1}
      alignItems="center"
      justifyContent="space-between"
      paddingBottom={scaleSize(10)}
      paddingTop={scaleSize(80)}
    >
      <StyledView
        display="flex"
        flexDirection="column"
        width="100%"
        alignItems="center"
      >
        <Title style={{ marginBottom: scaleSize(20), color: Colors.WHITE }}>
          Let's Start Your Journey with Kubera!
        </Title>
        <TextInput
          label={'Email'}
          mode="outlined"
          style={{
            width: '90%',
            color: Colors.WHITE,
            borderRadius: scaleSize(15),
          }}
          value={email}
          onChangeText={handleEmailChange}
          activeOutlineColor={Colors.SECONDARY}
          autoComplete={'email'}
          theme={{
            colors: {
              placeholder: Colors.WHITE,
              text: Colors.WHITE,
              background: '#161C22',
            },
          }}
        />
      </StyledView>
      <StyledView>
        <Button
          mode="contained"
          style={{
            width: '90%',
            backgroundColor: buttonDisabled ? '#161C22' : Colors.SECONDARY,
          }}
          onPress={handleRegister}
          disabled={buttonDisabled}
          loading={loading}
        >
          Register
        </Button>
      </StyledView>
    </StyledView>
  );
}

export default EmailScreen;
