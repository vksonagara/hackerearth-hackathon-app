import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button, Title } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

import { UserService } from '@services';

import { StyledView } from '@components/styled';
import { scaleSize } from '@styles/mixins';
import { NavigationConstants } from '@navigations/constants';
import { updateProfile } from '@store/auth';
import { Colors } from '@styles';

function NameScreen({ route }) {
  const navigation = useNavigation();
  const { verificationMessage } = route.params;
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Toast.show({
      type: 'success',
      text1: verificationMessage,
    });
  }, [verificationMessage]);

  const handleNameChange = (text: string) => {
    setName(text);
    setButtonDisabled(text.trim().length == 0);
  };

  const handleProfileUpdate = async () => {
    console.log('Updating Profile: ', name);
    setButtonDisabled(true);
    setLoading(true);
    const { data, error } = await UserService.UpdateProfile(name);
    console.log({ data, error });
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong. Please try again.',
      });
      setButtonDisabled(false);
      setLoading(false);
    } else {
      dispatch(updateProfile({ name: name }));
      navigation.navigate(NavigationConstants.Coin.MarketsScreen as never);
    }
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
            Please Enter Your Name to Continue
          </Title>
          <TextInput
            label={'Name'}
            mode="outlined"
            style={{
              width: '90%',
              color: Colors.WHITE,
              borderRadius: scaleSize(15),
            }}
            value={name}
            onChangeText={handleNameChange}
            activeOutlineColor={Colors.SECONDARY}
            autoComplete={'name'}
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
            onPress={handleProfileUpdate}
            disabled={buttonDisabled}
            loading={loading}
          >
            Let's Start
          </Button>
        </StyledView>
      </StyledView>
    </>
  );
}

export default NameScreen;
