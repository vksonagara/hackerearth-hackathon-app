import { createSlice } from '@reduxjs/toolkit';

const coinsSlice = createSlice({
  name: 'coins',
  initialState: {
    coins: {},
  },
  reducers: {
    setCoins: (state, action) => {
      state.coins = action.payload;
    },
    updateCoinData: (state, action) => {
      const coinData = action.payload;
      let prevCoinData = state.coins[coinData.symbol];
      state.coins[coinData.symbol] = {
        ...prevCoinData,
        ...coinData,
      };
    },
  },
});

export const { setCoins, updateCoinData } = coinsSlice.actions;

export default coinsSlice.reducer;
