import { createSlice } from '@reduxjs/toolkit';

export interface IPortfolio {
  portfolios: Array<{
    _id: string;
    name: string;
  }>;
  activePortfolio: {
    name: string;
    freeQty: number;
    _id: string;
    coins: Array<{
      symbol: string;
      qty: number;
    }>;
    totalQty: number;
    lockedQty: number;
    type: string;
  };
}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    portfolios: [],
    activePortfolio: {
      name: '',
      freeQty: 0,
      _id: '',
      coins: [],
      totalQty: 0,
      lockedQty: 0,
      type: '',
    },
  } as IPortfolio,
  reducers: {
    setPortfolios: (state, action) => {
      state.portfolios = action.payload;
    },
    // updatePortfolios: (state, action) => {},
    setActivePortfolio: (state, action) => {
      state.activePortfolio = action.payload;
    },
  },
});

export const { setPortfolios, setActivePortfolio } = portfolioSlice.actions;

export default portfolioSlice.reducer;
