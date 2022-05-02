import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
// import SelectDropdown from 'react-native-select-dropdown';

import { Colors } from '@styles';
import { useSelector } from 'react-redux';
import { StyledText } from '@components/styled';

const ChoosePortfolioHeader = () => {
  // const { portfolios } = useSelector((state: any) => state.portfolio);

  // const handleCreatePortfolio = async () => {};

  return (
    <Appbar.Header style={style.header}>
      {/* <SelectDropdown
        data={portfolios}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={selectedItem => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem.name;
        }}
        rowTextForSelection={item => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item.name;
        }}
        defaultValue={portfolios[0]}
      /> */}
      {/* <Appbar.Action
        icon={'add'}
        onPress={handleCreatePortfolio}
      ></Appbar.Action> */}

      <StyledText color="#ffffff" fontSize={20} fontWeight={600}>
        CoinoMatic
      </StyledText>
    </Appbar.Header>
  );
};

const style = StyleSheet.create({
  header: {
    backgroundColor: Colors.PRIMARY,
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default ChoosePortfolioHeader;
