import React, { FC } from 'react';
import NotFoundImage from '../../../../public/404.png';

const NotFound: FC = () => {
  return (
    <div className="App">
      <img src={NotFoundImage} alt="not_found" />
    </div>
  );
};

export default NotFound;
