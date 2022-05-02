import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Button, Title } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { UserService } from '@services';

import { StyledView } from '@components/styled';
import { scaleSize } from '@styles/mixins';
import { NavigationConstants } from '@navigations/constants';
import { validateSchema } from '@utils';
import { otpSchema } from '@lib/schemas';
import { Colors } from '@styles';

function OtpScreen({ route }) {
  const navigation = useNavigation();
  const { registerData } = route.params;

  const [otp, setOtp] = useState('');

  // Verify Button State
  const [verifyButtonDisabled, setVerifyButtonDisabled] = useState(true);
  const [verifyButtonLoading, setVerifyButtonLoading] = useState(false);

  // Resend Button State
  const [resendButtonDisabled, setResendButtonDisabled] = useState(false);
  const [resendButtonLoading, setResendButtonLoading] = useState(false);

  // Showing Toast Message After Registering
  useEffect(() => {
    Toast.show({
      type: 'success',
      text1: registerData.message,
    });
  }, [registerData.message]);

  const handleOtpChange = (code: string) => {
    setOtp(code);
    const { isValid } = validateSchema(otpSchema, { otp: code });
    setVerifyButtonDisabled(code.length !== 4 || !isValid);
  };

  /**
   * Veify OTP and login user
   * Check if user is new or not with name
   * If user is new, navigate to Name Screen
   * If user is not new, navigate to Home Screen
   */
  const handleVerifyOtp = async () => {
    setVerifyButtonLoading(true);
    setVerifyButtonDisabled(true);
    console.log('Verifying OTP: ', otp);
    const userId = registerData.user._id;
    const name = registerData.user.name;
    const { data, error } = await UserService.VerifyOtp(userId, otp);
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong :(',
      });
      setVerifyButtonDisabled(false);
      setVerifyButtonLoading(false);
    } else {
      const { message, token } = data;
      await UserService.login(token);
      if (name) {
        navigation.navigate(NavigationConstants.Coin.MarketsScreen as never);
      } else {
        navigation.navigate(
          NavigationConstants.RegisterLogin.NameScreen as never,
          {
            verificationMessage: message,
          } as never,
        );
      }
    }
  };

  // Resend OTP to Previous Mail
  const handleResendOtp = async () => {
    setResendButtonDisabled(true);
    setResendButtonLoading(true);
    const { email } = registerData.user;
    const { data, error } = await UserService.RegisterOrLogin(email);
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong :(',
      });
    } else {
      const { message } = data;
      Toast.show({
        type: 'success',
        text1: message,
      });
    }
    setResendButtonDisabled(false);
    setResendButtonLoading(false);
  };

  return (
    <>
      <StyledView
        display="flex"
        flexDirection="column"
        flex={1}
        alignItems="center"
        justifyContent="space-between"
        paddingBottom={scaleSize(10)}
        paddingTop={scaleSize(80)}
        bgColor={Colors.PRIMARY}
      >
        <StyledView
          display="flex"
          flexDirection="column"
          width="100%"
          alignItems="center"
        >
          <Title style={{ marginBottom: scaleSize(20), color: Colors.WHITE }}>
            Verify OTP
          </Title>
          <OTPInputView
            style={{ width: '80%', height: 200 }}
            pinCount={4}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            // onCodeFilled={code => {
            //   console.log(`Code is ${code}, you are good to go!`);
            // }}
            code={otp}
            onCodeChanged={handleOtpChange}
          />
          <Button
            onPress={handleResendOtp}
            disabled={resendButtonDisabled}
            loading={resendButtonLoading}
            labelStyle={{
              color: resendButtonDisabled ? '#161C22' : Colors.SECONDARY,
            }}
          >
            Resend OTP
          </Button>
        </StyledView>
        <StyledView>
          <Button
            mode="contained"
            style={{
              width: '90%',
              backgroundColor: verifyButtonDisabled
                ? '#161C22'
                : Colors.SECONDARY,
            }}
            onPress={handleVerifyOtp}
            disabled={verifyButtonDisabled}
            loading={verifyButtonLoading}
          >
            Verify
          </Button>
        </StyledView>
      </StyledView>
    </>
  );
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: Colors.SECONDARY,
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: Colors.WHITE,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});

export default React.memo(OtpScreen);
