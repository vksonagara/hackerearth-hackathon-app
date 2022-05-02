/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { App } from './src/App';
import { name as appName } from './app.json';
import { store } from '@store/index';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReduxApp = () => {
  return (
    <Provider store={store}>
      <PaperProvider
        settings={{
          icon: props => <Icon {...props} />,
        }}
      >
        <App />
      </PaperProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxApp);
