import React from 'react';

const withHeader = (Component: React.FC, Header: React.FC) => {
  const WithHeader = props => {
    return (
      <>
        <Header />
        <Component {...props} />
      </>
    );
  };

  return WithHeader;
};

export default withHeader;
