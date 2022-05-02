import { combineReducers } from 'redux';
import coinReducer from './coins';
import authReducer from './auth';
import portfolioReducer from './portfolio';

const rootReducer = combineReducers({
  auth: authReducer,
  coins: coinReducer,
  portfolio: portfolioReducer,
});

export default rootReducer;
