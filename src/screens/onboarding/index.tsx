import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Icon1Svg from '@assets/images/onboarding/1.svg';
import Icon2Svg from '@assets/images/onboarding/2.svg';
import Icon3Svg from '@assets/images/onboarding/3.svg';
import { Colors } from '@styles';
import { onboard } from '@store/auth';
import { NavigationConstants } from '@navigations/constants';
import { setAsyncStorage } from '@utils';

function OnboardingScreens() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <Onboarding
      pages={[
        {
          backgroundColor: Colors.PRIMARY,
          image: <Icon1Svg />,
          title: 'Trade anytime anywhere',
          subtitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
        },
        {
          backgroundColor: Colors.PRIMARY,
          image: <Icon2Svg />,
          title: 'Trade anytime anywhere',
          subtitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
        },
        {
          backgroundColor: Colors.PRIMARY,
          image: <Icon3Svg />,
          title: 'Trade anytime anywhere',
          subtitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
        },
      ]}
      skipToPage={2}
      onDone={async () => {
        // Onboarding finished
        await setAsyncStorage('isOnboarded', true);
        dispatch(onboard());
        navigation.navigate(
          NavigationConstants.RegisterLogin.EmailScreen as never,
        );
      }}
    />
  );
}

export default OnboardingScreens;
