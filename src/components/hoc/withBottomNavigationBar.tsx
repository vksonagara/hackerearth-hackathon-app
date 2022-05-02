import React from 'react';

import { NavigationBar } from '@components/comman';

const withBottomNavigationBar = (Component: React.FC) => {
  const WithBottomNavigationBar = props => {
    return (
      <>
        <Component {...props} />
        <NavigationBar />
      </>
    );
  };

  return WithBottomNavigationBar;
};

export default withBottomNavigationBar;
