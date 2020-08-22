import React, { FC } from 'react';
import NotFoundImage from '../../../../public/404.png';

const NotFound: FC = () => {
  return (
    <div className="App">
      <img src={NotFoundImage} />
    </div>
  );
};

export default NotFound;
